import { useQuery } from '@apollo/client/react/index.js'
import { graphql } from '~/gql'

export const query = graphql(`
  query GetProgramList_useProgramList {
    program {
      list {
        records {
          id
          name
        }
      }
    }
  }
`)

export const useProgramList = () => {
  const { called, loading, data, error } = useQuery(query)

  return { called, loading, programs: data?.program.list.records ?? [], error }
}