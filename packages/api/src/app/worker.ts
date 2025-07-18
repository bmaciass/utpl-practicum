import { getDBConnection } from '@sigep/db'
import { createYoga } from 'graphql-yoga'
import { useResponse } from '~/plugins/onResponse'
import schema from '~/schema/pothos'
import type { AppContext } from '~/schema/pothos/context'
import { SessionManager } from '@sigep/auth'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import { createCookie } from '@remix-run/cloudflare'
import { env } from 'cloudflare:workers'

export const getAccessTokenCookie = (secret: string) =>
  createCookie('access-token-cookie', {
    httpOnly: true,
    sameSite: env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    path: '/',
    secure: env.ENVIRONMENT === 'production',
    maxAge: 600, // ten minutes
    secrets: [secret],
  })

async function createContext(request: Request, env: Env): Promise<AppContext> {
  const cookie = await request.cookieStore?.get('access-token-cookie')
  if (!cookie) throw new Error('jwt not found')

  const accessCookie = getAccessTokenCookie('cookie-secret')
  const token = await accessCookie.parse(`access-token-cookie=${cookie.value}`)
  if (!token) throw new Error('invalid token')

  const sessionManager = new SessionManager()
  const payloadResult = await sessionManager.verifyAccessToken(token)
  if (!payloadResult) throw new Error('invalid token')

  const { db, client } = await getDBConnection(env.DATABASE_URL)
  await client.connect()

  const { payload } = payloadResult
  if (!payload.sub) throw new Error('subject is not identified')

  return {
    db,
    client,
    token: {
      permissions: [],
      roles: [],
    },
    user: {
      uid: payload.sub,
    },
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const yoga = createYoga({
      schema,
      context: () => {
        return createContext(request, env)
      },
      plugins: [
        useCookies(),
        // useJWT({
        //   extendContext: true,
        //   signingKeyProviders: [
        //     createInlineSigningKeyProvider(env.PRIVATE_JWK),
        //   ],
        //   tokenLookupLocations: [
        //     extractFromCookie({ name: 'access-token-cookie' }),
        //   ],
        //   tokenVerification: {
        //     issuer: 'auth.utpl-practicum.com',
        //     ignoreExpiration: false,
        //   },
        // }),
        useResponse, // this plugin will close the connection at the end
      ],
    })
    return yoga(request)
  },
}
