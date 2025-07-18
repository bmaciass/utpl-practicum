import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

const query = graphql(`
  query GetInstitutions_useGetInstitution ($id: String!) {
    institution {
      one (id: $id) {
        id
        name
        area
        level
        active
      }
    }
  }
`)

export const useGetInstitution = (id: string) => {
  const { called, loading, data, error } = useQuery(query, { variables: { id } })

  return { called, loading, institution: data?.institution.one, error }
}