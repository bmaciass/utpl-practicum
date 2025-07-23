import { ProjectModel } from '~/models/Project'
import builder from '../../../builder'
import { ProjectQueries } from './root'
import { Project, type TProject } from '../../objects/Project'
import { pick } from 'lodash-es'

builder.objectField(ProjectQueries, 'one', (t) =>
  t.field({
    type: Project,
    nullable: true,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, { db }) => {
      const project = await new ProjectModel(db).findUnique(id, [
        'active',
        'name',
        'uid',
        'startDate',
        'endDate',
        'description',
      ])
      if (!project) return null

      return {
        ...pick(project, [
          'active',
          'name',
          'startDate',
          'endDate',
          'description',
        ]),
        id: project.uid,
        goals: project.goals.map((goal) => ({
          ...pick(goal, ['active', 'name', 'startDate', 'endDate', 'status']),
          id: goal.uid,
        })),
      } satisfies TProject
    },
  }),
)
