import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const ProgramQueriesRef = builder.objectRef('program')

export const ProgramQueries = builder.objectType(ProgramQueriesRef, {
  name: 'ProgramQueries',
  description: 'Program queries',
})

builder.queryField('program', (t) =>
  t.field({
    resolve: emptyResolver,
    type: ProgramQueriesRef,
  }),
)
