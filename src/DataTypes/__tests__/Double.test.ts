import { Double, double } from '../Double'

const expected = {
  value: Math.E,
  buffer: Buffer.allocUnsafe(8)
}
expected.buffer.writeDoubleBE(Math.E)

describe('works when passing a value', () => {
  it('using Double class', () => {
    expect(new Double({ value: expected.value })).toEqual(expected)
  })

  it('using double shorthand', () => {
    expect(double(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new Double({ buffer: expected.buffer })).toEqual(expected)
})
