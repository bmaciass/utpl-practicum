import { sql } from 'drizzle-orm'
import {
  boolean,
  date,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { User } from './user'
import { Institution } from './institution'

export const InstitutionEstrategicObjetive = pgTable(
  'InstitutionEstrategicObjetive',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 128 }).notNull(),
    uid: varchar({ length: 64 })
      .unique()
      .default(sql`uuid_generate_v4()`)
      .notNull(),
    institutionUid: varchar().references(() => Institution.uid),
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
  },
)

export type InstitutionEstrategicObjetivePayload =
  typeof InstitutionEstrategicObjetive.$inferInsert
export type InstitutionEstrategicObjetiveRecord =
  typeof InstitutionEstrategicObjetive.$inferSelect
