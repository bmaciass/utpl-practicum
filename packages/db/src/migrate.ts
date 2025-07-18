import 'dotenv/config'
import { getDBConnection } from './getDBConnection'
import { executeMigration } from './migrator'
console.log(`starting migrations at ${process.env.DATABASE_URL}`)

async function migrate() {
  const { client, db } = await getDBConnection(
    process.env.DATABASE_URL as string,
  )
  await client.connect()
  await executeMigration(db)
  await client.end()
}

migrate()
  .then(() => {
    console.log('migration finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
