import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

export const query = graphql(`
  query GetProjectList_useProjectList ($programId: String!) {
    project {
      list (programId: $programId) {
        records {
          id
          name
          programId
        }
      }
    }
  }
`)

export const useProjectList = (programId: string) => {
  const { called, loading, data, error } = useQuery(query, { variables: { programId } })

  return { called, loading, projects: data?.project.list.records ?? [], error }
}