import { UserPasswordManager } from '@sigep/api'
import {
  type Db,
  Institution,
  Person,
  Program,
  User,
  executeMigration,
  getDBConnection,
} from '@sigep/db'
import { nanoid } from 'nanoid/non-secure'

async function recreatePublicSchema(db: Db) {
  await db.execute('DROP SCHEMA "public" CASCADE; CREATE SCHEMA "public";')
}

async function seedOrganizationData(db: Db) {
  const [adminPerson, opPerson] = await db
    .insert(Person)
    .values([
      {
        firstName: 'Local',
        lastName: 'Admin',
        dni: '0999999999',
        uid: nanoid(),
      },
      {
        firstName: 'Bryan',
        lastName: 'Macias',
        dni: '0931478093',
        uid: nanoid(),
      },
    ])
    .returning()

  const [
    { hash: hashUserAdmin, salt: saltUserAdmin },
    { hash: hashOPUser, salt: saltOPUser },
  ] = [
    new UserPasswordManager(
      {
        username: 'admin',
        password: 'admin',
      },
      db,
    ).generatePasswordAndSalt(),
    new UserPasswordManager(
      {
        username: 'bryan',
        password: 'bryan',
      },
      db,
    ).generatePasswordAndSalt(),
  ]

  const [userAdmin, userOperative] = await db
    .insert(User)
    .values([
      {
        name: 'admin',
        password: hashUserAdmin,
        salt: saltUserAdmin,
        uid: nanoid(),
        personUid: adminPerson.uid,
        // createdBy: '0',
      },
      {
        name: 'bryan',
        password: hashOPUser,
        salt: saltOPUser,
        uid: nanoid(),
        personUid: opPerson.uid,
        // createdBy: '0',
      },
    ])
    .returning()

  await db.insert(Institution).values({
    name: 'Institucion de prueba',
    area: 'educacion',
    level: 'nacional',
    uid: '123123123',
    createdBy: userAdmin.uid,
  })

  await db.insert(Program).values({
    createdBy: userAdmin.uid,
    name: 'Program de Transformacion digital',
    responsibleUid: userOperative.uid,
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
