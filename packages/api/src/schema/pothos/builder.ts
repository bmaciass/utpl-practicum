import SchemaBuilder from '@pothos/core'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import type Decimal from 'decimal.js'
import {
  DateResolver,
  DateTimeISOResolver,
  JSONResolver,
} from 'graphql-scalars'
import { isNil } from 'lodash-es'
import type { AppContext } from './context'
import { DecimalResolver } from './types/scalars/Decimal'

const builder = new SchemaBuilder<{
  Context: AppContext
  DefaultFieldNullability: false
  DefaultInputFieldRequiredness: true
  AuthScopes: {
    authenticated: boolean
  }
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
}>({
  defaultFieldNullability: false,
  defaultInputFieldRequiredness: true,
  plugins: [ScopeAuthPlugin],
  scopeAuth: {
    unauthorizedError: () => 'Not authorized',
    authScopes: async (context) => {
      return {
        authenticated: !isNil(context.token),
      }
    },
  },
})

builder.addScalarType('JSON', JSONResolver)
builder.addScalarType('Decimal', DecimalResolver)
builder.addScalarType('Date', DateResolver)
builder.addScalarType('DateTime', DateTimeISOResolver)

// always required since this "empty" query is the root query
builder.queryType({})
builder.mutationType({})

export default builder
