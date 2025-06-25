import { getDBConnection, type Db } from '@sigep/db'
import { Person, User } from '@sigep/db'
import { nanoid } from 'nanoid/non-secure'
import { UserPasswordManager } from '@sigep/auth'

async function seedOrganizationData(db: Db) {
  const [adminPerson] = await db
    .insert(Person)
    .values([
      {
        firstName: 'Local',
        lastName: 'Admin',
        dni: '0999999999',
        uid: nanoid(),
      },
    ])
    .returning()

  const { hash, salt } = new UserPasswordManager({
    username: 'admin',
    password: 'admin',
  }).generatePasswordAndSalt()

  await db.insert(User).values({
    name: 'admin',
    password: hash,
    salt,
    uid: nanoid(),
    personUid: adminPerson.uid,
  })
}

async function main() {
  const { db, client } = await getDBConnection()

  await client.connect()

  await db.transaction(async (tx) => {
    await seedOrganizationData(tx)
  })
  await client.end()
}

console.log(`Running local seed in ${process.env.DATABASE_URL}`)

main()
  .then(() => {
    console.log('seeder finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
