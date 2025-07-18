import { InstitutionModel } from '~/models/Institution'
import builder from '../../../builder'
import { Institution, type TInstitution } from '../../objects/Institution'
import { StringFilter } from '../../inputs/FilterInputs'
import { InstitutionQueries } from './root'

export type TInstitutionsQueryResponse = {
  records: TInstitution[]
}

export const InstitutionsQueryResponse = builder
  .objectRef<TInstitutionsQueryResponse>('InstitutionsQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [Institution] }),
    }),
  })

builder.objectField(InstitutionQueries, 'list', (t) =>
  t.field({
    type: InstitutionsQueryResponse,
    authScopes: { authenticated: true },
    args: {
      active: t.arg.boolean({ required: false }),
      name: t.arg({ type: StringFilter, required: false }),
    },
    resolve: async (_, __, { db }) => {
      const institutions = await new InstitutionModel(db).findMany({
        fields: ['active', 'name', 'uid'],
      })
      return { records: institutions }
    },
  }),
)
