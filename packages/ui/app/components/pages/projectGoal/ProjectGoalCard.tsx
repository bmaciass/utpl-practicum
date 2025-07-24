import { useLocation, useNavigate } from "@remix-run/react"
import { capitalize } from "lodash-es"
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { ProjectGoal_UseProjectGoalListQuery } from '~/gql/graphql'

export const ProjectGoalCard = (data: { projectGoal: ProjectGoal_UseProjectGoalListQuery['projectGoal']['list']['records'][number] }) => {
  const { id, name } = data.projectGoal
  const location = useLocation()
  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`${location.pathname.replace('/new', '')}/${id}`)
  }

  return (
    <Card className="cursor-pointer" key={`project-goal-${id}`} onClick={() => { handleOnClick(id) }}>
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
    </Card>
  )
}