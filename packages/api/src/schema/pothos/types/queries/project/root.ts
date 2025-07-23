import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const ProjectQueriesRef = builder.objectRef('project')

export const ProjectQueries = builder.objectType(ProjectQueriesRef, {
  name: 'ProjectQueries',
  description: 'Project queries',
})

builder.queryField('project', (t) =>
  t.field({
    resolve: emptyResolver,
    type: ProjectQueriesRef,
  }),
)
