import { getDBConnection } from '@sigep/db'
import { getDatabaseURL } from '~/config/env'

export async function getDB() {
  const { db, client } = await getDBConnection(getDatabaseURL())
  return { db, client }
}
