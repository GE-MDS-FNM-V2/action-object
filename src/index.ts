import { requireProperty, ID } from './utils'

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
    const rawJson = JSON.parse(rawString)

    const uri = requireProperty(rawJson, 'uri')

    const actionType = requireProperty(rawJson, 'actionType', value => {
      return Object.keys(ActionTypeV1).includes(value)
    }) as ActionTypeV1

    const foundPath = 'path' in rawJson

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

    const modifyingValue = rawJson['modifyingValue']
    const version = requireProperty(rawJson, 'version')

    const id = requireProperty(rawJson, 'id')

    const commData = requireProperty(rawJson, 'commData', unverifiedCommData => {
      const commMethod = requireProperty(unverifiedCommData, 'commMethod', unverifiedCommMethod => {
        return Object.keys(CommunicationMethodV1).includes(unverifiedCommMethod)
      })

      const protocol = requireProperty(unverifiedCommData, 'protocol', unverifiedCommMethod => {
        return Object.keys(ProtocolV1).includes(unverifiedCommMethod)
      })

      if (unverifiedCommData.username) {
        requireProperty(unverifiedCommData, 'username', unverifiedUsername => {
          return typeof unverifiedUsername === 'string'
        })
      }

      if (unverifiedCommData.password) {
        requireProperty(unverifiedCommData, 'password', unverifiedPassword => {
          return typeof unverifiedPassword === 'string'
        })
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
      actionObjectInfo.response = parseResponse(rawJson.response)
    }
    if (modifyingValue) {
      actionObjectInfo.modifyingValue = modifyingValue
    }
    if (foundPath) {
      actionObjectInfo.path = parsePath(rawJson.path)
    }

    return new ActionObjectV1(actionObjectInfo, id)
  }
}
