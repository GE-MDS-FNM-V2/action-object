import { example } from './action-object'

describe('Example', () => {
  it('example', () => {
    expect(example(3, 6)).toEqual(6)
  })
  it('example', () => {
    expect(example(5, 2)).toEqual(5)
  })
  it('example', () => {
    expect(example(5, 5)).toEqual(5)
  })
})
