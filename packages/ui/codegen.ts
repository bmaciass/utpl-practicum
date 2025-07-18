import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    '../shared/graphql/api-schema.graphql',
    '../shared/graphql/auth-schema.graphql',
  ],
  ignoreNoDocuments: true,
  overwrite: true,
  documents: ['app/**/*.tsx'],
  generates: {
    './app/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
}
export default config
