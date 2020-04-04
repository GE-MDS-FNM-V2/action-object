import { GEActionObjectError, GEActionObjectErrorCodes } from './GEError'
import debug from 'debug'

const actionObjectLog = debug('ge-fnm:action-object')

export const requireProperty = (
  obj: any,
  prop: string,
  validator: (val: any) => boolean = () => true
) => {
  actionObjectLog('Looking for property', prop, ' on obj', obj)
  if (typeof obj !== 'object') {
    actionObjectLog('Cannot get property off of a non-object type')
    throw new GEActionObjectError(
      'Cannot get property off of a non-object type',
      GEActionObjectErrorCodes.DESERIALIZATION_ERROR
    )
  }
  if (!Object.keys(obj).includes(prop) || !validator(obj[prop])) {
    actionObjectLog(
      'Provided object does not have the property',
      prop,
      'or the property is not valid'
    )
    throw new GEActionObjectError(
      `Object does not have valid "${prop}" property`,
      GEActionObjectErrorCodes.DESERIALIZATION_ERROR
    )
  } else {
    return obj[prop]
  }
}

export const ID = () => {
  // https://gist.github.com/gordonbrander/2230317
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}
