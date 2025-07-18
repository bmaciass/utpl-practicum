import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const InstitutionQueriesRef = builder.objectRef('institution')

export const InstitutionQueries = builder.objectType(InstitutionQueriesRef, {
  name: 'InstitutionQueries',
  description: 'Institution queries',
})

builder.queryField('institution', (t) =>
  t.field({
    resolve: emptyResolver,
    type: InstitutionQueriesRef,
  }),
)
