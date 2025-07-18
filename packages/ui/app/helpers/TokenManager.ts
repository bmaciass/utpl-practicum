export class TokenManager {
  save(data: { accessToken?: string; refreshToken?: string }) {
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken)
    }
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken)
    }
  }

  getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }
}
