import { List, list } from '../List'
import { Byte, byte } from '../Byte'
import { int } from '../Int'

const expected = {
  value: [1, 2, 3],
  // Type = Byte (1), Length = 3, [1, 2, 3]
  buffer: Buffer.from('0100000003010203', 'hex')
}

it('works when using List class', () => {
  // Why would anyone even use such verbose syntax smh
  expect(new (List(Byte))({ value: [1, 2, 3] })).toEqual(expected)
})

it('works when providing Class instantiated instances', () => {
  expect(list(Byte)(byte(1), byte(2), byte(3))).toEqual(expected)
})

it('works when providing invalid Class instantiated instances', () => {
  expect(() => list(Byte)(int(1))).toThrow()
})

it('works when providing JS native values', () => {
  expect(list(Byte)(1, 2, 3)).toEqual(expected)
})

it('can read when not providing a Type', () => {
  const { buffer } = list(Byte)(1, 2, 3)
  // Not providing a type -> read only mode.
  expect(new (List())({ buffer })).toEqual(expected)
})
