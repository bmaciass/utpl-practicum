import type { InstitutionRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'

export type TInstitution = Pick<
  InstitutionRecord,
  | 'uid'
  | 'name'
  | 'area'
  | 'level'
  | 'createdBy'
  | 'createdAt'
  | 'updatedAt'
  | 'updatedBy'
  | 'active'
>

export const Institution = builder
  .objectRef<TInstitution>('Institution')
  .implement({
    fields: (t) => ({
      id: t.exposeID('uid'),
      name: t.exposeString('name'),
      active: t.exposeBoolean('active'),
    }),
  })
