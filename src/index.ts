import { requireProperty, ID } from './utils'
import ErrorObjects, { GEActionObjectError, GEActionObjectErrorCodes, GEError } from './GEError'
import debug from 'debug'

const actionObjectLog = debug('ge-fnm:action-object')

export enum ActionTypeV1 {
  GET = 'GET',
  SET = 'SET',
  ACTION = 'ACTION',
  INIT = 'INIT'
}

export enum CommunicationMethodV1 {
  HTTP = 'HTTP',
  SERIAL = 'SERIAL'
}

export enum ProtocolV1 {
  JSONRPC = 'JSONRPC',
  CLI = 'CLI'
}

export type CommunicationDataV1 = {
  commMethod: CommunicationMethodV1
  protocol: ProtocolV1
  username?: string
  password?: string
}

export type IActionObjectResponseV1 = {
  error?: any
  data?: any
}

export type ActionObjectInformationV1 = {
  version: 1
  uri: string
  actionType: ActionTypeV1
  path?: string[]
  modifyingValue?: any
  commData: CommunicationDataV1
  response?: IActionObjectResponseV1
}

export interface IActionObjectV1 {
  information: ActionObjectInformationV1
  id: string
  serialize(): { information: ActionObjectInformationV1; id: string }
}

export class ActionObjectV1 implements IActionObjectV1 {
  information: ActionObjectInformationV1
  id: string
  constructor(information: ActionObjectInformationV1, id = ID()) {
    actionObjectLog('Creating action object v1 with information', information, ' and id of ', id)
    this.information = information
    this.id = id
  }

  serialize(): { information: ActionObjectInformationV1; id: string } {
    const information = {
      ...this.information
    }
    if (information.response && information.response.error) {
      const rawErr = information.response.error
      const serializedError = rawErr.toJSON()
      information.response.error = serializedError
    }
    return {
      information,
      id: this.id
    }
  }
}

export const v1 = {
  create(information: ActionObjectInformationV1, optionalID?: string) {
    return new ActionObjectV1(information, optionalID)
  },
  deserialize(rawJson: any) {
    const id = requireProperty(rawJson, 'id')
    actionObjectLog('Determined id to be', id)

    const information = requireProperty(rawJson, 'information')
    actionObjectLog('Found information property')

    const uri = requireProperty(information, 'uri')
    actionObjectLog('Determined uri to be', uri)

    const actionType = requireProperty(information, 'actionType', value => {
      return Object.keys(ActionTypeV1).includes(value)
    }) as ActionTypeV1
    actionObjectLog('Determined action type to be ', actionType)

    const modifyingValue = information['modifyingValue']
    actionObjectLog('Determined modifyingValue (if any) to be', modifyingValue)

    const version = requireProperty(information, 'version')
    actionObjectLog('Determined verion to be', version)

    const commData = requireProperty(information, 'commData', unverifiedCommData => {
      actionObjectLog('Attempting to parse commData')

      const commMethod = requireProperty(unverifiedCommData, 'commMethod', unverifiedCommMethod => {
        return Object.keys(CommunicationMethodV1).includes(unverifiedCommMethod)
      })
      actionObjectLog('Found comm method of', commData)

      const protocol = requireProperty(unverifiedCommData, 'protocol', unverifiedCommMethod => {
        return Object.keys(ProtocolV1).includes(unverifiedCommMethod)
      })
      actionObjectLog('Found protocol of ', protocol)

      if (unverifiedCommData.username) {
        const username = requireProperty(unverifiedCommData, 'username', unverifiedUsername => {
          return typeof unverifiedUsername === 'string'
        })
        actionObjectLog('Found username of', username)
      }

      if (unverifiedCommData.password) {
        const password = requireProperty(unverifiedCommData, 'password', unverifiedPassword => {
          return typeof unverifiedPassword === 'string'
        })
        actionObjectLog('Found password of', password)
      }
      return true
    })

    const actionObjectInfo: ActionObjectInformationV1 = {
      version,
      uri,
      actionType,
      commData
    }
    if (information.response) {
      const parseResponse = (rawResponseField: any): IActionObjectResponseV1 => {
        let throwError = false

        /**
         * The following block ensures that if the response field exists, its an object that has either a response field or a data field
         */
        if (typeof rawResponseField !== 'object') {
          actionObjectLog('Response prop exists but isnt an object')
          throwError = true
        } else if (
          !Object.keys(rawResponseField).includes('error') &&
          !Object.keys(rawResponseField).includes('data')
        ) {
          actionObjectLog(
            'Response field needs an error or a data field if response is to be present'
          )
          throwError = true
        }

        if (throwError) {
          throw new GEActionObjectError(
            `Object does not have valid "response" property`,
            GEActionObjectErrorCodes.DESERIALIZATION_ERROR
          )
        }

        /**
         * the following will ensure that if the error field exists, it can be deserialized into a GEError
         */
        if (rawResponseField.error) {
          // Generally a bad practice to swallow errors, but here the original error message is
          // "GEActionObjectError: Cannot get property off of a non-object type"
          // and that is useless
          try {
            const deserialized = GEError.fromJSON(rawResponseField.error)
            rawResponseField.error = deserialized
          } catch (error) {
            throw new GEActionObjectError(
              'response.error is not a valid GEError Object - ' + error.message,
              GEActionObjectErrorCodes.DESERIALIZATION_ERROR
            )
          }
        }

        return rawResponseField
      }
      actionObjectInfo.response = parseResponse(information.response)
      actionObjectLog('Found reponse property of', actionObjectInfo.response)
    }
    if (modifyingValue) {
      actionObjectInfo.modifyingValue = modifyingValue
      actionObjectLog('Found modifying value of', modifyingValue)
    }
    if ('path' in information) {
      const parsePath = (rawPath: any): string[] => {
        let path: string[] = []
        const value = rawPath
        const isArray = Array.isArray(value)
        if (!isArray) {
          throw new GEActionObjectError(
            `Object does not have valid "path" property`,
            GEActionObjectErrorCodes.DESERIALIZATION_ERROR
          )
        }
        for (let index = 0; index < value.length; index++) {
          const element = value[index]
          if (typeof element !== 'string') {
            throw new GEActionObjectError(
              `Object does not have valid "path" property`,
              GEActionObjectErrorCodes.DESERIALIZATION_ERROR
            )
          } else {
            path.push(element)
          }
        }
        return path
      }
      actionObjectInfo.path = parsePath(information.path)
      actionObjectLog('Found path of ', actionObjectInfo.path)
    }

    return new ActionObjectV1(actionObjectInfo, id)
  }
}

export const GEErrors = ErrorObjects
