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

export type ActionObjectInformationV1 = {
  version: 1
  uri: string
  actionType: ActionTypeV1
  path?: string[]
  modifyingValue?: any
  commData: CommunicationDataV1
  response: {
    error: any
    data: any
  }
}

class ActionObjectV1 {
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

    let path: string[] = []
    if (rawJson.path) {
      const value = rawJson.path
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
    }

    const modifyingValue = rawJson['modifyingValue']

    const response = requireProperty(rawJson, 'response')

    const id = requireProperty(rawJson, 'id')

    // const protocol = requireProperty(rawJson, 'protocol')

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

    // const resultingObj = {
    //   version: 1
    // }
    // uri && resultingObj[uri] = uri

    return new ActionObjectV1(
      {
        version: 1,
        uri,
        actionType,
        path,
        modifyingValue,
        commData,
        response
      },
      id
    )
  }
}
