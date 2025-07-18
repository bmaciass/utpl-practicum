import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useInstitutionList'

const createMutation = graphql(`
  mutation CreateInstitution_useSaveInstitution ($data: CreateInstitutionDataInput!) {
    institution {
      create (data: $data) {
        id
        name
        area
        level
        active
      }
    }
  }
`)

export const useCreateInstitution = (id?: string) => {
  const [fn, { called, loading, error, data }] = useMutation(createMutation, { refetchQueries: [{ query }] })

  const institution = data?.institution.create


  return { called, loading, error, institution, createInstitution: fn }
}