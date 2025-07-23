import { useNavigate } from "@remix-run/react"
import { capitalize } from "lodash-es"
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { GetProgramList_UseProgramListQuery } from '~/gql/graphql'

export const ProgramCard = (data: { program: GetProgramList_UseProgramListQuery['program']['list']['records'][number] }) => {
  const { id, name } = data.program
  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`/programs/${id}`)
  }

  return (
    <Card className="cursor-pointer" key={`program-${id}`} onClick={() => { handleOnClick(id) }}>
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
    </Card>
  )
}