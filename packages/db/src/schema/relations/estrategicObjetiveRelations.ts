import { relations } from 'drizzle-orm/relations'
import { User } from '../tables/user'
import { InstitutionEstrategicObjetive } from '../tables/institutionEstrategicObjetive'
import { Institution } from '../tables/institution'

export const estrategicObjetiveRelations = relations(
  InstitutionEstrategicObjetive,
  ({ one }) => ({
    institution: one(Institution, {
      fields: [InstitutionEstrategicObjetive.institutionUid],
      references: [Institution.uid],
    }),
    createdBy: one(User, {
      fields: [InstitutionEstrategicObjetive.createdBy],
      references: [User.uid],
    }),
    updatedBy: one(User, {
      fields: [InstitutionEstrategicObjetive.updatedBy],
      references: [User.uid],
    }),
  }),
)
