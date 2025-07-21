import builder from '../../../builder'
import { type TUser, User } from '../../objects/User'
import { StringFilter } from '../../inputs/FilterInputs'
import { UserQueries } from './root'
import { UserPersonService } from '~/services/UserPerson.service'
import { pick } from 'lodash-es'

export type TUsersQueryResponse = {
  records: TUser[]
}

export const UsersQueryResponse = builder
  .objectRef<TUsersQueryResponse>('UsersQueryResponse')
  .implement({
    fields: (t) => ({
      records: t.expose('records', { type: [User] }),
    }),
  })

builder.objectField(UserQueries, 'list', (t) =>
  t.field({
    type: UsersQueryResponse,
    authScopes: { authenticated: true },
    args: {
      active: t.arg.boolean({ required: false }),
      name: t.arg({ type: StringFilter, required: false }),
    },
    resolve: async (_, __, { db }) => {
      // FIXME: findMany return a type of ALL
      const users = await new UserPersonService(db).findMany({
        fields: {
          user: ['name', 'active', 'uid'],
          person: ['firstName', 'lastName', 'dni'],
        },
      })
      return {
        records: users.map((user) => ({
          id: user.uid,
          ...pick(user, ['name', 'active']),
          ...pick(user.person, ['firstName', 'lastName', 'dni']),
        })),
      }
    },
  }),
)
