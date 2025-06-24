import type { AppContext } from '~/schema/pothos/context'
import { JWTSigner } from '~/helpers/session/JWTSigner'
import type { JWTAccessTokenPayload } from '~/helpers/session/types'
import { getJWKS } from '~/config/env'

export async function getTokenFromHeader(
  request: Request,
): Promise<AppContext['token'] | undefined> {
  const authStr = request.headers.get('authorization')

  if (!authStr) return undefined

  const { privateJWK, publicJWK } = getJWKS()

  const { payload } = await new JWTSigner({
    privateJWK,
    publicJWK,
  }).verify<JWTAccessTokenPayload>(authStr)

  return payload
}
