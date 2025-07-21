import { UserModel } from '~/models/User'
import builder from '../../../builder'
import { User } from '../../objects/User'
import { UserMutations } from './root'
import type { PersonPayload, UserPayload } from '@sigep/db'
import { PersonModel } from '~/models/Person'
import { pick } from 'lodash-es'

type TCreateUserDataInput = Pick<UserPayload, 'name' | 'password'> &
  Pick<PersonPayload, 'dni' | 'firstName' | 'lastName'>

export const CreateUserDataInput = builder
  .inputRef<TCreateUserDataInput>('CreateUserDataInput')
  .implement({
    fields: (t) => ({
      name: t.string(),
      dni: t.string(),
      firstName: t.string(),
      lastName: t.string(),
      password: t.string(),
    }),
  })

builder.objectField(UserMutations, 'create', (t) =>
  t.field({
    type: User,
    authScopes: { authenticated: true },
    args: {
      data: t.arg({ type: CreateUserDataInput, required: true }),
    },
    resolve: async (_, { data }, { db, user: _user }) => {
      const { person, user } = await db.transaction(async (tx) => {
        const userModel = new UserModel(tx)
        const personModel = new PersonModel(tx)
        const person = await personModel.create(
          pick(data, ['firstName', 'lastName', 'dni']),
        )
        const user = await userModel.create({
          ...pick(data, ['name', 'password']),
          personUid: person.uid,
          // createdBy: _user.uid, // FIXME
        })
        return { person, user }
      })
      return { ...person, ...user, id: user.uid }
    },
  }),
)
