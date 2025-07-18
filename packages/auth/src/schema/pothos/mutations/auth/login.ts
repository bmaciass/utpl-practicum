import builder from '~/schema/pothos/builder'
import { AuthMutations } from './root'
import { UserSession } from '~/helpers/session/User.session'

export type TAuthLoginInput = {
  username: string
  password: string
}

export type TAuthLoginResponse = {
  accessToken: string
  refreshToken: string
}

export const AuthLoginInput = builder
  .inputRef<TAuthLoginInput>('AuthLoginInput')
  .implement({
    fields: (t) => ({
      username: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  })

export const AuthLoginResponse = builder
  .objectRef<TAuthLoginResponse>('AuthLoginResponse')
  .implement({
    fields: (t) => ({
      accessToken: t.exposeString('accessToken', { nullable: false }),
      refreshToken: t.exposeString('refreshToken', { nullable: false }),
    }),
  })

builder.objectField(AuthMutations, 'login', (t) =>
  t.field({
    type: AuthLoginResponse,
    args: { data: t.arg({ type: AuthLoginInput, required: true }) },
    resolve: async (_, { data }, { db }) => {
      const { password, username } = data
      const session = new UserSession(db)
      const result = await session.login({
        type: 'password',
        username,
        password,
      })
      if (!result.valid) throw new Error('Invalid username or password')

      const { accessToken, refreshToken } = result
      return { accessToken, refreshToken }
    },
  }),
)
