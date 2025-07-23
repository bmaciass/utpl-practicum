import { pick } from 'lodash-es'
import { ProjectModel } from '~/models/Project'
import builder from '../../../builder'
import { Project, type TProject } from '../../objects/Project'
import { ProjectQueries } from './root'

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
        'programUid',
        'responsibleUid',
        'status',
      ])
      if (!project) return null

      return {
        ...pick(project, [
          'active',
          'name',
          'startDate',
          'endDate',
          'description',
          'status',
        ]),
        id: project.uid,
        programId: project.programUid,
        responsibleId: project.responsibleUid,
        goals: project.goals.map((goal) => ({
          ...pick(goal, ['active', 'name', 'startDate', 'endDate', 'status']),
          id: goal.uid,
        })),
      } satisfies TProject
    },
  }),
)
