import { sql } from 'drizzle-orm'
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { Program } from './program'
import { User } from './user'

export const projectStatusEnum = pgEnum('ProjectStatus', [
  'pending',
  'in_progress',
  'done',
  'cancelled',
])

export const Project = pgTable('Project', {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  description: text(),
  status: projectStatusEnum().notNull().default('pending'),
  startDate: date({ mode: 'date' }),
  endDate: date({ mode: 'date' }),
  responsibleUid: varchar()
    .references(() => User.uid)
    .notNull(),
  programUid: varchar()
    .references(() => Program.uid)
    .notNull(),
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

export type ProjectPayload = typeof Project.$inferInsert
export type ProjectRecord = typeof Project.$inferSelect
