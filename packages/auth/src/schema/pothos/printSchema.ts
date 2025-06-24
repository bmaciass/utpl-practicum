import { writeFileSync } from 'node:fs'
import { lexicographicSortSchema, printSchema } from 'graphql'
import schema from '~/schema'

const schemaAsString = printSchema(lexicographicSortSchema(schema))

// run from package root
writeFileSync(
  `${__dirname}/../shared/graphql/auth-schema.graphql`,
  schemaAsString,
)
