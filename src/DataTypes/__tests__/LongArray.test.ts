import { LongArray, longarray } from '../LongArray'
import { long } from '../Long'

const expected = {
  // eslint-disable-next-line no-undef
  value: [BigInt(-1), BigInt(1)],
  // 0xffffffff = -1, 0x00000001 = 1 (two's complement)
  buffer: Buffer.from('00000002ffffffffffffffff0000000000000001', 'hex')
}

describe('works when passing a value', () => {
  it('using LongArray class', () => {
    expect(new LongArray({ value: expected.value })).toEqual(expected)
  })

  it('using longarray shorthand', () => {
    expect(longarray(...expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new LongArray({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => longarray(9223372036854775808n)).toThrow()
  })

  it('when within the boundaries', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => longarray(9223372036854775807n)).not.toThrow()
  })
})
