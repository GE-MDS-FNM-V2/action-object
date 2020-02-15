export const requireProperty = (
  obj: any,
  prop: string,
  validator: (val: any) => boolean = () => true
) => {
  if (typeof obj !== 'object') {
    throw new Error('Provided obj is not an object')
  }
  if (!Object.keys(obj).includes(prop) || !validator(obj[prop])) {
    throw new Error(`Object does not have valid "${prop}" property`)
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
