import type { Db, Client } from '@sigep/db'
import type { JWTAccessTokenPayload } from '~/helpers/session/types'

export type AppContext = {
  db: Db
  client: Client
  token?: JWTAccessTokenPayload
}
