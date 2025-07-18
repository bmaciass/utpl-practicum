import { createCookie } from '@remix-run/cloudflare'

export const getAccessTokenCookie = (secret: string) =>
  createCookie('access-token-cookie', {
    httpOnly: true,
    sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    path: '/',
    secure: process.env.ENVIRONMENT === 'production',
    maxAge: 600, // ten minutes
    secrets: [secret],
  })
