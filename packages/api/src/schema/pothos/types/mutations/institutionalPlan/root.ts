import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const InstitutionalPlanMutationsRef =
  builder.objectRef('institutionalPlan')

export const InstitutionalPlanMutations = builder.objectType(
  InstitutionalPlanMutationsRef,
  {
    name: 'InstitutionalPlanMutations',
    description: 'Institution Plan mutations',
  },
)

builder.mutationField('institutionalPlan', (t) =>
  t.field({
    resolve: emptyResolver,
    type: InstitutionalPlanMutationsRef,
  }),
)
