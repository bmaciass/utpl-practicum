import * as schema from './schema'

import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const { Client } = pg

export function getDrizzleInstance(databaseUrl?: string) {
  const connectionString = process.env.DATABASE_URL ?? databaseUrl

  if (!connectionString) throw new Error('no database url set')

  const client = new Client({
    connectionString,
  })

  const db = drizzle(client, { schema })

  return db
}

export async function getDBConnection(databaseUrl?: string) {
  const connectionString = process.env.DATABASE_URL ?? databaseUrl

  if (!connectionString) throw new Error('no database url set')

  const client = new Client({
    connectionString,
  })
  await client.connect()
  const db = drizzle(client, { schema })
  return { db, client }
}

export type Db = NodePgDatabase<typeof schema>
export type Client = pg.Client
