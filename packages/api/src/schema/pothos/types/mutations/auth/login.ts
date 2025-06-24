import builder from '~/schema/pothos/builder'
import { AuthMutations } from './root'
import { StaffSession } from '~/services/Staff.session'

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
      accessToken: t.exposeString('accessToken'),
      refreshToken: t.exposeString('refreshToken'),
    }),
  })

builder.objectField(AuthMutations, 'login', (t) =>
  t.field({
    type: AuthLoginResponse,
    args: { data: t.arg({ type: AuthLoginInput, required: true }) },
    authScopes: { public: true },
    resolve: async (_, { data }, { db }) => {
      const { password, username } = data
      const session = new StaffSession(db)
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
