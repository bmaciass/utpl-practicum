import type { ProjectGoalRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'
import { ProjectGoalStatusEnum } from '../enums/ProjectGoalStatus'

export type TProjectGoal = Pick<
  ProjectGoalRecord,
  'name' | 'startDate' | 'endDate' | 'active' | 'status'
> & {
  id: string
  projectId: string
}

export const ProjectGoal = builder
  .objectRef<TProjectGoal>('ProjectGoal')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      startDate: t.expose('startDate', { type: 'Date', nullable: true }),
      endDate: t.expose('endDate', { type: 'Date', nullable: true }),
      projectId: t.exposeString('projectId'),
      status: t.expose('status', { type: ProjectGoalStatusEnum }),
      active: t.exposeBoolean('active'),
    }),
  })
