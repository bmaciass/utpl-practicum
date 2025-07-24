import type { ProjectRecord } from '@sigep/db'
import { PersonModel } from '~/models/Person'
import { ProjectModel } from '~/models/Project'
import { UserModel } from '~/models/User'
import builder from '../../../builder'
import { ProjectStatusEnum } from '../../enums/ProjectStatus'
import { Project } from '../../objects/Project'
import { ProjectMutations } from './root'

type TCreateProjectDataInput = Pick<
  ProjectRecord,
  'name' | 'description' | 'startDate' | 'endDate' | 'status'
> & {
  programId: string
  responsibleId: string
}

export const CreateProjectDataInput = builder
  .inputRef<TCreateProjectDataInput>('CreateProjectDataInput')
  .implement({
    fields: (t) => ({
      name: t.string(),
      description: t.string(),
      status: t.field({ type: ProjectStatusEnum }),
      startDate: t.field({ type: 'Date', required: false }),
      endDate: t.field({ type: 'Date', required: false }),
      responsibleId: t.string(),
      programId: t.string(),
    }),
  })

builder.objectField(ProjectMutations, 'create', (t) =>
  t.field({
    type: Project,
    authScopes: { authenticated: true },
    args: {
      data: t.arg({ type: CreateProjectDataInput, required: true }),
    },
    resolve: async (_, { data }, { db, user }) => {
      const project = await new ProjectModel(db).create({
        ...data,
        createdBy: user.uid,
        responsibleUid: data.responsibleId,
        programUid: data.programId,
      })
      const responsible = await new UserModel(db).findUniqueOrThrow(
        project.responsibleUid,
      )
      const person = await new PersonModel(db).findUniqueOrThrow(
        responsible.personUid,
      )
      return {
        ...project,
        id: project.uid,
        responsibleId: project.responsibleUid,
        responsible: { ...responsible, ...person, id: responsible.uid },
        programId: project.programUid,
        goals: [],
        projects: [],
      }
    },
  }),
)
