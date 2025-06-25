import { getDBConnection } from '@sigep/db'
import { createYoga } from 'graphql-yoga'
import { useResponse } from '~/plugins/onResponse'
import schema from '~/schema'
import type { AppContext } from '~/schema/pothos/context'

async function createContext(env: Env): Promise<AppContext> {
  const { client, db } = await getDBConnection(env.DATABASE_URL)

  await client.connect()

  return {
    client,
    db,
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const yoga = createYoga({
      schema,
      context: () => {
        return createContext(env)
      },
      plugins: [useResponse], // this plugin will close the connection at the end
    })
    return yoga(request)
  },
}
