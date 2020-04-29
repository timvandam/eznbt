import { IntArray, intarray } from '../IntArray'

const expected = {
  value: [-1, 1],
  // 0xffffffff = -1, 0x00000001 = 1 (two's complement)
  buffer: Buffer.from('00000002ffffffff00000001', 'hex')
}

describe('works when passing a value', () => {
  it('using IntArray class', () => {
    expect(new IntArray({ value: expected.value })).toEqual(expected)
  })

  it('using intarray shorthand', () => {
    expect(intarray(...expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new IntArray({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    expect(() => intarray(2147483648)).toThrow()
  })

  it('when within the boundaries', () => {
    expect(() => intarray(2147483647)).not.toThrow()
  })
})
