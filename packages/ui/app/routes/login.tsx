import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert"
import { type ActionFunctionArgs, data } from "@remix-run/cloudflare";
import { useActionData, useNavigate, useSubmit } from "@remix-run/react";
import { notFound } from "~/helpers/notFound";
import { getAccessTokenCookie } from "~/cookies/access-token.server";
import { SessionManager, UserPasswordManager } from '@sigep/api'
import { getDBConnection } from '@sigep/db'
import { isEmpty } from 'lodash-es'

export const action = async ({ context, request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') return notFound('Method not found')

  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  if (!username || !password) return { error: 'username or password not found' }
  if (isEmpty(username) || isEmpty(password)) return { error: 'username or password not found' }

  const { client, db } = await getDBConnection(context.cloudflare.env.DATABASE_URL)
  await client.connect()

  const userPasswordManager = new UserPasswordManager({ password: password.toString(), username: username.toString() }, db)
  const result = await userPasswordManager.verify()
  if (!result.valid) return { error: 'username or password incorrect' }

  const session = new SessionManager()
  const { accessToken, refreshToken } = await session.create({ user: { uid: result.uid } })

  const accessCookie = getAccessTokenCookie(context.cloudflare.env.UI_AUTH_COOKIE_SECRET)
  const serializedCookie = await accessCookie.serialize(accessToken)
  const headers = new Headers()
  headers.append('Set-Cookie', serializedCookie)

  return data({ error: null }, { headers })
}

function Login () {
  const navigate = useNavigate()
  const submit = useSubmit()
  const actionData = useActionData<typeof action>()
  const error = actionData?.error
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (actionData && !actionData.error) {
      navigate('/')
    }
  }, [actionData, navigate])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    if (!username || !password) return

    const formData = new FormData()
    formData.set('username', username)
    formData.set('password', password)
    submit(formData, { action: '/login', method: 'post' })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" required ref={usernameRef} defaultValue={'admin'} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required ref={passwordRef} defaultValue={'admin'} />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
      {error && <Alert variant={'destructive'}><AlertDescription>Credenciales incorrectas</AlertDescription></Alert>}
    </div>
  )
}

export default function Index () {
  return <Login />
}