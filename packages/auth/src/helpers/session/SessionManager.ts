import type { UserRecord } from '@sigep/db'
import { getJWKS } from '../../config/env'
import { JWTSigner } from './JWTSigner'
import type { JWTAccessTokenPayload, JWTRefreshTokenPayload } from './types'

export class SessionManager {
  protected signer!: JWTSigner

  protected async _initSigner() {
    if (this.signer) return
    const { privateJWK, publicJWK } = await getJWKS()

    console.log(privateJWK)

    this.signer = new JWTSigner({ privateJWK, publicJWK })
  }

  async create(data: { user: Pick<UserRecord, 'uid'> }) {
    await this._initSigner()
    const { user } = data
    const now = Date.now()
    const refreshToken = await this.signer.create({
      tokenType: 'refresh',
      payload: {
        iat: now,
        sub: user.uid,
      },
    })
    const accessToken = await this.signer.create({
      tokenType: 'access',
      payload: {
        iat: now,
        sub: user.uid,
        permissions: [],
        roles: [],
      },
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async verifyAccessToken(accessToken: string) {
    await this._initSigner()
    try {
      return await this.signer.verify<JWTAccessTokenPayload>(accessToken)
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async refresh(refreshToken: string) {
    await this._initSigner()
    const jwt = await this.signer.verify<JWTRefreshTokenPayload>(refreshToken)
    const payload = {
      sub: jwt.payload.sub,
      organizationUids: jwt.payload.organizationUids,
      permissions: [],
      roles: [],
    }
    const accessToken = await this.signer.create({
      tokenType: 'access',
      payload,
    })
    return { accessToken, payload }
  }
}
