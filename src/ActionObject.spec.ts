import { v1, ActionTypeV1, CommunicationMethodV1, CommunicationDataV1, ProtocolV1 } from '.'
import { ID } from './utils'

describe('v1', () => {
  it('Can create ActionObject with valid params', () => {
    v1.create({
      version: 1,
      actionType: ActionTypeV1.GET,
      commData: {
        commMethod: CommunicationMethodV1.HTTP,
        protocol: ProtocolV1.JSONRPC
      },
      modifyingValue: 'test',
      path: ['hello', 'world'],
      response: {
        data: 'hello world',
        error: null
      },
      uri: 'http://localhost:5000'
    })
  })
  it('Can serialize ActionObject correctly', () => {
    const id = ID()
    const obj = v1.create(
      {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC,
          username: 'john',
          password: 'adams'
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id
    )
    expect(obj.serialize()).toEqual({
      information: {
        version: 1,
        actionType: 'GET',
        commData: {
          commMethod: 'HTTP',
          protocol: 'JSONRPC',
          username: 'john',
          password: 'adams'
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    })
  })
  it('Can deserialize valid ActionObject', () => {
    const id = ID()
    const obj = v1.create(
      {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC,
          username: 'john',
          password: 'adams'
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
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
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id
    )
    const serialized = obj.serialize()
    expect(v1.deserialize(serialized)).toEqual(obj)
  })

  it('Can serialize/deserialize valid ActionObject without path+modifyingValue', () => {
    const id = ID()
    const obj = v1.create(
      {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id
    )
    const serialized = obj.serialize()
    expect(v1.deserialize(serialized)).toEqual(obj)
  })

  it('Errors if path is not array', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: {},
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "path" property`))
    }
  })
  it('Errors if path is not array of strings', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', {}],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "path" property`))
    }
  })

  it('Errors if commData is undefined', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "commData" property`))
    }
  })

  it('Errors if commData.commMethod is undefined', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "commMethod" property`))
    }
  })

  it('Errors if commData.protocol is undefined', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP
          // protocol: ProtocolV1.JSONRPC,
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "protocol" property`))
    }
  })

  it('Errors if commData.username is not a string', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC,
          username: ['this', 'should', 'fail']
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "username" property`))
    }
  })
  it('Errors if commData.username is not a string', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC,
          password: ['this', 'should', 'fail']
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        response: {
          data: 'hello world',
          error: null
        },
        uri: 'http://localhost:5000'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "password" property`))
    }
  })

  it('Allows no response', () => {
    const id = ID()
    const obj = v1
      .create(
        {
          version: 1,
          actionType: ActionTypeV1.GET,
          commData: {
            commMethod: CommunicationMethodV1.HTTP,
            protocol: ProtocolV1.JSONRPC
          },
          uri: 'http://localhost:5000'
        },
        id
      )
      .serialize()
    v1.deserialize(obj)
  })

  it('Errors if response is not object', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        uri: 'http://localhost:5000',
        response: 'asdf'
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "response" property`))
    }
  })

  it('Errors if response doesnt have data and doesnt have error', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        uri: 'http://localhost:5000',
        response: {}
      },
      id: id
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "response" property`))
    }
  })

  it('Allows for only response.error', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        uri: 'http://localhost:5000',
        response: {
          error: 'adsf'
        }
      },
      id: id
    }
    v1.deserialize(obj)
  })

  it('Allows for only response.data', () => {
    const id = ID()
    const obj = {
      information: {
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: CommunicationMethodV1.HTTP,
          protocol: ProtocolV1.JSONRPC
        },
        modifyingValue: 'test',
        path: ['hello', 'world'],
        uri: 'http://localhost:5000',
        response: {
          data: 'asdf'
        }
      },
      id: id
    }
    v1.deserialize(obj)
  })
})
