import { Decimal } from 'decimal.js'
import { GraphQLScalarType, type GraphQLScalarTypeConfig, Kind } from 'graphql'
import { isNil } from 'lodash-es'

const config: GraphQLScalarTypeConfig<number, number> = {
  name: 'Decimal',
  description: 'An arbitrary-precision Decimal type.',
  /**
   * Value sent to the client
   */
  serialize(value) {
    if (isNil(value))
      throw new Error('null or undefined cannot represent a decimal')

    if (Array.isArray(value))
      throw new Error('array cannot represent a decimal')

    if (value === true || value === false)
      throw new Error('boolean cannot represent a decimal')

    if (!Number.isNaN(value)) {
      return new Decimal(value as number).toNumber()
    }

    if (Number.isNaN(Number.parseInt(value as string)))
      throw new Error('invalid string value cannot represent a decimal')

    return new Decimal(value as string).toNumber()
  },
  /**
   * Value from the client
   */
  parseValue(value) {
    if (isNil(value))
      throw new Error('null or undefined cannot represent a decimal')

    if (Array.isArray(value))
      throw new Error('array cannot represent a decimal')

    if (value === true || value === false)
      throw new Error('boolean cannot represent a decimal')

    if (!Number.isNaN(value)) {
      return new Decimal(value as number).toNumber()
    }

    if (Number.isNaN(Number.parseInt(value as string)))
      throw new Error('invalid string value cannot represent a decimal')

    return new Decimal(value as string).toNumber()
  },
  parseLiteral(ast) {
    if (
      !(
        ast.kind === Kind.INT ||
        ast.kind === Kind.FLOAT ||
        ast.kind === Kind.STRING
      )
    ) {
      throw new Error('nil cannot represent a decimal')
    }
    return new Decimal(ast.value).toNumber()
  },
}

export const DecimalResolver = new GraphQLScalarType(config)
