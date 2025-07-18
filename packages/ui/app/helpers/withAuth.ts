// app/utils/withAuth.ts
import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/cloudflare'
import { getAccessTokenCookie } from '~/cookies/access-token.server'

type ProtectedLoader<LR = unknown> = (
  args: LoaderFunctionArgs,
) => LR | Promise<LR>

export function withAuth<LR>(
  loaderFunction?: ProtectedLoader<LR>,
): LoaderFunction {
  return async (args) => {
    const { context, request } = args
    const cookieString = request.headers.get('Cookie')
    if (!cookieString) {
      return redirect('/login')
    }

    const accessCookie = getAccessTokenCookie(
      context.cloudflare.env.UI_AUTH_COOKIE_SECRET,
    )

    const cookies = cookieString.split(';')
    const cookie = cookies.find(
      (cookie) => cookie.trim().split('=')[0] === accessCookie.name,
    )
    if (!cookie) {
      return redirect('/login')
    }

    // TODO: Validate jwt
    const token = await accessCookie.parse(cookie)

    if (loaderFunction) {
      const result = await loaderFunction({ ...args })
      // allow you to return data or a Response
      return result as unknown as Response
    }
    return null
  }
}
