import { useNavigate } from "@remix-run/react"
import { capitalize } from "lodash-es"
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { GetProjectList_UseProjectListQuery } from '~/gql/graphql'

export const ProjectCard = (data: { project: GetProjectList_UseProjectListQuery['project']['list']['records'][number] }) => {
  const { id, name, programId } = data.project
  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`/programs/${programId}/projects/${id}`)
  }

  return (
    <Card className="cursor-pointer" key={`project-${id}`} onClick={() => { handleOnClick(id) }}>
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
    </Card>
  )
}