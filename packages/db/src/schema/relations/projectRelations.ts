import { relations } from 'drizzle-orm/relations'
import { Program } from '../tables/program'
import { User } from '../tables/user'
import { Project } from '../tables/project'
import { ProjectGoal } from '../tables/projectGoal'

export const projectRelations = relations(Project, ({ one, many }) => ({
  goals: many(ProjectGoal),
  program: one(Program, {
    fields: [Project.programUid],
    references: [Program.uid],
  }),
  responsible: one(User, {
    fields: [Project.responsibleUid],
    references: [User.uid],
  }),
  createdBy: one(User, {
    fields: [Project.createdBy],
    references: [User.uid],
  }),
  updatedBy: one(User, {
    fields: [Project.updatedBy],
    references: [User.uid],
  }),
}))
