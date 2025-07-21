import { InstitutionalPlanModel } from '~/models/InstitutionalPlan'
import builder from '../../../builder'
import {
  InstitutionalPlan,
  type TInstitutionalPlan,
} from '../../objects/InstitutionalPlan'
import { StringFilter } from '../../inputs/FilterInputs'
import { InstitutionalPlanQueries } from './root'
import { pick } from 'lodash-es'

export type TInstitutionalPlansQueryResponse = {
  records: TInstitutionalPlan[]
}

export const InstitutionalPlansQueryResponse = builder
  .objectRef<TInstitutionalPlansQueryResponse>(
    'InstitutionalPlansQueryResponse',
  )
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [InstitutionalPlan] }),
    }),
  })

builder.objectField(InstitutionalPlanQueries, 'list', (t) =>
  t.field({
    type: InstitutionalPlansQueryResponse,
    authScopes: { authenticated: true },
    args: {
      active: t.arg.boolean({ required: false }),
      name: t.arg({ type: StringFilter, required: false }),
    },
    resolve: async (_, __, { db }) => {
      const institutionalPlans = await new InstitutionalPlanModel(db).findMany({
        fields: [
          'active',
          'name',
          'institutionUid',
          'uid',
          'url',
          'version',
          'year',
        ],
      })
      return {
        records: institutionalPlans.map((plan) => ({
          ...pick(plan, ['active', 'name', 'url', 'version', 'year']),
          id: plan.uid,
          institutionId: plan.institutionUid,
        })),
      }
    },
  }),
)
