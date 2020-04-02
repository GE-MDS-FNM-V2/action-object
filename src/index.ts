import { requireProperty, ID } from './utils'
import ErrorObjects from './GEError'
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
  serialize(): string
}

export class ActionObjectV1 implements IActionObjectV1 {
  information: ActionObjectInformationV1
  id: string
  constructor(information: ActionObjectInformationV1, id = ID()) {
    actionObjectLog('Creating action object v1 with information', information, ' and id of ', id)
    this.information = information
    this.id = id
  }

  serialize() {
    return JSON.stringify({
      ...this.information,
      id: this.id
    })
  }
}

export const v1 = {
  create(information: ActionObjectInformationV1, optionalID?: string) {
    return new ActionObjectV1(information, optionalID)
  },
  deserialize(rawString: string) {
    actionObjectLog('Deserializing the following string into an action object v1', rawString)
    const rawJson = JSON.parse(rawString)

    const uri = requireProperty(rawJson, 'uri')
    actionObjectLog('Determined uri to be', uri)

    const actionType = requireProperty(rawJson, 'actionType', value => {
      return Object.keys(ActionTypeV1).includes(value)
    }) as ActionTypeV1
    actionObjectLog('Determined action type to be ', actionType)

    const modifyingValue = rawJson['modifyingValue']
    actionObjectLog('Determined modifyingValue (if any) to be', modifyingValue)

    const version = requireProperty(rawJson, 'version')
    actionObjectLog('Determined verion to be', version)

    const id = requireProperty(rawJson, 'id')
    actionObjectLog('Determined id to be', id)

    const commData = requireProperty(rawJson, 'commData', unverifiedCommData => {
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
    if (rawJson.response) {
      const parseResponse = (rawResponseField: any): IActionObjectResponseV1 => {
        let throwError = false
        const error = new Error(`Object does not have valid "response" property`)
        if (typeof rawResponseField !== 'object') {
          throwError = true
        } else if (
          !Object.keys(rawResponseField).includes('error') &&
          !Object.keys(rawResponseField).includes('data')
        ) {
          throwError = true
        }
        if (throwError) {
          throw error
        }

        return rawResponseField
      }
      actionObjectInfo.response = parseResponse(rawJson.response)
      actionObjectLog('Found reponse property of', actionObjectInfo.response)
    }
    if (modifyingValue) {
      actionObjectInfo.modifyingValue = modifyingValue
      actionObjectLog('Found modifying value of', modifyingValue)
    }
    if ('path' in rawJson) {
      const parsePath = (rawPath: any): string[] => {
        let path: string[] = []
        const value = rawPath
        const isArray = Array.isArray(value)
        if (!isArray) {
          throw new Error(`Object does not have valid "path" property`)
        }
        for (let index = 0; index < value.length; index++) {
          const element = value[index]
          if (typeof element !== 'string') {
            throw new Error(`Object does not have valid "path" property`)
          } else {
            path.push(element)
          }
        }
        return path
      }
      actionObjectInfo.path = parsePath(rawJson.path)
      actionObjectLog('Found path of ', actionObjectInfo.path)
    }

    return new ActionObjectV1(actionObjectInfo, id)
  }
}

export const GEErrors = ErrorObjects
