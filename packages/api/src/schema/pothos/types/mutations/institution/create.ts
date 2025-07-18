import { InstitutionModel } from '~/models/Institution'
import builder from '../../../builder'
import { Institution } from '../../objects/Institution'
import { InstitutionMutations } from './root'
import type { InstitutionPayload } from '@sigep/db'
import { InstitutionAreaEnum } from '../../enums/InstitutionArea'
import { InstitutionLevelEnum } from '../../enums/InstitutionLevel'

type TCreateInstitutionDataInput = Pick<
  InstitutionPayload,
  'name' | 'area' | 'level'
>

export const CreateInstitutionDataInput = builder
  .inputRef<TCreateInstitutionDataInput>('CreateInstitutionDataInput')
  .implement({
    fields: (t) => ({
      area: t.field({ type: InstitutionAreaEnum, required: true }),
      level: t.field({ type: InstitutionLevelEnum, required: true }),
      name: t.string({ required: true }),
    }),
  })

builder.objectField(InstitutionMutations, 'create', (t) =>
  t.field({
    type: Institution,
    authScopes: { authenticated: true },
    args: {
      data: t.arg({ type: CreateInstitutionDataInput, required: true }),
    },
    resolve: async (_, { data }, { db, user }) => {
      const institution = await new InstitutionModel(db).create({
        createdBy: user.uid,
        ...data,
      })
      return institution
    },
  }),
)
