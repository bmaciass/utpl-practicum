import { pbkdf2Sync, randomBytes } from 'node:crypto'
import type { Db } from '@sigep/db'

const ITERATIONS = 10000

export class UserPasswordManager {
  protected username: string
  protected password: string

  constructor(
    data: { username: string; password: string },
    protected db: Db,
  ) {
    const { password, username } = data
    this.password = password
    this.username = username
  }

  async verify(): Promise<{ valid: false } | { valid: true; uid: string }> {
    const result = await this.db.query.User.findFirst({
      where: (fields, { eq }) => eq(fields.name, this.username),
    })
    if (!result) return { valid: false }

    const { password: hash, salt, uid } = result
    if (!this.verifyPassword({ hash, salt })) return { valid: false }

    return {
      valid: true,
      uid,
    }
  }

  generatePasswordAndSalt() {
    // Generate a random salt
    const salt = randomBytes(16).toString('hex')

    // Hash the password with the salt
    const hash = pbkdf2Sync(
      this.password,
      salt,
      ITERATIONS,
      64,
      'sha512',
    ).toString('hex')

    // Return the salt and hash
    return { salt, hash }
  }

  protected verifyPassword(data: { hash: string; salt: string }) {
    const { hash, salt } = data
    // Hash the provided password with the stored salt
    const hashedPassword = pbkdf2Sync(
      this.password,
      salt,
      ITERATIONS,
      64,
      'sha512',
    ).toString('hex')

    // Check if the hashed password matches the stored hash
    return hash === hashedPassword
  }
}
