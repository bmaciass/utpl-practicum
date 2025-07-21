import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useUserList'

const updateMutation = graphql(`
  mutation UpdateUser_useUpdateUser ($data: UpdateUserDataInput!, $where: UpdateUserWhereInput!) {
    user {
      update (data: $data, where: $where) {
        id
        name
        firstName
        lastName
        dni
        active
      }
    }
  }
`)

export const useUpdateUser = () => {
  const [fn, { called, loading, error, data }] = useMutation(updateMutation, { refetchQueries: [{ query }] })

  const user = data?.user.update


  return { called, loading, error, user, updateUser: fn }
}