import type { InstitutionEstrategicObjetiveRecord } from '@sigep/db'
import builder from '../../builder'

export type TInstitutionEstraticObjetive = Pick<
  InstitutionEstrategicObjetiveRecord,
  'active' | 'endDate' | 'startDate' | 'name'
>

export const InstitutionEstraticObjetive = builder
  .objectRef<TInstitutionEstraticObjetive>('InstitutionEstraticObjetive')
  .implement({
    fields: (t) => ({
      name: t.exposeString('name'),
      startDate: t.expose('startDate', { type: 'Date', nullable: true }),
      endDate: t.expose('endDate', { type: 'Date', nullable: true }),
      active: t.exposeBoolean('active'),
    }),
  })
