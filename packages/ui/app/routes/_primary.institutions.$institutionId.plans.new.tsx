import { Link, Outlet, useParams } from "@remix-run/react"
import { isEmpty } from "lodash-es"
import { Alert } from "~/components/globals/Alert"
import { InstitutionList } from "~/components/pages/institution/InstitutionList"
import { Title } from "~/components/typography/Headers"
import { Paragraph } from "~/components/typography/Paragraph"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { withAuth } from "~/helpers/withAuth"
import { useInstitutionList } from "~/hooks/institution/useInstitutionList"
import { ClientOnly } from "~/utils/ClientOnly"

export const loader = withAuth()

const InstitutionsSection = () => {
  const { institutions, error, loading } = useInstitutionList()
  if (loading) {
    return <Skeleton className="h-full w-full" />
  }

  if (error) {
    return <Alert variant="error" description={`Error cargando Instituciones. Error: ${error.cause?.message ?? error.message}`} />
  }

  if (isEmpty(institutions)) {
    return <Paragraph>No hay instituciones creadas</Paragraph>
  }

  return (
    <div className="py-4">
      <InstitutionList list={institutions} />
    </div>
  )
}

const InstitutionsPage = () => {
  const params = useParams()
  const institutionId = params.institutionId
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-3 col-start-1 p-4">
        <div className="flex">
          <div className="grow">
            <Title variant="h4">Planes Institucionales</Title>
          </div>
          <div className="flex-none">
            <Link to={`/institutions/${institutionId}/plans/new`}>
              <Button>Cargar nuevo plan</Button>
            </Link>
          </div>
        </div>
        <InstitutionsSection />
      </div>
      <div className="col-span-3 col-start-4 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default function Index () {
  return (
    // <InstitutionsPage />
    <ClientOnly>{() => <InstitutionsPage />}</ClientOnly>
  )
}