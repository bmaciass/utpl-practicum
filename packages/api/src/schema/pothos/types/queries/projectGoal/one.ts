import { pick } from 'lodash-es'
import { ProjectGoalModel } from '~/models/ProjectGoal'
import builder from '../../../builder'
import { ProjectGoal, type TProjectGoal } from '../../objects/ProjectGoal'
import { ProjectGoalQueries } from './root'

builder.objectField(ProjectGoalQueries, 'one', (t) =>
  t.field({
    type: ProjectGoal,
    nullable: true,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, { db }) => {
      const projectGoal = await new ProjectGoalModel(db).findUnique(id, [
        'active',
        'name',
        'uid',
        'startDate',
        'endDate',
        'projectUid',
        'status',
      ])
      if (!projectGoal) return null

      return {
        ...pick(projectGoal, [
          'active',
          'name',
          'startDate',
          'endDate',
          'status',
        ]),
        id: projectGoal.uid,
        projectId: projectGoal.projectUid,
      } satisfies TProjectGoal
    },
  }),
)
