import type { JWTPayload } from 'jose'

export type AccessTokenPayload = {
  organizationUids: string[]
  roles: string[]
  permissions: string[]
}

export type RefreshTokenPayload = {
  organizationUids: string[]
}

export type JWTAccessTokenPayload = JWTPayload & AccessTokenPayload

export type JWTRefreshTokenPayload = JWTPayload & RefreshTokenPayload
