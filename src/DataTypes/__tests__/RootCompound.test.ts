import { RootCompound, rootcompound } from '../RootCompound'
import { string } from '../String'

const NBTRootTagName = Symbol.for('NBTRootTagName')

const expected = {
  value: {
    A: string('B'),
    [NBTRootTagName]: 'C' // 0x43
  },
  // String, Length=1, A, length 1, B, end
  buffer: Buffer.from('0a0001430800014100014200', 'hex')
}

describe('works when passing a value', () => {
  it('using RootCompound class', () => {
    expect(new RootCompound({ value: expected.value })).toEqual(expected)
  })

  it('using rootcompound shorthand', () => {
    expect(rootcompound(expected.value)).toEqual(expected)
  })
})

it('works when passing a buffer', () => {
  expect(new RootCompound({ buffer: expected.buffer })).toEqual(expected)
})

it('json works', () => {
  const value = {
    [NBTRootTagName]: 'hello!',
    nested: {
      nested: {
        str: 'world!'
      }
    }
  }

  const { json } = rootcompound(value)

  const expected = { [value[NBTRootTagName]]: value }
  delete expected[value[NBTRootTagName]][NBTRootTagName]

  expect(json).toEqual(expected)
})
