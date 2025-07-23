import type { ProgramPayload } from '@sigep/db'
import type { SetOptional } from 'type-fest'
import { PersonModel } from '~/models/Person'
import { ProgramModel } from '~/models/Program'
import { ProjectModel } from '~/models/Project'
import { UserModel } from '~/models/User'
import builder from '../../../builder'
import { Program } from '../../objects/Program'
import { ProgramMutations } from './root'

type TUpdateProgramWhereInput = {
  id: string
}

export const UpdateProgramWhereInput = builder
  .inputRef<TUpdateProgramWhereInput>('UpdateProgramWhereInput')
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  })

type TUpdateProgramDataInput = Pick<
  SetOptional<
    ProgramPayload,
    'name' | 'description' | 'startDate' | 'endDate' | 'active'
  >,
  'name' | 'description' | 'startDate' | 'endDate' | 'active'
> & {
  responsibleId?: string
}

export const UpdateProgramDataInput = builder
  .inputRef<TUpdateProgramDataInput>('UpdateProgramDataInput')
  .implement({
    fields: (t) => ({
      name: t.string({ required: false }),
      active: t.boolean({ required: false }),
      description: t.string({ required: false }),
      responsibleId: t.string({ required: false }),
      startDate: t.field({ type: 'Date', required: false }),
      endDate: t.field({ type: 'Date', required: false }),
    }),
  })

builder.objectField(ProgramMutations, 'update', (t) =>
  t.field({
    type: Program,
    authScopes: { authenticated: true },
    args: {
      where: t.arg({ type: UpdateProgramWhereInput, required: true }),
      data: t.arg({ type: UpdateProgramDataInput, required: true }),
    },
    resolve: async (_, { data, where }, { db, user }) => {
      const program = await new ProgramModel(db).update(where.id, {
        updatedBy: user.uid,
        active: data.active ?? undefined,
        name: data.name ?? undefined,
        description: data.description ?? undefined,
        responsibleUid: data.responsibleId ?? undefined,
        startDate: data.startDate ?? undefined,
        endDate: data.endDate ?? undefined,
      })
      const responsible = await new UserModel(db).findUniqueOrThrow(
        program.responsibleUid,
      )
      const person = await new PersonModel(db).findUniqueOrThrow(
        responsible.personUid,
      )
      return {
        ...program,
        id: program.uid,
        responsibleId: program.responsibleUid,
        responsible: { ...responsible, ...person, id: responsible.uid },
        projects: (
          await new ProjectModel(db).findMany({
            where: { programUid: program.uid },
          })
        ).map((project) => ({
          ...project,
          id: project.uid,
          goals: project.goals.map((goal) => ({ ...goal, id: goal.uid })),
        })),
      }
    },
  }),
)
