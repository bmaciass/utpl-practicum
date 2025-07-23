import type { InstitutionRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'
import { InstitutionAreaEnum } from '../enums/InstitutionArea'
import { InstitutionLevelEnum } from '../enums/InstitutionLevel'
import {
  InstitutionEstraticObjetive,
  type TInstitutionEstraticObjetive,
} from './InstitutionEstrategicObjetive'

export type TInstitution = Pick<
  InstitutionRecord,
  'name' | 'active' | 'area' | 'level'
> & {
  uid: string
  objetives: TInstitutionEstraticObjetive[]
}

export const Institution = builder
  .objectRef<TInstitution>('Institution')
  .implement({
    fields: (t) => ({
      id: t.exposeID('uid'),
      name: t.exposeString('name'),
      area: t.expose('area', { type: InstitutionAreaEnum }),
      level: t.expose('level', { type: InstitutionLevelEnum }),
      objetives: t.expose('objetives', { type: [InstitutionEstraticObjetive] }),
      active: t.exposeBoolean('active'),
    }),
  })
