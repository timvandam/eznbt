import { End } from '../End'

const expected = {
  value: null,
  buffer: Buffer.alloc(1)
}

it('works when passing a value', () => {
  expect(new End()).toEqual(expected)
})
