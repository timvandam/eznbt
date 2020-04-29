# eznbt
Easy Minecraft NBT reading and writing

## Usage
```javascript
const NBT = require('eznbt')

// The NBT object contains both classes and constructors.
// Classes are PascalCased and can be used to both read and write:
const { buffer } = new NBT.String({ value: 'hello' }) // writing
const { value } = new NBT.String({ buffer }) // reading the previously made buffer
// You can either pass a buffer or a value in the constructor as just shown

// Constructors are all lowercase
const { buffer } = NBT.string('hello') // is equivalent to new NBT.String({ value: 'hello' })

// Lists need to be passed the type of its elements. This must be a class (thus PascalCased)
const myList = NBT.list(NBT.Byte)(1, 2, 3)
// Lists can also be created using arrays
// The NBT Tag of the first element is then used as List Type
const myList2 = [NBT.byte(1), NBT.byte(2), NBT.byte(3)]

const myNbt = NBT.compound({
  integer: NBT.int(123), // equivalent to new NBT.Int({ value: 123 })
  stringList: NBT.list(NBT.String)('hello', 'hi', 'goodbye') // equivalent to new (NBT.List(NBT.String))({ value: ['hello', 'hi', 'goodbye'] })
})

// Some JS datatypes are automatically converted:
const myCompound = NBT.compound({
  bigInt: 5n, // bigints are automatically converted to NBT.Long
  noTypeList: [NBT.int(5), NBT.int(6)], // lists are automatically created from the datatype of the first element
  sameList: NBT.list(NBT.Int)(5, 6), // this is equivalent!
  bigIntList: [5n, 6n], // you can combine those with other shorthands
  bigIntList2: NBT.list(NBT.Long)(5n, 6n) // same thing
})

// All NBT tag instances have two attribute: buffer and value
// Compound tags also have a json attribute, returning an object of just Javascript datatypes
myCompound.json
// equals
{
  bigInt: 5n,
  noTypeList: [5, 6],
  sameList: [5, 6],
  bigIntList: [5n, 6n],
  bigIntList2: [5n, 6n]
}
```
