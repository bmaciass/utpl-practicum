import { sql } from 'drizzle-orm'
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { Project } from './project'
import { User } from './user'

export const projectGoalStatus = pgEnum('ProjectGoalStatus', [
  'pending',
  'in_progress',
  'done',
  'cancelled',
])

export const ProjectGoal = pgTable('ProjectGoal', {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  projectUid: varchar()
    .references(() => Project.uid)
    .notNull(),
  status: projectGoalStatus().notNull().default('pending'),
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

export type ProjectGoalPayload = typeof ProjectGoal.$inferInsert
export type ProjectGoalRecord = typeof ProjectGoal.$inferSelect
