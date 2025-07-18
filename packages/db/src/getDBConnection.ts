import * as schema from './schema'
import { Client } from 'pg'

// FIXME: Use node-postgres instead
// See https://github.com/cloudflare/workers-sdk/issues/9668 and https://github.com/brianc/node-postgres/issues/3493

import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'

export async function getDBConnection(databaseUrl: string) {
  const client = new Client(databaseUrl)

  const db = drizzle({
    client,
    schema,
  })
  return { db, client }
}

export type Db = NodePgDatabase<typeof schema>
export { Client }
