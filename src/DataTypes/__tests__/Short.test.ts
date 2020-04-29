import { Short, short } from '../Short'
import { int } from '../Int'

const expected = {
  // eslint-disable-next-line no-undef
  value: 12,
  get buffer (): Buffer {
    const buf = Buffer.allocUnsafe(2)
    buf.writeInt16BE(expected.value)
    return buf
  }
}

describe('works when passing a value', () => {
  it('using Short class', () => {
    expect(new Short({ value: expected.value })).toEqual(expected)
  })

  it('using short shorthand', () => {
    expect(short(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new Short({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when over a boundary', () => {
    expect(() => short(32768)).toThrow()
  })

  it('when within the boundaries', () => {
    expect(() => short(32767)).not.toThrow()
  })
})
