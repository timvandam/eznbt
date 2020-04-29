// List prefixed by 1-byte type and 4 byte signed length
// Creates a List class with a specific type
// Whenever an array is found, it will be converted to a list with the type of the first element
// Other arrays have to be explicitly defined (IntArray, ByteArray, etc)
import { ENBTTag } from '../enums/ENBTTag'
import { NBTGenerator, NBTTag, NBTTagConstructor, types } from './NBTTag'
import { Int, int } from './Int'

export const List: NBTGenerator = (Type?: NBTTagConstructor): NBTTagConstructor => class List extends NBTTag<any[]> {
  public static id = ENBTTag.List

  protected read (data: Buffer): any[] {
    const type = data.readUInt8()

    // When a Type was provided, only read lists of that type
    if (Type !== undefined && type !== Type.id) throw new Error(`Received list with type ${ENBTTag[type]}, but expected ${ENBTTag[Type.id]}`)
    // If no type was given, read the list by the type given in the buffer
    if (Type === undefined) {
      if (!types.has(type)) throw new Error('Received a list with an invalid type')
      else Type = types.get(type) as NBTTagConstructor
    }

    const size = new Int({ buffer: data.slice(1) }).value
    const items = []
    data = data.slice(5)

    for (let i = 0; i < size; i++) {
      const item = new Type({ buffer: data })
      items.push(item.value)
      data = data.slice(item.buffer.length)
    }

    return items
  }

  protected write (values: any[]): Buffer {
    // When no type is given, only reads are allowed
    if (Type === undefined) return Buffer.allocUnsafe(0)
    const dataBuffers: Buffer[] = []
    values.forEach(value => {
      if (value instanceof (Type as NBTTagConstructor)) {
        dataBuffers.push(value.buffer)
      } else if (value instanceof NBTTag) {
        // Is an NBT tag but not the right type!
        throw new Error(`Provided NBT Tag ${value.constructor.name} to a ${(Type as NBTTagConstructor).name} list!`)
      } else {
        // Value that still has to be converted to an NBT tag
        dataBuffers.push(new (Type as NBTTagConstructor)({ value }).buffer)
      }
    })
    return Buffer.concat([
      Buffer.alloc(1, Type.id), // Type
      int(values.length).buffer, // Length
      ...dataBuffers // Send along the data
    ])
  }
}

export const list = (Type: NBTTagConstructor) => (...value: any[]): NBTTag<any> => new (List(Type))({ value })

types.set(ENBTTag.List, List)
