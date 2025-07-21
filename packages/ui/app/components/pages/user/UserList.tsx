import { Separator } from '~/components/ui/separator'
import type { GetUsers_UseUserListQuery } from '~/gql/graphql'
import { UserCard } from './UserCard'

export const UserList = (props: { list: GetUsers_UseUserListQuery['user']['list']['records'] }) => {
  const { list } = props
  const shallowClonedList = [...list]

  const firstRecord = shallowClonedList.shift()
  if (!firstRecord) return null

  const institutionList = shallowClonedList.map((record) => {
    return (
      <>
        <Separator key={`separator-${record.id}`} />
        <UserCard key={`${record.id}`} user={record} />
      </>
    )
  })

  institutionList.unshift(<UserCard key={firstRecord.id} user={firstRecord} />)

  return (
    <>{institutionList}</>
  )
}