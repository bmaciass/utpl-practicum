import postgres from 'postgres'
import * as schema from './schema'

// FIXME: Use node-postgres instead
// See https://github.com/cloudflare/workers-sdk/issues/9668 and https://github.com/brianc/node-postgres/issues/3493

import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'

export async function getDBConnection(databaseUrl?: string) {
  const connectionString = process.env.DATABASE_URL ?? databaseUrl

  if (!connectionString) throw new Error('no database url set')

  const db = drizzle({
    client: postgres(connectionString, { prepare: false }),
    schema,
  })
  return db
}

export type Db = PostgresJsDatabase<typeof schema>
