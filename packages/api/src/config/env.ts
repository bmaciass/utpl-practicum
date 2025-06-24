export function getJWKS() {
  if (!process.env.PRIVATE_JWK) throw new Error('private jwk env not set')
  if (!process.env.PUBLIC_JWK) throw new Error('public jwk env not set')

  return {
    privateJWK: process.env.PRIVATE_JWK,
    publicJWK: process.env.PUBLIC_JWK,
  }
}

export function getDatabaseURL() {
  if (!process.env.DATABASE_URL) throw new Error('no database url set')

  return process.env.DATABASE_URL
}
