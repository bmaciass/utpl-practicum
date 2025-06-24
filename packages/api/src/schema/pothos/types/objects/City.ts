import type { CityRecord } from '@urbasec/db/src/schema/tables/city'
import builder from '~/schema/pothos/builder'
import { State, type TState } from './State'

export type TCity = Pick<CityRecord, 'id' | 'name' | 'stateId'> & {
  state: TState
}

export const City = builder.objectRef<TCity>('City').implement({
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    stateId: t.exposeInt('stateId', { nullable: false }),
    state: t.expose('state', { type: State, nullable: false }),
  }),
})
