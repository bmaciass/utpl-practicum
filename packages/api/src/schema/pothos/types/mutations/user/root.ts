import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const UserMutationsRef = builder.objectRef('user')

export const UserMutations = builder.objectType(UserMutationsRef, {
  name: 'UserMutations',
  description: 'User mutations',
})

builder.mutationField('user', (t) =>
  t.field({
    resolve: emptyResolver,
    type: UserMutationsRef,
  }),
)
