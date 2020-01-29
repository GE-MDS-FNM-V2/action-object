import { requireProperty } from './utils'

describe('requireProperty', () => {
  it('Throws error if property doesnt exist', () => {
    try {
      const testObj = {
        hello: 'world'
      }
      requireProperty(testObj, 'asdf')
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "asdf" property`))
    }
  })
  it('Throws error if obj is not an object', () => {
    try {
      const testObj = ''
      requireProperty(testObj, 'asdf')
    } catch (error) {
      expect(error).toEqual(new Error('Provided obj is not an object'))
    }
  })
  it('Returns property if it does exist', () => {
    const testObj = {
      hello: 'world'
    }
    const val = requireProperty(testObj, 'hello')
    expect(val).toEqual('world')
  })
  it('Throws error if validator doesnt pass', () => {
    try {
      const testObj = {
        hello: 'world'
      }
      requireProperty(testObj, 'asdf', () => false)
    } catch (error) {
      expect(error).toEqual(new Error(`Object does not have valid "asdf" property`))
    }
  })
})
