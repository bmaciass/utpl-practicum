import { useMutation } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'
import { query } from './useProgramList'

const createMutation = graphql(`
  mutation CreateProgram_useCreateProgram ($data: CreateProgramDataInput!) {
    program {
      create (data: $data) {
        id
        name
        active
      }
    }
  }
`)

export const useCreateProgram = () => {
  const [fn, { called, loading, error, data }] = useMutation(createMutation, { refetchQueries: [{ query }] })

  const program = data?.program.create


  return { called, loading, error, program, createProgram: fn }
}