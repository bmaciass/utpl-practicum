import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const InstitutionMutationsRef = builder.objectRef('institution')

export const InstitutionMutations = builder.objectType(
  InstitutionMutationsRef,
  {
    name: 'InstitutionMutations',
    description: 'Institution mutations',
  },
)

builder.mutationField('institution', (t) =>
  t.field({
    resolve: emptyResolver,
    type: InstitutionMutationsRef,
  }),
)
