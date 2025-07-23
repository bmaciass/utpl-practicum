import { relations } from 'drizzle-orm'
import { Institution } from '../tables/institution'
import { User } from '../tables/user'
import { InstitutionEstrategicObjetive } from '../tables/institutionEstrategicObjetive'

export const institutionRelations = relations(Institution, ({ one, many }) => ({
  objetives: many(InstitutionEstrategicObjetive),
  createdBy: one(User, {
    fields: [Institution.createdBy],
    references: [User.uid],
  }),
  updatedBy: one(User, {
    fields: [Institution.updatedBy],
    references: [User.uid],
  }),
}))
