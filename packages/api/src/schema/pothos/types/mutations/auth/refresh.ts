import builder from '~/schema/pothos/builder'
import { AuthMutations } from './root'
import { StaffSession } from '~/services/Staff.session'

export type TAuthRefreshInput = {
  refreshToken: string
}

export type TAuthRefreshResponse = {
  accessToken: string
  refreshToken: string
}

export const AuthRefreshInput = builder
  .inputRef<TAuthRefreshInput>('AuthRefreshInput')
  .implement({
    fields: (t) => ({
      refreshToken: t.string({ required: true }),
    }),
  })

export const AuthRefreshResponse = builder
  .objectRef<TAuthRefreshResponse>('AuthRefreshResponse')
  .implement({
    fields: (t) => ({
      accessToken: t.exposeString('accessToken'),
      refreshToken: t.exposeString('refreshToken'),
    }),
  })

builder.objectField(AuthMutations, 'refresh', (t) =>
  t.field({
    type: AuthRefreshResponse,
    args: { data: t.arg({ type: AuthRefreshInput, required: true }) },
    authScopes: { public: true },
    resolve: async (_, { data }, { db }) => {
      const { refreshToken } = data
      const session = new StaffSession(db)
      const accessToken = await session.refresh({ refreshToken })

      return { accessToken, refreshToken }
    },
  }),
)
