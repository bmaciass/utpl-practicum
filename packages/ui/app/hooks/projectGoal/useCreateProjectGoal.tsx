import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useProjectGoalList'

const createMutation = graphql(`
  mutation ProjectGoal_useCreateProjectGoal ($data: CreateProjectGoalDataInput!) {
    projectGoal {
      create (data: $data) {
        id
        name
        active
      }
    }
  }
`)

export const useCreateProjectGoal = () => {
  const [fn, { called, loading, error, data }] = useMutation(createMutation, { refetchQueries: [{ query }] })

  const projectGoal = data?.projectGoal.create


  return { called, loading, error, projectGoal, createProjectGoal: fn }
}