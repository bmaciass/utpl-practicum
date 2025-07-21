import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const UserQueriesRef = builder.objectRef('user')

export const UserQueries = builder.objectType(UserQueriesRef, {
  name: 'UserQueries',
  description: 'User queries',
})

builder.queryField('user', (t) =>
  t.field({
    resolve: emptyResolver,
    type: UserQueriesRef,
  }),
)
