import { ENBTTag } from '../enums/ENBTTag'

interface HasValue<T> {
  value: T;
  buffer?: undefined;
}

interface HasBuffer {
  buffer: Buffer;
  value?: undefined;
}

export interface NBTTagConstructor {
  new ({ value, buffer }: HasValue<any> | HasBuffer, ...args: any[]): NBTTag<any>;
  id: ENBTTag;
}

// Basic abstract class that all NBT Tags will implement
export abstract class NBTTag<T> {
  public value: T
  public buffer: Buffer
  public static id: ENBTTag
  public json?: object

  constructor ({ value = undefined, buffer = undefined }: HasValue<T> | HasBuffer) {
    this.value = value ?? this.read(buffer as Buffer)

    // Re-write the buffer from the read value
    // This is done in case the provided buffer was too large but still read correctly
    this.buffer = this.write(this.value)
    if (value !== undefined) this.value = this.read(this.buffer) // reflect any loss of precision
  }

  protected abstract read (data: Buffer): T
  protected abstract write (value: T): Buffer
}

// A function that generates a NBT tag class. E.g. types lists are first generated using their type
export type NBTGenerator = (Type?: NBTTagConstructor) => NBTTagConstructor

// A map mapping ENBTTags to their respective NBT Tag classes
// This map is populated by all files in /DataTypes
export const types: Map<ENBTTag, NBTTagConstructor|NBTGenerator> = new Map()
