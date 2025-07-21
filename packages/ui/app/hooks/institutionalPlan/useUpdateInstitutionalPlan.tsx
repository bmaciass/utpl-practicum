import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useInstitutionalPlanList'

const updateMutation = graphql(`
  mutation UpdateInstitution_useSaveInstitution ($data: UpdateInstitutionDataInput!, $where: UpdateInstitutionWhereInput!) {
    institution {
      update (data: $data, where: $where) {
        id
        name
        area
        level
        active
      }
    }
  }
`)

export const useUpdateInstitution = () => {
  const [fn, { called, loading, error, data }] = useMutation(updateMutation, { refetchQueries: [{ query }] })

  const institution = data?.institution.update


  return { called, loading, error, institution, updateInstitution: fn }
}