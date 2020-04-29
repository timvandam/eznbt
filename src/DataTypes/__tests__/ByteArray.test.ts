import { ByteArray, bytearray } from '../ByteArray'

const expected = {
  value: [-1, 1],
  // 0xff = -1, 0x01 = 1 (two's complement)
  buffer: Buffer.from('00000002ff01', 'hex')
}

describe('works when passing a value', () => {
  it('using ByteArray class', () => {
    expect(new ByteArray({ value: expected.value })).toEqual(expected)
  })

  it('using bytearray shorthand', () => {
    expect(bytearray(...expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new ByteArray({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    expect(() => bytearray(128)).toThrow()
  })

  it('when within the boundaries', () => {
    expect(() => bytearray(127)).not.toThrow()
  })
})
