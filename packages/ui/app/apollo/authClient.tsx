import { ApolloClient, InMemoryCache } from '@apollo/client';

export const authClient = new ApolloClient({
  uri: 'http://127.0.0.1:6001', // FIXME: Use env
  cache: new InMemoryCache(),
})