import { SignJWT, createLocalJWKSet, jwtVerify, type JWK } from 'jose'
import { webcrypto } from 'node:crypto'
import type {
  AccessTokenPayload,
  JWTAccessTokenPayload,
  JWTRefreshTokenPayload,
  RefreshTokenPayload,
} from './types'

export const ISSUER = 'auth.utpl-practicum.com'

export class JWTSigner {
  protected accessTokenExp = '10m'
  protected refreshTokenExp = '1w'
  protected privateJWKString: string
  protected publicJWKString: string
  protected privateJWK: CryptoKey | undefined
  protected publicJWK: CryptoKey | undefined

  constructor(data: { privateJWK: string; publicJWK: string }) {
    this.privateJWKString = data.privateJWK
    this.publicJWKString = data.publicJWK
  }

  protected generatePublicJwk() {
    return webcrypto.subtle.importKey(
      'jwk',
      JSON.parse(this.publicJWKString),
      'Ed25519',
      true,
      ['verify'],
    )
  }

  protected generatePrivateJwk() {
    return webcrypto.subtle.importKey(
      'jwk',
      JSON.parse(this.privateJWKString),
      'Ed25519',
      true,
      ['sign'],
    )
  }

  async create(
    data:
      | { tokenType: 'access'; payload: JWTAccessTokenPayload }
      | { tokenType: 'refresh'; payload: JWTRefreshTokenPayload },
  ) {
    const { payload, tokenType } = data
    if (!this.privateJWK) {
      this.privateJWK = await this.generatePrivateJwk()
    }
    let exp: string
    if (tokenType === 'access') {
      exp = this.accessTokenExp
    } else {
      exp = this.refreshTokenExp
    }
    return new SignJWT(payload)
      .setExpirationTime(exp)
      .setProtectedHeader({ alg: 'EdDSA' })
      .setIssuer(ISSUER)
      .sign(this.privateJWK)
  }

  async verify<JWTPayload = unknown>(jwt: string) {
    return jwtVerify<JWTPayload>(
      jwt,
      createLocalJWKSet({ keys: [JSON.parse(this.publicJWKString) as JWK] }),
      {
        issuer: ISSUER,
      },
    )
  }
}
