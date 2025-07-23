import { sql } from 'drizzle-orm'
import {
  boolean,
  date,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { User } from './user'

export const Program = pgTable('Program', {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  description: text(),
  responsibleUid: varchar()
    .references(() => User.uid)
    .notNull(),
  startDate: date({ mode: 'date' }),
  endDate: date({ mode: 'date' }),
  createdBy: varchar()
    .references(() => User.uid)
    .notNull(),
  updatedBy: varchar().references(() => User.uid),
  createdAt: timestamp({ withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: false })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  active: boolean().default(true).notNull(),
})

export type ProgramPayload = typeof Program.$inferInsert
export type ProgramRecord = typeof Program.$inferSelect
