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
    if (!Decimal.isDecimal(value))
      throw new Error('value is not a valid decimal')

    return new Decimal(value).toNumber()
  },
  /**
   * Value from the client
   */
  parseValue(value) {
    if (!Decimal.isDecimal(value))
      throw new Error('value is not a valid decimal')

    return new Decimal(value).toNumber()
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
