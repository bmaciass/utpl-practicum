import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
  smallint,
} from 'drizzle-orm/pg-core'
import { User } from './user'
import { Institution } from './institution'

export const InstitutionalPlan = pgTable('InstitutionalPlan', {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  year: smallint().notNull(),
  version: smallint().notNull(),
  url: varchar().notNull(),
  institutionUid: varchar()
    .references(() => Institution.uid)
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

export const institutionalPlanRelations = relations(
  InstitutionalPlan,
  ({ one }) => ({
    institution: one(Institution, {
      fields: [InstitutionalPlan.institutionUid],
      references: [Institution.uid],
    }),
    createdBy: one(User, {
      fields: [InstitutionalPlan.createdBy],
      references: [User.uid],
    }),
    updatedBy: one(User, {
      fields: [InstitutionalPlan.updatedBy],
      references: [User.uid],
    }),
  }),
)

export type InstitutionalPlanPayload = typeof InstitutionalPlan.$inferInsert
export type InstitutionalPlanRecord = typeof InstitutionalPlan.$inferSelect
