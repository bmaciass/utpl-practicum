import { Separator } from '~/components/ui/separator'
import type { ProjectGoal_UseProjectGoalListQuery } from '~/gql/graphql'
import { ProjectGoalCard } from './ProjectGOalCard'

export const ProjectGoalList = (props: { list: ProjectGoal_UseProjectGoalListQuery['projectGoal']['list']['records'] }) => {
  const { list } = props
  const shallowClonedList = [...list]

  const firstRecord = shallowClonedList.shift()
  if (!firstRecord) return null

  const projectGoalList = shallowClonedList.map((record) => {
    return (
      <>
        <Separator key={`separator-${record.id}`} />
        <ProjectGoalCard key={`${record.id}`} projectGoal={record} />
      </>
    )
  })

  projectGoalList.unshift(<ProjectGoalCard key={firstRecord.id} projectGoal={firstRecord} />)

  return (
    <>{projectGoalList}</>
  )
}