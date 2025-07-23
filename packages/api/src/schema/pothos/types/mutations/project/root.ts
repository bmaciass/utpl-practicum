import emptyResolver from '~/helpers/emptyResolver'
import builder from '~/schema/pothos/builder'

export const ProjectMutationsRef = builder.objectRef('project')

export const ProjectMutations = builder.objectType(ProjectMutationsRef, {
  name: 'ProjectMutations',
  description: 'Project mutations',
})

builder.mutationField('project', (t) =>
  t.field({
    resolve: emptyResolver,
    type: ProjectMutationsRef,
  }),
)
