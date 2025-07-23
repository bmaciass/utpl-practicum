import { pick } from 'lodash-es'
import { ProgramModel } from '~/models/Program'
import builder from '../../../builder'
import { StringFilter } from '../../inputs/FilterInputs'
import { Program, type TProgram } from '../../objects/Program'
import { ProgramQueries } from './root'

export type TProgramsQueryResponse = {
  records: TProgram[]
}

export const ProgramsQueryResponse = builder
  .objectRef<TProgramsQueryResponse>('ProgramsQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [Program] }),
    }),
  })

builder.objectField(ProgramQueries, 'list', (t) =>
  t.field({
    type: ProgramsQueryResponse,
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
          'responsibleUid',
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
          responsibleId: program.responsibleUid,
          responsible: {
            ...program.responsible,
            ...program.responsible.person,
            id: program.responsible.uid,
          },
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
