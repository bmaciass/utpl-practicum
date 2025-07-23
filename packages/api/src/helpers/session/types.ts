import type { JWTPayload } from 'jose'

export type AccessTokenPayload = {
  roles: string[]
  permissions: string[]
}

export type RefreshTokenPayload = {}

export type JWTAccessTokenPayload = JWTPayload & AccessTokenPayload

export type JWTRefreshTokenPayload = JWTPayload & RefreshTokenPayload
