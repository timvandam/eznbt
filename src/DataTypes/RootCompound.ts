import { ENBTTag } from '../enums/ENBTTag'
import { NBTTag, types } from './NBTTag'
import { Compound } from './Compound'

const NBTRootTagName = Symbol.for('NBTRootTagName')

/**
 * Like a normal compound, but can be named and should be used when writing directly to the implicit compound that each
 * NBT file has
 */
export class RootCompound extends Compound {
  public static id = ENBTTag.Compound

  get json () {
    const json = super.getJson()
    const value: Record<string|typeof NBTRootTagName, any> = this.value
    return { [value[NBTRootTagName]]: json }
  }

  protected read (data: Buffer): Record<string|typeof NBTRootTagName, NBTTag<any>> {
    const id = data.readUInt8(0) // get ID
    if (id !== RootCompound.id) throw new Error('Received non-compound data!')
    const nameLength = data.readUInt16BE(1)
    const name = data.slice(3, 3 + nameLength).toString('utf8')
    const compoundBuffer = data.slice(3 + nameLength)
    return {
      ...super.read(compoundBuffer),
      [NBTRootTagName]: name
    } as Record<string|typeof NBTRootTagName, any>
  }

  protected write (data: Record<string|typeof NBTRootTagName, NBTTag<any>|any>): Buffer {
    // Simply write but add ID & name
    const id = Buffer.alloc(1, RootCompound.id)
    const nameLength = Buffer.allocUnsafe(2)
    nameLength.writeUInt16BE(data[NBTRootTagName].length)
    const name = Buffer.allocUnsafe(data[NBTRootTagName].length)
    name.write(data[NBTRootTagName], 0, data[NBTRootTagName].length, 'utf8')
    return Buffer.concat([
      id,
      nameLength,
      name,
      super.write(data)
    ])
  }
}

export const rootcompound = (value: Record<string|symbol, any>): RootCompound => new RootCompound({ value })

// This NBT tag should NOT be in the types list, as it is just a handy thing, not an actual tag
