import { env } from 'cloudflare:workers'

export function getJWKS() {
  if (!env.PRIVATE_JWK) throw new Error('private jwk env not set')
  if (!env.PUBLIC_JWK) throw new Error('public jwk env not set')

  return {
    privateJWK: env.PRIVATE_JWK,
    publicJWK: env.PUBLIC_JWK,
  }
}
