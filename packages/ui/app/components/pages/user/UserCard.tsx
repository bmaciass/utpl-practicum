import { useNavigate } from "@remix-run/react"
import { capitalize } from "lodash-es"
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { GetUsers_UseUserListQuery } from '~/gql/graphql'

export const UserCard = (data: { user: GetUsers_UseUserListQuery['user']['list']['records'][number] }) => {
  const { id, name } = data.user
  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`/users/${id}`)
  }

  return (
    <Card className="cursor-pointer" key={`user-${id}`} onClick={() => { handleOnClick(id) }}>
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
    </Card>
  )
}