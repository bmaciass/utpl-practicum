import { getDBConnection } from '@sigep/db'
import { createYoga } from 'graphql-yoga'
import { getTokenFromHeader } from '~/helpers/getTokenFromHeader'
import { useResponse } from '~/plugins/onResponse'
import schema from '~/schema/pothos'
import type { AppContext } from '~/schema/pothos/context'

async function createContext(request: Request, env: Env): Promise<AppContext> {
  const token = await getTokenFromHeader(request)
  const { db, client } = await getDBConnection(env.DATABASE_URL)

  await client.connect()

  return {
    db,
    client,
    token,
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const yoga = createYoga({
      schema,
      context: () => {
        return createContext(request, env)
      },
      plugins: [useResponse], // this plugin will close the connection at the end
    })
    return yoga(request)
  },
}
