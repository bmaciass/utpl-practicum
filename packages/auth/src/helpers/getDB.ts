import { getDBConnection } from '@sigep/db'

export async function getDB(env: Env) {
  const db = await getDBConnection(env.DATABASE_URL)
  return db
}
