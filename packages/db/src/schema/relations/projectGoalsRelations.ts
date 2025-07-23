import { relations } from 'drizzle-orm/relations'
import { User } from '../tables/user'
import { ProjectGoal } from '../tables/projectGoal'
import { Project } from '../tables/project'

export const projectGoalsRelations = relations(ProjectGoal, ({ one }) => ({
  project: one(Project, {
    fields: [ProjectGoal.projectUid],
    references: [Project.uid],
  }),
  createdBy: one(User, {
    fields: [ProjectGoal.createdBy],
    references: [User.uid],
  }),
  updatedBy: one(User, {
    fields: [ProjectGoal.updatedBy],
    references: [User.uid],
  }),
}))
