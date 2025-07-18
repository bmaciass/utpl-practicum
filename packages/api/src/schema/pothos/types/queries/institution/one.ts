import { InstitutionModel } from '~/models/Institution'
import builder from '../../../builder'
import { Institution, type TInstitution } from '../../objects/Institution'
import { InstitutionQueries } from './root'

builder.objectField(InstitutionQueries, 'one', (t) =>
  t.field({
    type: Institution,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, { db }) => {
      const institution = await new InstitutionModel(db).findUniqueOrThrow(id, [
        'active',
        'name',
        'uid',
        'area',
        'level',
      ])
      return institution
    },
  }),
)
