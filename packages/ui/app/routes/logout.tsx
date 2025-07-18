import { type LoaderFunction, redirect } from "@remix-run/cloudflare"
import { getAccessTokenCookie } from "~/cookies/access-token.server"

export default function Index () {
  return 'Redirecting...'
}

export const loader: LoaderFunction = async () => {
  const accessTokenCookie = getAccessTokenCookie(process.env.UI_AUTH_COOKIE_SECRET)

  const clearCookie = await accessTokenCookie.serialize("", {
    maxAge: 0,
    path: "/"
  })

  return redirect('/', {
    headers: {
      'Set-Cookie': clearCookie
    }
  })
}