import { UserModel } from '~/models/User'
import builder from '../../../builder'
import { UserMutations } from './root'
import type { UserPayload, PersonPayload } from '@sigep/db'
import type { SetOptional } from 'type-fest'
import { User } from '../../objects/User'
import { PersonModel } from '~/models/Person'
import { pick } from 'lodash-es'

type TUpdateUserWhereInput = {
  id: string
}

type UserWithPerson = Pick<UserPayload, 'name' | 'password' | 'active'> &
  Pick<PersonPayload, 'dni' | 'firstName' | 'lastName'>

export const UpdateUserWhereInput = builder
  .inputRef<TUpdateUserWhereInput>('UpdateUserWhereInput')
  .implement({
    fields: (t) => ({
      id: t.string({ required: true }),
    }),
  })

type TUpdateUserDataInput = Pick<
  SetOptional<
    UserWithPerson,
    'firstName' | 'lastName' | 'dni' | 'name' | 'password' | 'active'
  >,
  'firstName' | 'lastName' | 'dni' | 'name' | 'password' | 'active'
>

export const UpdateUserDataInput = builder
  .inputRef<TUpdateUserDataInput>('UpdateUserDataInput')
  .implement({
    fields: (t) => ({
      name: t.string({ required: false }),
      password: t.string({ required: false }),
      active: t.boolean({ required: false }),
      firstName: t.string({ required: false }),
      lastName: t.string({ required: false }),
      dni: t.string({ required: false }),
    }),
  })

builder.objectField(UserMutations, 'update', (t) =>
  t.field({
    type: User,
    authScopes: { authenticated: true },
    args: {
      where: t.arg({ type: UpdateUserWhereInput, required: true }),
      data: t.arg({ type: UpdateUserDataInput, required: true }),
    },
    resolve: async (_, { data, where }, { db, user: _user }) => {
      const { person, user } = await db.transaction(async (tx) => {
        const userModel = new UserModel(tx)
        const personModel = new PersonModel(tx)

        const user = await userModel.update(where.id, {
          name: data.name ?? undefined,
          password: data.password ?? undefined,
          active: data.active ?? undefined,
          // updatedBy: _user.uid, // FIXME
        })
        const person = await personModel.update(user.personUid, {
          firstName: data.firstName ?? undefined,
          lastName: data.lastName ?? undefined,
          dni: data.dni ?? undefined,
          active: data.active ?? undefined,
        })

        return { person, user }
      })
      return { ...person, ...user, id: user.uid }
    },
  }),
)
