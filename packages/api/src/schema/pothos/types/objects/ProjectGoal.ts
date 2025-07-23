import type { ProjectGoalRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'

export type TProjectGoal = Pick<
  ProjectGoalRecord,
  'name' | 'startDate' | 'endDate' | 'active'
> & {
  id: string
}

export const ProjectGoal = builder
  .objectRef<TProjectGoal>('ProjectGoal')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      startDate: t.expose('startDate', { type: 'Date', nullable: true }),
      endDate: t.expose('endDate', { type: 'Date', nullable: true }),
      active: t.exposeBoolean('active'),
    }),
  })
