import { pick } from 'lodash-es'
import { ProjectModel } from '~/models/Project'
import builder from '../../../builder'
import { Project, type TProject } from '../../objects/Project'
import { ProjectQueries } from './root'

export type TProjectsQueryResponse = {
  records: TProject[]
}

export const ProjectsQueryResponse = builder
  .objectRef<TProjectsQueryResponse>('ProjectsQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [Project] }),
    }),
  })

builder.objectField(ProjectQueries, 'list', (t) =>
  t.field({
    type: ProjectsQueryResponse,
    authScopes: { authenticated: true },
    args: {
      active: t.arg.boolean({ required: false }),
      programId: t.arg.string({ required: true }),
    },
    resolve: async (_, { programId, active }, { db }) => {
      const projects = await new ProjectModel(db).findMany({
        where: { programUid: programId, active: active ?? undefined },
        fields: [
          'active',
          'name',
          'uid',
          'startDate',
          'endDate',
          'description',
          'status',
        ],
      })
      return {
        records: projects.map((project) => ({
          ...pick(project, [
            'active',
            'description',
            'name',
            'startDate',
            'endDate',
            'status',
          ]),
          id: project.uid,
          goals: project.goals.map((goal) => ({
            ...pick(goal, ['name', 'active', 'status', 'startDate', 'endDate']),
            id: goal.uid,
          })),
        })),
      }
    },
  }),
)
