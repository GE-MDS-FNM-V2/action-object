import { GEError } from './index'
const GEPAMError = GEError.GEPAMError
const GEPamErrorCodes = GEError.GEPAMErrorCodes
const GECSMError = GEError.GECSMError
const GECSMErrorCodes = GEError.GECSMErrorCodes
const GEErrorEnviornmentSource = GEError.GEErrorEnviornmentSource
describe('GEError', () => {
  describe('GEPAMError', () => {
    it('Should create GEPAMError', () => {
      const test = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      expect(test).toBeTruthy()
    })
    it('Should create GEPAMError with correct code', () => {
      const error = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      expect(error.status).toEqual(GEPamErrorCodes.ADD_CLIENT_ERROR)
    })
    it('Should create GEPAMError with correct message', () => {
      const error = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      expect(error.message).toEqual('test message')
    })
    it('Should create GEPAMError with correct name', () => {
      const error = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      expect(error.name).toEqual('GEPAMError')
    })
    it('Should create GEPAMError with correct source', () => {
      const error = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      expect(error.source).toEqual(GEErrorEnviornmentSource.PAM)
    })
    it('Should throw GEPAMError', () => {
      const error = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      try {
        throw error
        expect(false).toEqual(true)
      } catch (err) {
        expect(err).toEqual(error)
      }
    })
    it('Should throw GEPAMError with stack', () => {
      const error = new GEPAMError('test message', GEPamErrorCodes.ADD_CLIENT_ERROR)
      try {
        throw error
      } catch (err) {
        expect(err.stack).not.toBeFalsy()
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
  })
})
