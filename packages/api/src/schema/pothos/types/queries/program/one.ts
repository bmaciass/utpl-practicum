import { pick } from 'lodash-es'
import { ProgramModel } from '~/models/Program'
import builder from '../../../builder'
import { Program } from '../../objects/Program'
import { ProgramQueries } from './root'

builder.objectField(ProgramQueries, 'one', (t) =>
  t.field({
    type: Program,
    nullable: true,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, { id }, { db }) => {
      const program = await new ProgramModel(db).findUnique(id, [
        'active',
        'name',
        'uid',
        'startDate',
        'endDate',
        'description',
        'responsibleUid',
      ])
      if (!program) return null

      return {
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
            ...pick(goal, ['name', 'active', 'status', 'startDate', 'endDate']),
            id: goal.uid,
          })),
        })),
      }
    },
  }),
)
