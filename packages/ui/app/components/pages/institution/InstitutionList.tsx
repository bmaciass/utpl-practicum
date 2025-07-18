import { Separator } from '~/components/ui/separator'
import type { GetInstitutions_UseInstitutionListQuery } from '~/gql/graphql'
import { InstitutionCard } from './InstitutionCard'

export const InstitutionList = (props: { list: GetInstitutions_UseInstitutionListQuery['institution']['list']['records'] }) => {
  const { list } = props
  const shallowClonedList = [...list]

  const firstRecord = shallowClonedList.shift()
  if (!firstRecord) return null

  const institutionList = shallowClonedList.map((record) => {
    return (
      <>
        <Separator key={`separator-${record.id}`} />
        <InstitutionCard key={`${record.id}`} institution={record} />
      </>
    )
  })

  institutionList.unshift(<InstitutionCard key={firstRecord.id} institution={firstRecord} />)

  return (
    <>{institutionList}</>
  )
}