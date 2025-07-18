import { migrate } from 'drizzle-orm/node-postgres/migrator'
import type { Db } from './getDBConnection'

export async function executeMigration(db: Db) {
  await db.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await db.execute('select * from uuid_generate_v4();')
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, {
    migrationsFolder: `${__dirname}/../migrations`,
    migrationsSchema: 'public',
  })
}
