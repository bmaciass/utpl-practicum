import { useNavigate } from "@remix-run/react"
import { capitalize } from "lodash-es"
import {
  Card,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { GetInstitutions_UseInstitutionListQuery } from '~/gql/graphql'

export const InstitutionCard = (data: { institution: GetInstitutions_UseInstitutionListQuery['institution']['list']['records'][number] }) => {
  const { id, name } = data.institution
  const navigate = useNavigate()

  const handleOnClick = (id: string) => {
    navigate(`/institutions/${id}`)
  }

  return (
    <Card className="cursor-pointer" key={`institution-${id}`} onClick={() => { handleOnClick(id) }}>
      <CardHeader>
        <CardTitle>{capitalize(name)}</CardTitle>
      </CardHeader>
    </Card>
  )
}