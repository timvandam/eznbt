import { Byte, byte } from '../Byte'

const expected = {
  value: 12,
  buffer: Buffer.alloc(1, 12)
}

describe('works when passing a value', () => {
  it('using Byte class', () => {
    expect(new Byte({ value: expected.value })).toEqual(expected)
  })

  it('using byte shorthand', () => {
    expect(byte(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new Byte({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    expect(() => byte(128)).toThrow()
  })

  it('when within the boundaries', () => {
    expect(() => byte(127)).not.toThrow()
  })
})
