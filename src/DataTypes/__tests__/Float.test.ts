import { Float, float } from '../Float'

const expected = {
  value: 3.1415927410125732,
  // Dynamically generate the buffer - we will change the value to test precision
  get buffer (): Buffer {
    const buf = Buffer.allocUnsafe(4)
    buf.writeFloatBE(expected.value)
    return buf
  }
}

describe('works when passing a value', () => {
  it('using Float class', () => {
    expect(new Float({ value: expected.value })).toEqual(expected)
  })

  it('using float shorthand', () => {
    expect(float(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new Float({ buffer: expected.buffer })).toEqual(expected)
})

describe('works when near a boundary', () => {
  it('when there is not enough precision', () => {
    expected.value = Math.PI // there is not enough precision for this number, so it will change
    expect(new Float({ buffer: expected.buffer }).value).not.toBe(expected.value)
    expect(float(expected.value).value).not.toBe(expected.value) // the value attribute should be adjusted too
  })
})
