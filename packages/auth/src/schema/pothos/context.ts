import type { Client, Db } from '@sigep/db'

export type AppContext = {
  client: Client
  db: Db
}
