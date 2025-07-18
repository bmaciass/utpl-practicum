import { ApolloClient } from '@apollo/client/index.js'
import { InMemoryCache } from '@apollo/client/cache/index.js'
export const apiClient = new ApolloClient({
  uri: 'http://localhost:6002/graphql', // DO NOT USE 127.0.0.1
  cache: new InMemoryCache(),
  credentials: 'include',
})