import { Int, int } from '../Int'

const expected = {
  value: 12,
  get buffer (): Buffer {
    const buf = Buffer.allocUnsafe(4)
    buf.writeInt32BE(expected.value)
    return buf
  }
}

describe('works when passing a value', () => {
  it('using Int class', () => {
    expect(new Int({ value: expected.value })).toEqual(expected)
  })

  it('using int shorthand', () => {
    expect(int(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new Int({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    expect(() => int(2147483648)).toThrow()
  })

  it('when within the boundaries', () => {
    expect(() => int(2147483647)).not.toThrow()
  })
})
