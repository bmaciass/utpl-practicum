import type { ProgramPayload } from '@sigep/db'
import { PersonModel } from '~/models/Person'
import { ProgramModel } from '~/models/Program'
import { UserModel } from '~/models/User'
import builder from '../../../builder'
import { Program } from '../../objects/Program'
import { ProgramMutations } from './root'

type TCreateProgramDataInput = Pick<
  ProgramPayload,
  'name' | 'description' | 'startDate' | 'endDate'
> & {
  responsibleId: string
}

export const CreateProgramDataInput = builder
  .inputRef<TCreateProgramDataInput>('CreateProgramDataInput')
  .implement({
    fields: (t) => ({
      name: t.string(),
      description: t.string(),
      startDate: t.field({ type: 'Date', required: false }),
      endDate: t.field({ type: 'Date', required: false }),
      responsibleId: t.string(),
    }),
  })

builder.objectField(ProgramMutations, 'create', (t) =>
  t.field({
    type: Program,
    authScopes: { authenticated: true },
    args: {
      data: t.arg({ type: CreateProgramDataInput, required: true }),
    },
    resolve: async (_, { data }, { db, user }) => {
      const program = await new ProgramModel(db).create({
        ...data,
        createdBy: user.uid,
        responsibleUid: data.responsibleId,
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
        projects: [],
      }
    },
  }),
)
