import { InstitutionalPlanModel } from '~/models/InstitutionalPlan'
import builder from '../../../builder'
import { InstitutionalPlan } from '../../objects/InstitutionalPlan'
import { InstitutionalPlanMutations } from './root'
import type { InstitutionalPlanPayload } from '@sigep/db'
import type { SetOptional } from 'type-fest'
import { pick } from 'lodash-es'

type TUpdateInstitutionalPlanWhereInput = {
  id: string
}

export const UpdateInstitutionalPlanWhereInput = builder
  .inputRef<TUpdateInstitutionalPlanWhereInput>(
    'UpdateInstitutionalPlanWhereInput',
  )
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  })

type TUpdateInstitutionalPlanDataInput = Pick<
  SetOptional<InstitutionalPlanPayload, 'active' | 'name' | 'year'>,
  'active' | 'name' | 'year'
>

export const UpdateInstitutionalPlanDataInput = builder
  .inputRef<TUpdateInstitutionalPlanDataInput>(
    'UpdateInstitutionalPlanDataInput',
  )
  .implement({
    fields: (t) => ({
      name: t.string(),
      active: t.boolean(),
      year: t.int(),
    }),
  })

builder.objectField(InstitutionalPlanMutations, 'update', (t) =>
  t.field({
    type: InstitutionalPlan,
    authScopes: { authenticated: true },
    args: {
      where: t.arg({ type: UpdateInstitutionalPlanWhereInput, required: true }),
      data: t.arg({ type: UpdateInstitutionalPlanDataInput, required: true }),
    },
    resolve: async (_, { data, where }, { db, user }) => {
      const institution = await new InstitutionalPlanModel(db).update(
        where.id,
        {
          updatedBy: user.uid,
          active: data.active ?? undefined,
          name: data.name ?? undefined,
          year: data.year ?? undefined,
        },
      )
      return {
        ...pick(institution, ['active', 'name', 'year', 'url', 'version']),
        id: institution.uid,
        institutionId: institution.institutionUid,
      }
    },
  }),
)
