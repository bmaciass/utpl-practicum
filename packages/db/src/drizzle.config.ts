import { type Config, defineConfig } from 'drizzle-kit'
import { databaseUrl } from '~/config/db'

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
}) satisfies Config
