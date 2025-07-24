import type { ProjectGoalRecord } from '@sigep/db'
import { ProjectGoalModel } from '~/models/ProjectGoal'
import builder from '../../../builder'
import { ProjectGoalStatusEnum } from '../../enums/ProjectGoalStatus'
import { ProjectGoal } from '../../objects/ProjectGoal'
import { ProjectGoalMutations } from './root'

type TCreateProjectGoalDataInput = Pick<
  ProjectGoalRecord,
  'name' | 'startDate' | 'endDate' | 'status'
> & {
  projectId: string
}

export const CreateProjectGoalDataInput = builder
  .inputRef<TCreateProjectGoalDataInput>('CreateProjectGoalDataInput')
  .implement({
    fields: (t) => ({
      name: t.string(),
      status: t.field({ type: ProjectGoalStatusEnum }),
      startDate: t.field({ type: 'Date', required: false }),
      endDate: t.field({ type: 'Date', required: false }),
      projectId: t.string(),
    }),
  })

builder.objectField(ProjectGoalMutations, 'create', (t) =>
  t.field({
    type: ProjectGoal,
    authScopes: { authenticated: true },
    args: {
      data: t.arg({ type: CreateProjectGoalDataInput, required: true }),
    },
    resolve: async (_, { data }, { db, user }) => {
      const projectGoal = await new ProjectGoalModel(db).create({
        ...data,
        createdBy: user.uid,
        projectUid: data.projectId,
      })

      return {
        ...projectGoal,
        id: projectGoal.uid,
        projectId: projectGoal.projectUid,
      }
    },
  }),
)
