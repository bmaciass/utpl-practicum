import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { Person } from './person'

export const User = pgTable('User', {
  id: serial().primaryKey(),
  name: varchar({ length: 64 }).unique().notNull(),
  uid: varchar({ length: 64 })
    .unique()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  personUid: varchar()
    .references(() => Person.uid)
    .notNull(),
  password: varchar({ length: 512 }).notNull(),
  salt: varchar({ length: 512 }).notNull(),
  // createdBy: varchar().references(() => ),
  // updatedBy: varchar(),
  createdAt: timestamp({ withTimezone: false }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: false })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  active: boolean().default(true).notNull(),
})

export const usersRelations = relations(User, ({ one }) => ({
  person: one(Person, { fields: [User.personUid], references: [Person.uid] }),
  // createdBy: one(User, { fields: [User.createdBy], references: [User.uid] }),
  // updatedBy: one(User, { fields: [User.updatedBy], references: [User.uid] }),
}))

export type UserRecord = typeof User.$inferSelect
export type UserPayload = typeof User.$inferInsert
