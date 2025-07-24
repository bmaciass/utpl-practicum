import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const ProjectGoalQueriesRef = builder.objectRef('projectGoal')

export const ProjectGoalQueries = builder.objectType(ProjectGoalQueriesRef, {
  name: 'ProjectGoalQueries',
  description: 'ProjectGoal queries',
})

builder.queryField('projectGoal', (t) =>
  t.field({
    resolve: emptyResolver,
    type: ProjectGoalQueriesRef,
  }),
)
