import type { ProjectGoalPayload } from '@sigep/db'
import type { SetOptional } from 'type-fest'
import { ProjectGoalModel } from '~/models/ProjectGoal'
import builder from '../../../builder'
import { ProjectGoalStatusEnum } from '../../enums/ProjectGoalStatus'
import { ProjectGoal } from '../../objects/ProjectGoal'
import { ProjectGoalMutations } from './root'

type TUpdateProjectGoalWhereInput = {
  id: string
}

export const UpdateProjectGoalWhereInput = builder
  .inputRef<TUpdateProjectGoalWhereInput>('UpdateProjectGoalWhereInput')
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  })

type TUpdateProjectGoalDataInput = Pick<
  SetOptional<
    ProjectGoalPayload,
    'name' | 'startDate' | 'endDate' | 'status' | 'active'
  >,
  'name' | 'startDate' | 'endDate' | 'status' | 'active'
>

export const UpdateProjectGoalDataInput = builder
  .inputRef<TUpdateProjectGoalDataInput>('UpdateProjectGoalDataInput')
  .implement({
    fields: (t) => ({
      name: t.string({ required: false }),
      active: t.boolean({ required: false }),
      // responsibleId: t.string({ required: false }),
      status: t.field({ type: ProjectGoalStatusEnum, required: false }),
      startDate: t.field({ type: 'Date', required: false }),
      endDate: t.field({ type: 'Date', required: false }),
    }),
  })

builder.objectField(ProjectGoalMutations, 'update', (t) =>
  t.field({
    type: ProjectGoal,
    authScopes: { authenticated: true },
    args: {
      where: t.arg({ type: UpdateProjectGoalWhereInput, required: true }),
      data: t.arg({ type: UpdateProjectGoalDataInput, required: true }),
    },
    resolve: async (_, { data, where }, { db, user }) => {
      const projectGoal = await new ProjectGoalModel(db).update(where.id, {
        updatedBy: user.uid,
        active: data.active ?? undefined,
        name: data.name ?? undefined,
        startDate: data.startDate ?? undefined,
        endDate: data.endDate ?? undefined,
        status: data.status ?? undefined,
      })

      return {
        ...projectGoal,
        id: projectGoal.uid,
        projectId: projectGoal.projectUid,
      }
    },
  }),
)
