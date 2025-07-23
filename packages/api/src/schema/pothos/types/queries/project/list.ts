import { InstitutionModel } from '~/models/Institution'
import builder from '../../../builder'
import { StringFilter } from '../../inputs/FilterInputs'
import { ProjectQueries } from './root'
import { Program, type TProgram } from '../../objects/Program'
import { ProgramModel } from '~/models/Program'
import { pick } from 'lodash-es'

export type TProjectsQueryResponse = {
  records: TProgram[]
}

export const ProjectsQueryResponse = builder
  .objectRef<TProjectsQueryResponse>('ProjectsQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [Program] }),
    }),
  })

builder.objectField(ProjectQueries, 'list', (t) =>
  t.field({
    type: ProjectsQueryResponse,
    authScopes: { authenticated: true },
    args: {
      active: t.arg.boolean({ required: false }),
      name: t.arg({ type: StringFilter, required: false }),
    },
    resolve: async (_, __, { db }) => {
      const programs = await new ProgramModel(db).findMany({
        fields: [
          'active',
          'name',
          'uid',
          'startDate',
          'endDate',
          'description',
        ],
      })
      return {
        records: programs.map((program) => ({
          ...pick(program, [
            'active',
            'name',
            'startDate',
            'endDate',
            'description',
          ]),
          id: program.uid,
          projects: program.projects.map((project) => ({
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
              ...pick(goal, [
                'name',
                'active',
                'status',
                'startDate',
                'endDate',
              ]),
              id: goal.uid,
            })),
          })),
        })),
      }
    },
  }),
)
