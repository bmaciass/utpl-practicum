import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

const query = graphql(`
  query GetUsers_useGetUser ($id: String!) {
    user {
      one (id: $id) {
        id
        name
        dni
        firstName
        lastName
        active
      }
    }
  }
`)

export const useGetUser = (id: string) => {
  const { called, loading, data, error } = useQuery(query, { variables: { id } })

  return { called, loading, user: data?.user.one, error }
}