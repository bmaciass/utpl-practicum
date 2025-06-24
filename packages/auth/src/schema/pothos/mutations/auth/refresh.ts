import builder from '~/schema/pothos/builder'
import { AuthMutations } from './root'
import { UserSession } from '~/helpers/session/User.session'
import { SessionManager } from '~/helpers/session/SessionManager'

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
    resolve: async (_, { data }) => {
      const { refreshToken } = data
      const sessionManager = new SessionManager()
      const { accessToken } = await sessionManager.refresh(refreshToken)

      return { accessToken, refreshToken }
    },
  }),
)
