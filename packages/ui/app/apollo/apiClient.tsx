import { InMemoryCache } from '@apollo/client/cache/index.js'
import { ApolloClient } from '@apollo/client/index.js'
export const apiClient = new ApolloClient({
  uri: 'http://localhost:6002/graphql', // DO NOT USE 127.0.0.1
  cache: new InMemoryCache({
    typePolicies: {
      ProgramQueries: { merge: false }
    }
  }),
  credentials: 'include',
})