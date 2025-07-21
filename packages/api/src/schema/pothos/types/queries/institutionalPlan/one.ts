import { InstitutionalPlanModel } from '~/models/InstitutionalPlan'
import builder from '../../../builder'
import { InstitutionalPlan } from '../../objects/InstitutionalPlan'
import { InstitutionalPlanQueries } from './root'
import { pick } from 'lodash-es'

builder.objectField(InstitutionalPlanQueries, 'one', (t) =>
  t.field({
    type: InstitutionalPlan,
    nullable: true,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, { db }) => {
      const institutionalPlan = await new InstitutionalPlanModel(db).findUnique(
        id,
        ['active', 'institutionUid', 'uid', 'url', 'version', 'year'],
      )
      if (!institutionalPlan) return null
      return {
        ...pick(institutionalPlan, ['active', 'url', 'version', 'year', 'name']),
        id: institutionalPlan.uid,
        institutionId: institutionalPlan.institutionUid,
      }
    },
  }),
)
