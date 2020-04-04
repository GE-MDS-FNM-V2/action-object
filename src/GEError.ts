export enum GEErrorEnviornmentSource {
  CSM = 'CSM',
  PAM = 'PAM',
  FRONTEND = 'FRONTEND',
  RADIO = 'RADIO',
  ACTION_OBJECT = 'ACTION_OBJECT',
  OTHER = 'OTHER'
}

export type GEErrorJSON = {
  status: number
  message: string
  name: string
  source: GEErrorEnviornmentSource
  stack?: string
}
export class GEError extends Error {
  readonly status: number
  readonly name: string
  readonly source: GEErrorEnviornmentSource
  readonly stack?: string

  constructor(
    message: string,
    status: number,
    source: GEErrorEnviornmentSource,
    name: string,
    stack?: string
  ) {
    super(message)

    this.name = name
    this.status = status
    this.source = source
    if (stack) {
      this.stack = stack
    }
    Object.setPrototypeOf(this, new.target.prototype)
  }

  public toJSON(): GEErrorJSON {
    return {
      status: this.status,
      message: this.message,
      name: this.name,
      source: this.source,
      stack: this.stack
    }
  }

  static fromJSON(rawData: GEErrorJSON) {
    return new GEError(rawData.message, rawData.status, rawData.source, rawData.name, rawData.stack)
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
  NOT_LOGGED_IN = 403, // you are not currently authenticated with the radio
  RADIO_ERROR = 405 // the response from a radio returns an error
}
export class GEPAMError extends GEError {
  /* istanbul ignore next */
  constructor(message: string, status: GEPAMErrorCodes) {
    super(message, status, GEErrorEnviornmentSource.PAM, 'GEPAMError')

    /* istanbul ignore next */
    Object.setPrototypeOf(this, new.target.prototype)
  }

  toJSON() {
    return super.toJSON()
  }
}

/*****************************************
 * CSM
 ****************************************/
// these error codes draw inspiration from HTTP error codes
// https://httpstatuses.com/
export enum GECSMErrorCodes {
  NO_FORWARDING_ADDRESS = 421, // The CSM needs a forwarding address because the action cannot be performed locally
  REMOTE_CSM_CONNECTION_FAILURE = 422 // The POST request to the remote CSM has failed
}
export class GECSMError extends GEError {
  // As far as i know there isnt a way to mock a constructor of the Error object
  /* istanbul ignore next */
  constructor(message: string, status: GECSMErrorCodes) {
    super(message, status, GEErrorEnviornmentSource.CSM, 'GECSMError')

    /* istanbul ignore next */
    Object.setPrototypeOf(this, new.target.prototype)
  }

  toJSON() {
    return super.toJSON()
  }
}

/*****************************************
 * ACTION_OBJECT
 ****************************************/
export enum GEActionObjectErrorCodes {
  DESERIALIZATION_ERROR = 500
}
export class GEActionObjectError extends GEError {
  // As far as i know there isnt a way to mock a constructor of the Error object
  /* istanbul ignore next */
  constructor(message: string, status: GEActionObjectErrorCodes) {
    super(message, status, GEErrorEnviornmentSource.ACTION_OBJECT, 'GEActionObjectError')

    /* istanbul ignore next */
    Object.setPrototypeOf(this, new.target.prototype)
  }

  toJSON() {
    return super.toJSON()
  }
}

export default {
  GEError,
  GEErrorEnviornmentSource,
  GEPAMError,
  GEPAMErrorCodes,
  GECSMError,
  GECSMErrorCodes,
  GEActionObjectError,
  GEActionObjectErrorCodes
}
