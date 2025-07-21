import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useUserList'

const createMutation = graphql(`
  mutation CreateUser_useCreateUser ($data: CreateUserDataInput!) {
    user {
      create (data: $data) {
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

export const useCreateUser = (id?: string) => {
  const [fn, { called, loading, error, data }] = useMutation(createMutation, { refetchQueries: [{ query }] })

  const user = data?.user.create


  return { called, loading, error, user, createUser: fn }
}