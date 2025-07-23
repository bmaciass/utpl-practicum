import { Link, Outlet, useParams } from "@remix-run/react"
import { isEmpty } from "lodash-es"
import { Alert } from "~/components/globals/Alert"
import { ProyectList } from "~/components/pages/project/ProjectList"
import { Title } from "~/components/typography/Headers"
import { Paragraph } from "~/components/typography/Paragraph"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { withAuth } from "~/helpers/withAuth"
import { useProjectList } from "~/hooks/project/useProjectList"
import { ClientOnly } from "~/utils/ClientOnly"

export const loader = withAuth()

const ProjectsSection = () => {
  const { programId } = useParams()

  // biome-ignore lint/style/noNonNullAssertion: this comes from the file so it is not null
  const { projects, error, loading } = useProjectList(programId!)
  if (loading) {
    return <Skeleton className="h-full w-full" />
  }

  if (error) {
    return <Alert variant="error" description={`Error cargando Proyectos. Error: ${error.message}`} />
  }

  if (isEmpty(projects)) {
    return <Paragraph>No hay proyectos creados</Paragraph>
  }

  return (
    <div className="py-4">
      <ProyectList list={projects} />
    </div>
  )
}

const ProjectsPage = () => {
  const { programId } = useParams()
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-3 col-start-1 p-4">
        <div className="flex">
          <div className="grow">
            <Title variant="h4">Proyectos</Title>
          </div>
          <div className="flex-none">
            <Link to={`/programs/${programId}/projects/new`}>
              <Button>Nuevo</Button>
            </Link>
          </div>
        </div>
        <ProjectsSection />
      </div>
      <div className="col-span-3 col-start-4 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default function Index () {
  return (
    <ClientOnly>{() => <ProjectsPage />}</ClientOnly>
  )
}