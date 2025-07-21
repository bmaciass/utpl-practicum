import type { InstitutionalPlanRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'

export type TInstitutionalPlan = Pick<
  InstitutionalPlanRecord,
  'active' | 'name' | 'url' | 'version' | 'year'
> & {
  id: string
  institutionId: string
}

export const InstitutionalPlan = builder
  .objectRef<TInstitutionalPlan>('Institution')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      active: t.exposeBoolean('active'),
      version: t.exposeInt('version'),
      year: t.exposeInt('year'),
      institutionId: t.exposeString('institutionId'),
    }),
  })
