export enum GEErrorEnviornmentSource {
  CSM = 'CSM',
  PAM = 'PAM',
  FRONTEND = 'FRONTEND',
  RADIO = 'RADIO',
  OTHER = 'OTHER'
}

class GEError extends Error {
  readonly status: number
  readonly message: string
  readonly name: string
  readonly source: GEErrorEnviornmentSource

  constructor(message: string, status: number, source: GEErrorEnviornmentSource, name: string) {
    super(message)

    this.name = name
    this.message = message
    this.status = status
    this.source = source
  }
}
/*****************************************
 * PAM
 ****************************************/

// these error codes draw inspiration from HTTP error codes
// https://httpstatuses.com/

export enum GEPAMErrorCodes {
  UNKOWN_CLIENT_TYPE = 415, // ex: known client types are JSONRPC, and serial expected
  ADD_CLIENT_ERROR = 412, // adding a pam client fails
  SET_ERROR = 510, // a set action fails
  RADIO_UNINITIALIZED = 407, // cannot perform an action on the radio because it hasnt been initialized
  KILL_CLIENT_SESSION_ERROR = 417, // cannot kill radio client session
  LOGIN_FAILED = 401, // login attempt did not work
  LOGIN_SUCCEEDED_BUT_NOT_NEEDED = 302, // login requested to radio, but wasnt needed to begin with
  UNSUPPORTED_ACTION_TYPE = 501, // ex: GET, INIT, and SET are valid action types
  INVALID_ACTION = 400, // a supported action type did not have the information it was supposed to
  NETWORK_ERROR = 500, // could not reach the radio
  NOT_LOGGED_IN = 403 // you are not currently authenticated with the radio
}
export class GEPAMError extends GEError {
  /* istanbul ignore next */
  constructor(message = 'GEPAMError', status: GEPAMErrorCodes) {
    super(message, status, GEErrorEnviornmentSource.PAM, 'GEPAMError')
  }
}

/*****************************************
 * CSM
 ****************************************/
// these error codes draw inspiration from HTTP error codes
// https://httpstatuses.com/
export enum GECSMErrorCodes {
  NO_FORWARDING_ADDRESS = 421
}
export class GECSMError extends GEError {
  // As far as i know there isnt a way to mock a constructor of the Error object
  /* istanbul ignore next */
  constructor(message = 'GECSMError', status: GECSMErrorCodes) {
    super(message, status, GEErrorEnviornmentSource.CSM, 'GECSMError')
  }
}

export default {
  GEErrorEnviornmentSource,
  GEPAMError,
  GEPAMErrorCodes,
  GECSMError,
  GECSMErrorCodes
}
