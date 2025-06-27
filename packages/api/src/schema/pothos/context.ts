import type { Db, Client } from '@sigep/db'
import type { JWTAccessTokenPayload } from '@sigep/auth'

export type AppContext = {
  db: Db
  client: Client
  token?: JWTAccessTokenPayload
}
