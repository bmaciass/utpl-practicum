async function fetchFromCloudflareWorkerPlatform() {
  let privateJWK: string | undefined = undefined
  let publicJWK: string | undefined = undefined
  try {
    const { env } = await import('cloudflare:workers')
    privateJWK = env.PRIVATE_JWK
    publicJWK = env.PUBLIC_JWK

    return {
      privateJWK,
      publicJWK,
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

function fetchFromProcess() {
  let privateJWK: string | undefined = undefined
  let publicJWK: string | undefined = undefined
  try {
    const { env } = process
    privateJWK = env.PRIVATE_JWK
    publicJWK = env.PUBLIC_JWK

    return {
      privateJWK,
      publicJWK,
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export async function getJWKS() {
  const env = (await fetchFromCloudflareWorkerPlatform()) ?? fetchFromProcess()

  if (!env?.privateJWK) throw new Error('private jwk env not set')
  if (!env?.publicJWK) throw new Error('public jwk env not set')

  return env
}
