import {
  getDBConnection,
  Institution,
  type Db,
  executeMigration,
} from '@sigep/db'
import { Person, User } from '@sigep/db'
import { nanoid } from 'nanoid/non-secure'
import { UserPasswordManager } from '@sigep/auth'

async function recreatePublicSchema(db: Db) {
  await db.execute('DROP SCHEMA "public" CASCADE; CREATE SCHEMA "public";')
}

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

  const { hash, salt } = new UserPasswordManager(
    {
      username: 'admin',
      password: 'admin',
    },
    db,
  ).generatePasswordAndSalt()

  const [user] = await db
    .insert(User)
    .values({
      name: 'admin',
      password: hash,
      salt,
      uid: nanoid(),
      personUid: adminPerson.uid,
    })
    .returning()

  await db.insert(Institution).values({
    name: 'Institucion de prueba',
    area: 'educacion',
    level: 'nacional',
    uid: '123123123',
    createdBy: user.uid,
  })
}

async function main() {
  const { db, client } = await getDBConnection(
    process.env.DATABASE_URL as string,
  )

  await client.connect()

  await db.transaction(async (tx) => {
    await recreatePublicSchema(tx)
    await executeMigration(tx)
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
