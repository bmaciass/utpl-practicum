import { relations } from 'drizzle-orm/relations'
import { Program } from '../tables/program'
import { User } from '../tables/user'
import { Project } from '../tables/project'

export const programRelations = relations(Program, ({ one, many }) => ({
  projects: many(Project),
  responsible: one(User, {
    fields: [Program.responsibleUid],
    references: [User.uid],
  }),
  createdBy: one(User, {
    fields: [Program.createdBy],
    references: [User.uid],
  }),
  updatedBy: one(User, {
    fields: [Program.updatedBy],
    references: [User.uid],
  }),
}))
