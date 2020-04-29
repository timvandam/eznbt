import { Long, long } from '../Long'

const expected = {
  // eslint-disable-next-line no-undef
  value: BigInt(12),
  get buffer (): Buffer {
    const buf = Buffer.allocUnsafe(8)
    buf.writeBigInt64BE(expected.value)
    return buf
  }
}

describe('works when passing a value', () => {
  it('using Long class', () => {
    expect(new Long({ value: expected.value })).toEqual(expected)
  })

  it('using long shorthand', () => {
    expect(long(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new Long({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => long(9223372036854775808n)).toThrow()
  })

  it('when within the boundaries', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => long(9223372036854775807n)).not.toThrow()
  })
})
