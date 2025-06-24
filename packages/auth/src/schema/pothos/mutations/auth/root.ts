import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const AuthMutationsRef = builder.objectRef('auth')

export const AuthMutations = builder.objectType(AuthMutationsRef, {
  name: 'AuthMutations',
  description: 'Auth mutations',
})

builder.mutationField('auth', (t) =>
  t.field({
    resolve: emptyResolver,
    type: AuthMutationsRef,
  }),
)
