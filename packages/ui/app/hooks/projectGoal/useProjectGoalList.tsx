import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

export const query = graphql(`
  query ProjectGoal_useProjectGoalList ($projectId: String!) {
    projectGoal {
      list (projectId: $projectId) {
        records {
          id
          name
          projectId
        }
      }
    }
  }
`)

export const useProjectGoalList = (projectId: string) => {
  const { called, loading, data, error } = useQuery(query, { variables: { projectId } })

  return { called, loading, projectGoals: data?.projectGoal.list.records ?? [], error }
}