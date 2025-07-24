import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

const query = graphql(`
  query ProjectGoal_useGetProjectGoal ($id: String!) {
    projectGoal {
      one (id: $id) {
        id
        name
        status
        projectId
        active
      }
    }
  }
`)

export const useGetProjectGoal = (id: string) => {
  const { called, loading, data, error } = useQuery(query, { variables: { id } })

  return { called, loading, projectGoal: data?.projectGoal.one, error }
}