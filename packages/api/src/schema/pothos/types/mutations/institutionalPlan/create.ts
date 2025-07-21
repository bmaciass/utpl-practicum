import { InstitutionalPlanModel } from '~/models/InstitutionalPlan'
import builder from '../../../builder'
import { InstitutionalPlan } from '../../objects/InstitutionalPlan'
import { InstitutionalPlanMutations } from './root'
import type { InstitutionalPlanPayload } from '@sigep/db'
import { pick } from 'lodash-es'

type TCreateInstitutionalPlanDataInput = Pick<
  InstitutionalPlanPayload,
  'name' | 'url' | 'year' | 'version' | 'active'
> & {
  institutionId: string
}

export const CreateInstitutionalPlanDataInput = builder
  .inputRef<TCreateInstitutionalPlanDataInput>(
    'CreateInstitutionalPlanDataInput',
  )
  .implement({
    fields: (t) => ({
      name: t.string(),
      institutionId: t.string(),
      url: t.string(),
      version: t.int(),
      year: t.int(),
    }),
  })

builder.objectField(InstitutionalPlanMutations, 'create', (t) =>
  t.field({
    type: InstitutionalPlan,
    authScopes: { authenticated: true },
    args: {
      data: t.arg({ type: CreateInstitutionalPlanDataInput, required: true }),
    },
    resolve: async (_, { data }, { db, user }) => {
      const institutionalPlan = await new InstitutionalPlanModel(db).create({
        createdBy: user.uid,
        ...data,
        institutionUid: data.institutionId,
      })
      return {
        ...pick(institutionalPlan, [
          'active',
          'name',
          'url',
          'year',
          'version',
        ]),
        id: institutionalPlan.uid,
        institutionId: institutionalPlan.institutionUid,
      }
    },
  }),
)
