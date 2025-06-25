import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { getDBConnection } from './getDBConnection'

async function main() {
  console.log(`starting migrations at ${process.env.DATABASE_URL}`)
  const { db, client } = await getDBConnection()

  await client.connect()

  await db.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await db.execute('select * from uuid_generate_v4();')
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, {
    migrationsFolder: './migrations',
    migrationsSchema: 'public',
  })

  await client.end()
}

main()
  .then(() => {
    console.log('migration finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
