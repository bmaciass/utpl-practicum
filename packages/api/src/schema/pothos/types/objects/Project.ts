import type { ProjectRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'
import { ProjectStatusEnum } from '../enums/ProjectStatus'
import { ProjectGoal, type TProjectGoal } from './ProjectGoal'

export type TProject = Pick<
  ProjectRecord,
  'name' | 'description' | 'startDate' | 'endDate' | 'status' | 'active'
> & {
  id: string
  goals: TProjectGoal[]
  programId: string
  responsibleId: string
}

export const Project = builder.objectRef<TProject>('Project').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    status: t.expose('status', { type: ProjectStatusEnum, nullable: false }),
    goals: t.expose('goals', { type: [ProjectGoal] }),
    startDate: t.expose('startDate', { type: 'Date', nullable: true }),
    endDate: t.expose('endDate', { type: 'Date', nullable: true }),
    programId: t.exposeString('programId'),
    responsibleId: t.exposeString('responsibleId'),
    active: t.exposeBoolean('active'),
  }),
})
