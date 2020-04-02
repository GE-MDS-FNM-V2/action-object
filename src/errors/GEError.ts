export enum GEErrorEnviornmentSource {
  CSM = 'CSM',
  PAM = 'PAM',
  FRONTEND = 'FRONTEND',
  RADIO = 'RADIO',
  OTHER = 'OTHER'
}

export class GEError extends Error {
  readonly status: number
  readonly message: string
  readonly name: string
  readonly source: GEErrorEnviornmentSource

  constructor(
    message = 'GEError',
    status: number,
    source: GEErrorEnviornmentSource,
    name = 'GEError'
  ) {
    super(message)

    // This is a node thing - not needed, but removes the constructor of this error from the actual stacktrace you care about
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GEError)
    }
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
  constructor(message = 'GEPAMError', status: GEPAMErrorCodes) {
    super(message, status, GEErrorEnviornmentSource.PAM, 'GEPAMError')
  }
}

export class GEPAMUnkownClientError extends GEError {
  constructor(message = 'GECSMError', status: number) {
    super(message, status, GEErrorEnviornmentSource.PAM)
  }
}

export class GECSMError extends GEError {
  constructor(message = 'GECSMError', status: number) {
    super(message, status, GEErrorEnviornmentSource.CSM)
  }
}

export class GEFRONTENDError extends GEError {
  constructor(message = 'GECSMError', status: number) {
    super(message, status, GEErrorEnviornmentSource.FRONTEND)
  }
}
