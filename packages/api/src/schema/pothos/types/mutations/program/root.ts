import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const ProgramMutationsRef = builder.objectRef('program')

export const ProgramMutations = builder.objectType(ProgramMutationsRef, {
  name: 'ProgramMutations',
  description: 'Program mutations',
})

builder.mutationField('program', (t) =>
  t.field({
    resolve: emptyResolver,
    type: ProgramMutationsRef,
  }),
)
