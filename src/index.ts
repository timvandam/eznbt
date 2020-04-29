// These datatypes are for Java edition Minecraft - so big endian stuff
import { ENBTTag } from './enums/ENBTTag'
import { NBTString, string } from './DataTypes/String'
import { ByteArray, bytearray } from './DataTypes/ByteArray'
import { Float, float } from './DataTypes/Float'
import { IntArray, intarray } from './DataTypes/IntArray'
import { int, Int } from './DataTypes/Int'
import { Long, long } from './DataTypes/Long'
import { list, List } from './DataTypes/List'
import { short, Short } from './DataTypes/Short'
import { LongArray, longarray } from './DataTypes/LongArray'
import { Byte, byte } from './DataTypes/Byte'
import { Double, double } from './DataTypes/Double'
import { End } from './DataTypes/End'
import { compound, Compound } from './DataTypes/Compound'

interface HasValue<T> {
  value: T;
  buffer?: undefined;
}

interface HasBuffer {
  buffer: Buffer;
  value?: undefined;
}

export interface NBTTagConstructor {
  new ({ value, buffer }: HasValue<any> | HasBuffer): NBTTag<any>;
  id: ENBTTag;
}

// Basic abstract class that all NBT Tags will implement
export abstract class NBTTag<T> {
  public value: T
  public buffer: Buffer
  public static id: ENBTTag

  constructor ({ value = undefined, buffer = undefined }: HasValue<T> | HasBuffer) {
    this.value = value ?? this.read(buffer as Buffer)

    // Re-write the buffer from the read value
    // This is done in case the provided buffer was too large but still read correctly
    this.buffer = this.write(this.value)
  }

  protected abstract read (data: Buffer): T
  protected abstract write (value: T): Buffer
}

// A function that generates a NBT tag class. E.g. types lists are first generated using their type
export type NBTGenerator = (Type?: NBTTagConstructor) => NBTTagConstructor

// A map mapping ENBTTags to their respective NBT Tag classes
// This map is populated by all files in /DataTypes
export const types: Map<ENBTTag, NBTTagConstructor|NBTGenerator> = new Map()

// Export all types and their shorthands
export default {
  Byte,
  byte,
  ByteArray,
  bytearray,
  Compound,
  compound,
  Double,
  double,
  End,
  Float,
  float,
  Int,
  int,
  IntArray,
  intarray,
  List,
  list,
  Long,
  long,
  LongArray,
  longarray,
  Short,
  short,
  NBTString,
  string
}
