import { Separator } from '~/components/ui/separator'
import type { GetProgramList_UseProgramListQuery } from '~/gql/graphql'
import { ProgramCard } from './ProgramCard'

export const ProgramList = (props: { list: GetProgramList_UseProgramListQuery['program']['list']['records'] }) => {
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