import { pbkdf2Sync, randomBytes } from "node:crypto"

export function hashAndSaltFromPassword (password: string, iterations = 100) {
      // Generate a random salt
      const salt = randomBytes(16).toString('hex')
  
      // Hash the password with the salt
      const hash = pbkdf2Sync(
        password,
        salt,
        iterations,
        64,
        'sha512',
      ).toString('hex')
  
      // Return the salt and hash
      return { salt, hash }
}