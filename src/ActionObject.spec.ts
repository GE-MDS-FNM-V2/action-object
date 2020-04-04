import {
  v1,
  ActionTypeV1,
  CommunicationMethodV1,
  CommunicationDataV1,
  ProtocolV1,
  ActionObjectV1
} from '.'
import { ID } from './utils'
import { GEPAMError, GEPAMErrorCodes, GECSMError, GECSMErrorCodes } from './GEError'

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
          error: new GEPAMError('test pam error 123456789', GEPAMErrorCodes.ADD_CLIENT_ERROR)
        }
      },
      id: ID()
    }
    v1.deserialize(obj)
  })

  it('Does not allow anything that isnt a GEError on the error field', () => {
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
          error: 'not a ge error'
        }
      },
      id: ID()
    }
    try {
      v1.deserialize(obj)
      expect(false).toEqual(true)
    } catch (error) {
      expect(error).toBeTruthy()
    }
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

  /**
   * Automatic error serialization / deserialization
   */

  it('Automatically serializes GEError if GEError is present on response.error prop', () => {
    const err = v1
      .create({
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
          error: new GEPAMError('test pam error', GEPAMErrorCodes.ADD_CLIENT_ERROR)
        }
      })
      .serialize()

    expect(err.information.response?.error).toEqual(
      expect.objectContaining({
        message: 'test pam error',
        name: 'GEPAMError',
        source: 'PAM'
      })
    )
  })

  it('Automatically deserializes GEError if GEError is present on response.error prop', () => {
    const actionObj = v1.create({
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
        error: new GEPAMError('test pam error', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      }
    })

    expect(actionObj).toEqual(v1.deserialize(actionObj.serialize()))
  })

  it('Will leave the error alone if its not a GEError', () => {
    const actionObj = v1.create({
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
        error: new GECSMError('test csm error', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      }
    })

    expect(v1.deserialize(actionObj.serialize()).information.response?.error.message).toEqual(
      'test csm error'
    )
    expect(v1.deserialize(actionObj.serialize()).information.response?.error.status).toEqual(
      GECSMErrorCodes.NO_FORWARDING_ADDRESS
    )
  })
})
