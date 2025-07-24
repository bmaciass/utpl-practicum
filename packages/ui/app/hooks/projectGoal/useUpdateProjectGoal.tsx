import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useProjectGoalList'

const updateMutation = graphql(`
  mutation ProjectGoal_useUpdateProjectGoal ($data: UpdateProjectGoalDataInput!, $where: UpdateProjectGoalWhereInput!) {
    projectGoal {
      update (data: $data, where: $where) {
        id
        name
        status
        projectId
        active
      }
    }
  }
`)

export const useUpdateProjectGoal = (projectId: string) => {
  const [fn, { called, loading, error, data }] = useMutation(updateMutation, { refetchQueries: [{ query, variables: { projectId } }] })

  const projectGoal = data?.projectGoal.update


  return { called, loading, error, projectGoal, updateProjectGoal: fn }
}