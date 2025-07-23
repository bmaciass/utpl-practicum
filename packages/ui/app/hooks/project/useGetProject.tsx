import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

const query = graphql(`
  query GetProjects_useGetProject ($id: String!) {
    project {
      one (id: $id) {
        id
        name
        description
        status
        programId
        responsibleId
        active
      }
    }
  }
`)

export const useGetProject = (id: string) => {
  const { called, loading, data, error } = useQuery(query, { variables: { id } })

  return { called, loading, project: data?.project.one, error }
}