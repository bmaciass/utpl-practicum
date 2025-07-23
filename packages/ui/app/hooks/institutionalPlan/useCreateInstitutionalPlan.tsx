import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useInstitutionalPlanList'

const createMutation = graphql(`
  mutation CreateInstitutionalPlan_useCreateInstitutionalPlan ($data: CreateInstitutionalPlanDataInput!) {
    institutionalPlan {
      create (data: $data) {
        id
        name
        active
      }
    }
  }
`)

export const useCreateInstitutionalPlan = (id?: string) => {
  const [fn, { called, loading, error, data }] = useMutation(createMutation, { refetchQueries: [{ query }] })

  const institutionalPlan = data?.institutionalPlan.create


  return { called, loading, error, institutionalPlan, createInstitutionalPlan: fn }
}