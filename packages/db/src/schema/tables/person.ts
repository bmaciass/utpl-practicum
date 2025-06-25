import { sql } from 'drizzle-orm'
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const Person = pgTable('Person', {
  id: serial().primaryKey(),
  firstName: varchar({ length: 64 }).notNull(),
  lastName: varchar({ length: 64 }).notNull(),
  dni: varchar({ length: 15 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  createdAt: timestamp({ withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: false }).$onUpdate(() => new Date()),
  active: boolean().default(true).notNull(),
})

export type PersonPayload = typeof Person.$inferInsert
export type PersonRecord = typeof Person.$inferSelect
