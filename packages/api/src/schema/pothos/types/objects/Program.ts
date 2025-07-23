import type { ProgramRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'
import { Project, type TProject } from './Project'
import { type TUser, User } from './User'

export type TProgram = Pick<
  ProgramRecord,
  'name' | 'startDate' | 'endDate' | 'description' | 'active'
> & {
  id: string
  projects: TProject[]
  responsible: TUser
  responsibleId: string
}

export const Program = builder.objectRef<TProgram>('Program').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    projects: t.expose('projects', { type: [Project] }),
    responsible: t.expose('responsible', { type: User }),
    responsibleId: t.exposeString('responsibleId'),
    startDate: t.expose('startDate', { type: 'Date', nullable: true }),
    endDate: t.expose('endDate', { type: 'Date', nullable: true }),
    active: t.exposeBoolean('active'),
  }),
})
