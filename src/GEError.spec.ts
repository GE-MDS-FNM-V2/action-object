import { GEErrors } from './index'
import { GEActionObjectError, GEActionObjectErrorCodes } from './GEError'
const GEError = GEErrors.GEError
const GEPAMError = GEErrors.GEPAMError
const GEPAMErrorCodes = GEErrors.GEPAMErrorCodes
const GECSMError = GEErrors.GECSMError
const GECSMErrorCodes = GEErrors.GECSMErrorCodes
const GEErrorEnviornmentSource = GEErrors.GEErrorEnviornmentSource
describe('GEError', () => {
  describe('GEPAMError', () => {
    it('Should create GEPAMError', () => {
      const test = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      expect(test).toBeTruthy()
    })
    it('Should create GEPAMError with correct code', () => {
      const error = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      expect(error.status).toEqual(GEPAMErrorCodes.ADD_CLIENT_ERROR)
    })
    it('Should create GEPAMError with correct message', () => {
      const error = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      expect(error.message).toEqual('test message')
    })
    it('Should create GEPAMError with correct name', () => {
      const error = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      expect(error.name).toEqual('GEPAMError')
    })
    it('Should create GEPAMError with correct source', () => {
      const error = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      expect(error.source).toEqual(GEErrorEnviornmentSource.PAM)
    })
    it('Should throw GEPAMError', () => {
      const error = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      try {
        throw error
        expect(false).toEqual(true)
      } catch (err) {
        expect(err).toEqual(error)
      }
    })
    it('Should throw GEPAMError with stack', () => {
      const error = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      try {
        throw error
      } catch (err) {
        expect(err.stack).not.toBeFalsy()
      }
    })
    it('Should throw GEPAMError with message', () => {
      try {
        throw new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      } catch (err) {
        expect(err.message).toEqual('test message')
      }
    })
  })

  describe('GECSMError', () => {
    it('Should create GECSMError', () => {
      const test = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      expect(test).toBeTruthy()
    })
    it('Should create GECSMError with correct code', () => {
      const error = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      expect(error.status).toEqual(GECSMErrorCodes.NO_FORWARDING_ADDRESS)
    })
    it('Should create GECSMError with correct message', () => {
      const error = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      expect(error.message).toEqual('test message')
    })
    it('Should create GECSMError with correct name', () => {
      const error = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      expect(error.name).toEqual('GECSMError')
    })
    it('Should create GECSMError with correct source', () => {
      const error = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      expect(error.source).toEqual(GEErrorEnviornmentSource.CSM)
    })
    it('Should throw GECSMError', () => {
      const error = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      try {
        throw error
        expect(false).toEqual(true)
      } catch (err) {
        expect(err).toEqual(error)
      }
    })
    it('Should throw GECSMError with stack', () => {
      const error = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      try {
        throw error
      } catch (err) {
        expect(err.stack).not.toBeFalsy()
      }
    })
    it('Should throw GEPAMError with message', () => {
      try {
        throw new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      } catch (err) {
        expect(err.message).toEqual('test message')
      }
    })
  })

  describe('GEActionObjectError', () => {
    it('Should create GEActionObjectError', () => {
      const test = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      expect(test).toBeTruthy()
    })
    it('Should create GEActionObjectError with correct code', () => {
      const error = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      expect(error.status).toEqual(GEActionObjectErrorCodes.DESERIALIZATION_ERROR)
    })
    it('Should create GEActionObjectError with correct message', () => {
      const error = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      expect(error.message).toEqual('test message')
    })
    it('Should create GEActionObjectError with correct name', () => {
      const error = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      expect(error.name).toEqual('GEActionObjectError')
    })
    it('Should create GEActionObjectError with correct source', () => {
      const error = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      expect(error.source).toEqual(GEErrorEnviornmentSource.ACTION_OBJECT)
    })
    it('Should throw GEActionObjectError', () => {
      const error = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      try {
        throw error
        expect(false).toEqual(true)
      } catch (err) {
        expect(err).toEqual(error)
      }
    })
    it('Should throw GEActionObjectError with stack', () => {
      const error = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      try {
        throw error
      } catch (err) {
        expect(err.stack).not.toBeFalsy()
      }
    })
    it('Should throw GEPAMError with message', () => {
      try {
        throw new GEActionObjectError(
          'test message',
          GEActionObjectErrorCodes.DESERIALIZATION_ERROR
        )
      } catch (err) {
        expect(err.message).toEqual('test message')
      }
    })
  })

  describe('Serialization', () => {
    it('Serializes GEPAMError with properties', () => {
      const err = new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)
      const serialized = err.toJSON()
      const deserialized = GEError.fromJSON(serialized)
      expect(deserialized).toEqual(err)
    })
    it('Serializes GECSMError with properties', () => {
      const err = new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)
      const serialized = err.toJSON()
      const deserialized = GEError.fromJSON(serialized)
      expect(deserialized).toEqual(err)
    })
    it('Serializes GEActionObjectError with properties', () => {
      const err = new GEActionObjectError(
        'test message',
        GEActionObjectErrorCodes.DESERIALIZATION_ERROR
      )
      const serialized = err.toJSON()
      const deserialized = GEError.fromJSON(serialized)
      expect(deserialized).toEqual(err)
    })
  })
})
