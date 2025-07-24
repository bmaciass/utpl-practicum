import { pick } from 'lodash-es'
import { ProjectGoalModel } from '~/models/ProjectGoal'
import builder from '../../../builder'
import { ProjectGoal, type TProjectGoal } from '../../objects/ProjectGoal'
import { ProjectGoalQueries } from './root'

export type TProjectGoalsQueryResponse = {
  records: TProjectGoal[]
}

export const ProjectGoalsQueryResponse = builder
  .objectRef<TProjectGoalsQueryResponse>('ProjectGoalsQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [ProjectGoal] }),
    }),
  })

builder.objectField(ProjectGoalQueries, 'list', (t) =>
  t.field({
    type: ProjectGoalsQueryResponse,
    authScopes: { authenticated: true },
    args: {
      active: t.arg.boolean({ required: false }),
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_, { projectId, active }, { db }) => {
      const projectGoals = await new ProjectGoalModel(db).findMany({
        where: { projectUid: projectId, active: active ?? undefined },
        fields: [
          'active',
          'name',
          'uid',
          'startDate',
          'endDate',
          'status',
          'projectUid',
        ],
      })
      return {
        records: projectGoals.map((goal) => ({
          ...pick(goal, ['name', 'active', 'status', 'startDate', 'endDate']),
          id: goal.uid,
          projectId,
        })),
      }
    },
  }),
)
