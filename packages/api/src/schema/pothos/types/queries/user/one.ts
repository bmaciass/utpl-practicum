import builder from '../../../builder'
import { User } from '../../objects/User'
import { UserQueries } from './root'
import { UserPersonService } from '~/services/UserPerson.service'
import { pick } from 'lodash-es'

builder.objectField(UserQueries, 'one', (t) =>
  t.field({
    type: User,
    nullable: true,
    authScopes: { authenticated: true },
    args: {
      id: t.arg.string(),
    },
    resolve: async (_, { id }, { db }) => {
      const user = await new UserPersonService(db).findUnique(id, {
        user: ['name', 'active', 'uid'],
        person: ['firstName', 'lastName', 'dni'],
      })
      if (!user) return null
      return {
        id: user.uid,
        ...pick(user, ['name', 'active']),
        ...pick(user.person, ['firstName', 'lastName', 'dni']),
      }
    },
  }),
)
