import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

export const query = graphql(`
  query GetInstitutions_useInstitutionList {
    institution {
      list {
        records {
          id
          name
        }
      }
    }
  }
`)

export const useInstitutionList = () => {
  const { called, loading, data, error } = useQuery(query)

  return { called, loading, institutions: data?.institution.list.records ?? [], error }
}