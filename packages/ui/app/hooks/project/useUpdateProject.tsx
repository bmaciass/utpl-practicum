import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useProjectList'

const updateMutation = graphql(`
  mutation UpdateProject_useUpdateProject ($data: UpdateProjectDataInput!, $where: UpdateProjectWhereInput!) {
    project {
      update (data: $data, where: $where) {
        id
        name
        description
        responsibleId
        active
      }
    }
  }
`)

export const useUpdateProject = (programId: string) => {
  const [fn, { called, loading, error, data }] = useMutation(updateMutation, { refetchQueries: [{ query, variables: { programId } }] })

  const project = data?.project.update


  return { called, loading, error, project, updateProject: fn }
}