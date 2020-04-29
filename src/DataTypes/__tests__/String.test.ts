import { NBTString, string } from '../String'

const expected = {
  value: 'hello world!',
  // Length = 12, hello world!
  buffer: Buffer.from('000c68656c6c6f20776f726c6421', 'hex')
}

describe('works when passing a value', () => {
  it('using NBTString class', () => {
    expect(new NBTString({ value: expected.value })).toEqual(expected)
  })

  it('using string shorthand', () => {
    expect(string(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new NBTString({ buffer: expected.buffer })).toEqual(expected)
})
