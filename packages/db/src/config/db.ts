if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined')

export const databaseUrl = process.env.DATABASE_URL
