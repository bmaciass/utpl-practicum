import { InstitutionModel } from '~/models/Institution'
import builder from '../../../builder'
import { Institution } from '../../objects/Institution'
import { InstitutionQueries } from './root'

builder.objectField(InstitutionQueries, 'one', (t) =>
  t.field({
    type: Institution,
    nullable: true,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, { db }) => {
      const institution = await new InstitutionModel(db).findUnique(id, [
        'active',
        'name',
        'uid',
        'area',
        'level',
      ])
      if (!institution) return null

      return institution
    },
  }),
)
