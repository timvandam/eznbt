# eznbt
Easy Minecraft NBT reading and writing

## Prerequisites
Make sure to use a node version that supports BigInts, they're used for the Long NBT Tag

## Usage
Pretty much all you need to know is that *PascalCase* members of `eznbt` are classes that can be used for both reading
and writing. Its constructors accept an object containing either a `value` or `buffer` property, from which the class
is then constructed. The instance will contain a `value` and `buffer` property.

For ease of use *lowercase* members of `eznbt` can be used to construct classes like this: `int(5)` (instead of
`new Int({ value: 5 })`)

### Writing stuff
```javascript
import NBT from 'eznbt'
const { NBTString, string, rootcompound } = NBT

/* NBT files are usually implicitly in a compound. If this is the case you should use
 * a named RootCompound. You name it by providing a [Symbol.for('NBTRootTagName')] string.
 */
const myCompound = rootcompound({
  [Symbol.for('NBTRootTagName')]: 'rootTagName',
  myStr: new NBTString({ value: 'hello' }),
  // is equivalent to
  myStr2: new NBT.String({ value: 'hello' }),
  // is equivalent to
  myStr3: string('hello'),
  // is equivalent to
  myStr4: 'hello'
})

myCompound.buffer // ready to send to your client/server
```

### Reading stuff
```javascript
import NBT from 'eznbt'
const { Compound } = NBT

const myBuffer = ... // a buffer you received. it is an nbt compound tag (as always)
const myCompound = new Compound({ buffer: myBuffer })
myCompound.value // yields the compound as an object. children are NBT Tag instances
myCompound.json // yields the compound as an object. children are JS types (number, string, bigint, etc.)
```

### Reading and writing lists
Lists are special because they have one set type, which you will first have to pass to the `List` or `list` function.
```javascript
import NBT from 'eznbt'
const { List, list, NBTString } = NBT


const myList = list(NBTString)('hello', 'world!') // creates a string-list

// When the type of the list is unknown, it can only be used to read stuff:
const { value } = new (List())({ buffer: myList.buffer })
```

### Compound shorthands
The compound tag comes with a few handy shorthands
```javascript
import NBT from 'eznbt'
const { int, compound } = NBT

const myCompound = compound({
  myList: [int(5), int(6)], // creates an int-list
  myLong: 5n, // creates a long
  myStr: 'hello world!', // creates a string
  // creates a compound
  myCompound: {
    myLongList: [5n, 6n, 7n] // creates a long-list
  }
})
```

### Compound vs RootCompound
Since generally all NBT files are implicitly in a compound tag, you should probably always use RootCompound for the
outside object, and Compound otherwise

```javascript
// RootCompound.json vs Compound.json

// RootCompound.json will put all values as a property of the root compound's name
rootcompound({ a: 1, b: 2, [Symbol.for('NBTRootTagName')]: 'hello!' }).json
/** {
  *   'hello!': {
  *     a: 1,
  *     b: 2
  *   }
  * }
  */

// Compound doesn't have a name so it won't be named
compound({ a: 1, b: 2 }).json
/** {
  *   a: 1,
  *   b: 2
  * }
  */
```

## Typescript
This package has been made using Typescript and ships with type declarations.

