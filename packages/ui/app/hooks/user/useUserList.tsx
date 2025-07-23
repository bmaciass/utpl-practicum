import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

export const query = graphql(`
  query GetUsers_useUserList {
    user {
      list {
        records {
          id
          name
          firstName
          lastName
          active
        }
      }
    }
  }
`)

export const useUserList = () => {
  const { called, loading, data, error } = useQuery(query)

  return { called, loading, users: data?.user.list.records ?? [], error }
}