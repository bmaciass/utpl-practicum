import { Link, Outlet } from "@remix-run/react"
import { isEmpty } from "lodash-es"
import { Alert } from "~/components/globals/Alert"
import { ProgramList } from "~/components/pages/program/ProgramList"
import { Title } from "~/components/typography/Headers"
import { Paragraph } from "~/components/typography/Paragraph"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { withAuth } from "~/helpers/withAuth"
import { useProgramList } from "~/hooks/program/useProgramList"
import { ClientOnly } from "~/utils/ClientOnly"

export const loader = withAuth()

const ProgramsSection = () => {
  const { programs, error, loading } = useProgramList()
  if (loading) {
    return <Skeleton className="h-full w-full" />
  }

  if (error) {
    return <Alert variant="error" description={`Error cargando Programas. Error: ${error.message}`} />
  }

  if (isEmpty(programs)) {
    return <Paragraph>No hay programas creadas</Paragraph>
  }

  return (
    <div className="py-4">
      <ProgramList list={programs} />
    </div>
  )
}

const ProgramsPage = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-3 col-start-1 p-4">
        <div className="flex">
          <div className="grow">
            <Title variant="h4">Programas</Title>
          </div>
          <div className="flex-none">
            <Link to={'/programs/new'}>
              <Button>Nuevo</Button>
            </Link>
          </div>
        </div>
        <ProgramsSection />
      </div>
      <div className="col-span-3 col-start-4 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default function Index () {
  return (
    <ClientOnly>{() => <ProgramsPage />}</ClientOnly>
  )
}