import { type Db, User } from '@sigep/db'
import { eq } from 'drizzle-orm'
import { isEmpty } from 'lodash-es'
import { SessionManager } from './SessionManager'
import { UserPasswordManager } from './UserPasswordManager'

type LoginMethod = 'password'

type LoginResult =
  | { valid: true; accessToken: string; refreshToken: string }
  | { valid: false; reason: string }

export class UserSession {
  protected db: Db
  protected sessionManager: SessionManager
  constructor(db: Db) {
    this.db = db
    this.sessionManager = new SessionManager()
  }

  async getByUsername(username: string) {
    const result = await this.db
      .select()
      .from(User)
      .where(eq(User.name, username))
      .limit(1)
    if (isEmpty(result)) return undefined
    return result[0]
  }

  async getRolesAndPermissions() {
    return {
      roles: [],
      permissions: [],
    }
  }

  protected async verifyUserAndPassword(username: string, password: string) {
    const validator = new UserPasswordManager(
      {
        password,
        username: username,
      },
      this.db,
    )
    return validator.verify()
  }

  async login(data: {
    type: LoginMethod
    username: string
    password: string
  }): Promise<LoginResult> {
    const { username, password } = data
    const User = await this.getByUsername(username)
    if (!User) return { valid: false, reason: 'username not found' }
    const isPasswordValid = await this.verifyUserAndPassword(username, password)
    if (!isPasswordValid) return { valid: false, reason: 'invalid password' }

    const { accessToken, refreshToken } = await this.sessionManager.create({
      user: User,
    })

    return {
      valid: true,
      accessToken,
      refreshToken,
    }
  }

  async refresh(data: { refreshToken: string }): Promise<string> {
    const { refreshToken } = data
    const { accessToken } = await this.sessionManager.refresh(refreshToken)
    return accessToken
  }
}
