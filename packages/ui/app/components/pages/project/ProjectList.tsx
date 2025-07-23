import { Separator } from '~/components/ui/separator'
import type { GetProjectList_UseProjectListQuery } from '~/gql/graphql'
import { ProgramCard } from './ProjectCard'

export const ProyectList = (props: { list: GetProjectList_UseProjectListQuery['project']['list']['records'] }) => {
  const { list } = props
  const shallowClonedList = [...list]

  const firstRecord = shallowClonedList.shift()
  if (!firstRecord) return null

  const institutionList = shallowClonedList.map((record) => {
    return (
      <>
        <Separator key={`separator-${record.id}`} />
        <ProgramCard key={`${record.id}`} program={record} />
      </>
    )
  })

  institutionList.unshift(<ProgramCard key={firstRecord.id} program={firstRecord} />)

  return (
    <>{institutionList}</>
  )
}