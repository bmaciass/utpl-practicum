import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { Person } from './person'

export const institutionAreaEnum = pgEnum('InstitutionArea', ['educacion'])
export const governanceLevelEnum = pgEnum('InstitutionGovernanceLevel', ['nacional'])

export const Institution = pgTable('Institution', {
  id: serial().primaryKey(),
  name: varchar({ length: 128 }).notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  area: institutionAreaEnum().notNull(),
  level: governanceLevelEnum().notNull(),
  createdBy: varchar()
    .references(() => Person.uid)
    .notNull(),
  updatedBy: varchar().references(() => Person.uid),
  createdAt: timestamp({ withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: false })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  active: boolean().default(true).notNull(),
})

export const institutionRelations = relations(Institution, ({ one }) => ({
  createdBy: one(Person, {
    fields: [Institution.createdBy],
    references: [Person.uid],
  }),
  updatedBy: one(Person, {
    fields: [Institution.updatedBy],
    references: [Person.uid],
  }),
}))

export type InstitutionPayload = typeof Institution.$inferInsert
export type InstitutionRecord = typeof Institution.$inferSelect
