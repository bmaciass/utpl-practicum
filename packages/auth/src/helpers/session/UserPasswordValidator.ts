import { pbkdf2Sync, randomBytes } from 'node:crypto'

const ITERATIONS = 10000

export class UserPasswordValidator {
  protected username: string
  protected password: string

  constructor(data: { username: string; password: string }) {
    const { password, username } = data
    this.password = password
    this.username = username
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

  verifyPassword(data: { hash: string; salt: string }) {
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
