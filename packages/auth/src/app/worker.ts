import { createYoga } from 'graphql-yoga'
import { getDB } from '~/helpers/getDB'
import { useResponse } from '~/plugins/onResponse'
import schema from '~/schema'
import type { AppContext } from '~/schema/pothos/context'

async function createContext(env: Env): Promise<AppContext> {
  const db = await getDB(env)

  return {
    db,
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const yoga = createYoga({
      schema,
      context: () => {
        return createContext(env)
      },
      plugins: [useResponse],
    })
    return yoga(request)
  },
}
