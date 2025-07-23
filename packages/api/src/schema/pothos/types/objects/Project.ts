import type { ProjectRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'
import { ProjectGoal, type TProjectGoal } from './ProjectGoal'

export type TProject = Pick<
  ProjectRecord,
  'name' | 'description' | 'startDate' | 'endDate' | 'active'
> & {
  id: string
  goals: TProjectGoal[]
}

export const Project = builder.objectRef<TProject>('Project').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    goals: t.expose('goals', { type: [ProjectGoal] }),
    startDate: t.expose('startDate', { type: 'Date', nullable: true }),
    endDate: t.expose('endDate', { type: 'Date', nullable: true }),
    active: t.exposeBoolean('active'),
  }),
})
