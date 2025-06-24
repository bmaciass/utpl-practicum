import SchemaBuilder from '@pothos/core'
import type Decimal from 'decimal.js'
import {
  DateResolver,
  DateTimeISOResolver,
  JSONResolver,
} from 'graphql-scalars'
import type { AppContext } from './context'

const builder = new SchemaBuilder<{
  Context: AppContext
  Scalars: {
    JSON: {
      // biome-ignore lint/suspicious/noExplicitAny: needed for type-safety when declaring pothos inputs
      Input: { [x: string]: any }
      Output: unknown
    }
    Decimal: {
      Input: Decimal
      Output: unknown
    }
    Date: {
      Input: Date
      Output: Date
    }
    DateTime: {
      Input: Date
      Output: Date
    }
  }
}>({})

builder.addScalarType('JSON', JSONResolver)
builder.addScalarType('Date', DateResolver)
builder.addScalarType('DateTime', DateTimeISOResolver)

// always required since this "empty" query is the root query
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'world',
    }),
  }),
})
builder.mutationType({})

export default builder
