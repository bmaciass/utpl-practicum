import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { API_LOCAL_PORT } from '~/config/constants'
import { getDB } from '~/helpers/getDB'
import { getTokenFromHeader } from '~/helpers/getTokenFromHeader'
import { useResponse } from '~/plugins/onResponse'
import schema from '~/schema/pothos'
import type { AppContext } from '~/schema/pothos/context'

async function createContext(request: Request): Promise<AppContext> {
  const token = await getTokenFromHeader(request)
  const { db, client } = await getDB()

  return {
    db,
    client,
    token,
  }
}

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  context: ({ request }) => {
    return createContext(request)
  },
  plugins: [useResponse],
})

// Pass it into a server to hook into request handlers.
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(yoga)

// Start the server and you're done!
server.listen(API_LOCAL_PORT, () => {
  console.info(
    `Server is running on http://localhost:${API_LOCAL_PORT}/graphql`,
  )
})
