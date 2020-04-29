import { Compound, compound } from '../Compound'
import { string } from '../String'

const expected = {
  value: { A: string('B') },
  // String, Length=1, A, length 1, B, end
  buffer: Buffer.from('0800014100014200', 'hex')
}

describe('works when passing a value', () => {
  it('using Compound class', () => {
    expect(new Compound({ value: expected.value })).toEqual(expected)
  })

  it('using compound shorthand', () => {
    expect(compound(expected.value)).toEqual(expected)
  })
})

it('convertValue works', () => {
  // Check whether the string is converted into an NBT string
  expect(compound({ A: 'B' }).value).toEqual(expected.value)
})

it('works when passing a buffer', () => {
  expect(new Compound({ buffer: expected.buffer })).toEqual(expected)
})

it('json works', () => {
  const value = {
    nested: {
      nested: {
        str: 'hello!'
      }
    }
  }

  expect(compound(value).json).toEqual(value)
})
