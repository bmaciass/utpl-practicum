import type { Client, Db } from '@sigep/db'
import type { JWTAccessTokenPayload } from '~/helpers/session/types'

export type AppContext = {
  db: Db
  client: Client
  user: {
    uid: string
  }
  token: JWTAccessTokenPayload
}
