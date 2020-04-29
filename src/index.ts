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
  String: NBTString,
  string
}
