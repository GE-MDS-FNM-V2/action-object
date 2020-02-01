import {
  v1,
  ActionTypeV1,
  CommunicationMethodV1,
  CommunicationDataV1,
  ProtocolV1
} from './action-object'
import { ID } from './utils'

describe('v1', () => {
  it('Can create ActionObject with valid params', () => {
    v1.create({
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC
      },
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: undefined,
      uri: 'http://localhost:5000'
    })
  })
  it('Can serialize ActionObject correctly', () => {
    const id = ID()
    const obj = v1.create(
      {
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC,
          username: 'john',
          password: 'adams'
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: undefined,
        uri: 'http://localhost:5000'
      },
      id
    )
    expect(obj.serialize()).toEqual(
      JSON.stringify({
        actionType: 'GET',
        commData: {
          commMethod: 'HTTP',
          protocol: 'JSONRPC',
          username: 'john',
          password: 'adams'
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: undefined,
        uri: 'http://localhost:5000',
        id: id
      })
    )
  })
  it('Can deserialize valid ActionObject', () => {
    const id = ID()
    const obj = v1.create(
      {
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC,
          username: 'john',
          password: 'adams'
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: undefined,
        uri: 'http://localhost:5000'
      },
      id
    )
    const serialized = obj.serialize()
    expect(v1.deserialize(serialized)).toEqual(obj)
  })

  it('Can serialize/deserialize valid ActionObject without username+password', () => {
    const id = ID()
    const obj = v1.create(
      {
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: undefined,
        uri: 'http://localhost:5000'
      },
      id
    )
    const serialized = obj.serialize()
    expect(v1.deserialize(serialized)).toEqual(obj)
  })

  it('Errors if path is not array', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC
      },
      modifyingValue: 'test',
      path: {},
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "path" property`))
    }
  })
  it('Errors if path is not array of strings', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC
      },
      modifyingValue: 'test',
      path: ['hello', {}],
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "path" property`))
    }
  })

  it('Errors if commData is undefined', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "commData" property`))
    }
  })

  it('Errors if commData.commMethod is undefined', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      commData: {
        protocol: ProtocolV1.JSONRPC
      },
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "commMethod" property`))
    }
  })

  it('Errors if commData.protocol is undefined', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP
        // protocol: ProtocolV1.JSONRPC,
      },
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "protocol" property`))
    }
  })

  it('Errors if commData.username is not a string', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC,
        username: ['this', 'should', 'fail']
      },
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "username" property`))
    }
  })
  it('Errors if commData.username is not a string', () => {
    const id = ID()
    const obj = JSON.stringify({
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC,
        password: ['this', 'should', 'fail']
      },
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: undefined,
      uri: 'http://localhost:5000',
      id: id
    })
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "password" property`))
    }
  })
})
