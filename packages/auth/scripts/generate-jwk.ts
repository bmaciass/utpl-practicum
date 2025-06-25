import { webcrypto } from 'node:crypto'

async function main() {
  const { privateKey, publicKey } = await crypto.subtle.generateKey(
    'Ed25519',
    true,
    ['sign', 'verify'],
  )

  const privateJwk = await webcrypto.subtle.exportKey('jwk', privateKey)
  const publicJwk = await webcrypto.subtle.exportKey('jwk', publicKey)

  console.log('private jwk: ', JSON.stringify(privateJwk))
  console.log('public jwk: ', JSON.stringify(publicJwk))
}

main().finally(() => {
  process.exit(0)
})
