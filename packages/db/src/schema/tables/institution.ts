import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { User } from './user'

export const institutionAreaEnum = pgEnum('InstitutionArea', ['educacion'])
export const institutionGovernanceLevelEnum = pgEnum(
  'InstitutionGovernanceLevel',
  ['nacional'],
)

export const Institution = pgTable('Institution', {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  area: institutionAreaEnum().notNull(),
  level: institutionGovernanceLevelEnum().notNull(),
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

export const institutionRelations = relations(Institution, ({ one }) => ({
  createdBy: one(User, {
    fields: [Institution.createdBy],
    references: [User.uid],
  }),
  updatedBy: one(User, {
    fields: [Institution.updatedBy],
    references: [User.uid],
  }),
}))

export type InstitutionPayload = typeof Institution.$inferInsert
export type InstitutionRecord = typeof Institution.$inferSelect
