import type { ProjectPayload } from '@sigep/db'
import type { SetOptional } from 'type-fest'
import { PersonModel } from '~/models/Person'
import { ProjectModel } from '~/models/Project'
import { ProjectGoalModel } from '~/models/ProjectGoal'
import { UserModel } from '~/models/User'
import builder from '../../../builder'
import { ProjectStatusEnum } from '../../enums/ProjectStatus'
import { Project } from '../../objects/Project'
import { ProjectMutations } from './root'

type TUpdateProjectWhereInput = {
  id: string
}

export const UpdateProjectWhereInput = builder
  .inputRef<TUpdateProjectWhereInput>('UpdateProjectWhereInput')
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  })

type TUpdateProjectDataInput = Pick<
  SetOptional<
    ProjectPayload,
    'name' | 'description' | 'startDate' | 'endDate' | 'status' | 'active'
  >,
  'name' | 'description' | 'startDate' | 'endDate' | 'status' | 'active'
> & {
  responsibleId?: string
}

export const UpdateProjectDataInput = builder
  .inputRef<TUpdateProjectDataInput>('UpdateProjectDataInput')
  .implement({
    fields: (t) => ({
      name: t.string({ required: false }),
      active: t.boolean({ required: false }),
      description: t.string({ required: false }),
      responsibleId: t.string({ required: false }),
      status: t.field({ type: ProjectStatusEnum, required: false }),
      startDate: t.field({ type: 'Date', required: false }),
      endDate: t.field({ type: 'Date', required: false }),
    }),
  })

builder.objectField(ProjectMutations, 'update', (t) =>
  t.field({
    type: Project,
    authScopes: { authenticated: true },
    args: {
      where: t.arg({ type: UpdateProjectWhereInput, required: true }),
      data: t.arg({ type: UpdateProjectDataInput, required: true }),
    },
    resolve: async (_, { data, where }, { db, user }) => {
      const project = await new ProjectModel(db).update(where.id, {
        updatedBy: user.uid,
        active: data.active ?? undefined,
        name: data.name ?? undefined,
        description: data.description ?? undefined,
        responsibleUid: data.responsibleId ?? undefined,
        startDate: data.startDate ?? undefined,
        endDate: data.endDate ?? undefined,
        status: data.status ?? undefined,
      })
      const [responsible, goals] = await Promise.all([
        new UserModel(db).findUniqueOrThrow(project.responsibleUid),
        new ProjectGoalModel(db).findMany({
          where: { projectUid: project.uid },
        }),
      ])
      const person = await new PersonModel(db).findUniqueOrThrow(
        responsible.personUid,
      )

      return {
        ...project,
        id: project.uid,
        responsibleId: project.responsibleUid,
        programId: project.programUid,
        responsible: { ...responsible, ...person, id: responsible.uid },
        goals: goals.map((goal) => ({
          ...goal,
          projectId: project.uid,
          id: goal.uid,
        })),
      }
    },
  }),
)
