import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useProjectList'

const createMutation = graphql(`
  mutation CreateProject_useCreateProject ($data: CreateProjectDataInput!) {
    project {
      create (data: $data) {
        id
        name
        active
      }
    }
  }
`)

export const useCreateProject = () => {
  const [fn, { called, loading, error, data }] = useMutation(createMutation, { refetchQueries: [{ query }] })

  const project = data?.project.create


  return { called, loading, error, project, createProject: fn }
}