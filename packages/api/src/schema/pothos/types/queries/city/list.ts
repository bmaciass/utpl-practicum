import { CityController } from '~/services/City'
import builder from '../../../builder'
import { City, type TCity } from '../../objects/City'

export type TCitiesQueryResponse = {
  records: TCity[]
}

export const CitiesQueryResponse = builder
  .objectRef<TCitiesQueryResponse>('CitiesQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [City] }),
    }),
  })

builder.queryField('cities', (t) =>
  t.field({
    type: CitiesQueryResponse,
    nullable: false,
    authScopes: { admin: true },
    resolve: async (_, __, { db }) => {
      const cities = await new CityController(db).getCities()
      return { records: cities }
    },
  }),
)
