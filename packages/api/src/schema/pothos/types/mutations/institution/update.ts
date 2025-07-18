import { InstitutionModel } from '~/models/Institution'
import builder from '../../../builder'
import { Institution } from '../../objects/Institution'
import { InstitutionMutations } from './root'
import type { InstitutionPayload } from '@sigep/db'
import type { SetOptional } from 'type-fest'
import { InstitutionAreaEnum } from '../../enums/InstitutionArea'
import { InstitutionLevelEnum } from '../../enums/InstitutionLevel'

type TUpdateInstitutionWhereInput = {
  id: string
}

export const UpdateInstitutionWhereInput = builder
  .inputRef<TUpdateInstitutionWhereInput>('UpdateInstitutionWhereInput')
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  })

type TUpdateInstitutionDataInput = Pick<
  SetOptional<InstitutionPayload, 'name' | 'area' | 'level' | 'active'>,
  'name' | 'area' | 'level' | 'active'
>

export const UpdateInstitutionDataInput = builder
  .inputRef<TUpdateInstitutionDataInput>('UpdateInstitutionDataInput')
  .implement({
    fields: (t) => ({
      area: t.field({ type: InstitutionAreaEnum, required: false }),
      level: t.field({ type: InstitutionLevelEnum, required: false }),
      name: t.string({ required: false }),
      active: t.boolean({ required: false }),
    }),
  })

builder.objectField(InstitutionMutations, 'update', (t) =>
  t.field({
    type: Institution,
    authScopes: { authenticated: true },
    args: {
      where: t.arg({ type: UpdateInstitutionWhereInput, required: true }),
      data: t.arg({ type: UpdateInstitutionDataInput, required: true }),
    },
    resolve: async (_, { data, where }, { db, user }) => {
      const institution = await new InstitutionModel(db).update(where.id, {
        updatedBy: user.uid,
        active: data.active ?? undefined,
        area: data.area ?? undefined,
        level: data.level ?? undefined,
        name: data.name ?? undefined,
      })
      return institution
    },
  }),
)
