import { Link, Outlet, useParams } from "@remix-run/react"
import { isEmpty } from "lodash-es"
import { Alert } from "~/components/globals/Alert"
import { ProjectGoalList } from "~/components/pages/projectGoal/ProjectGoalList"
import { Title } from "~/components/typography/Headers"
import { Paragraph } from "~/components/typography/Paragraph"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { withAuth } from "~/helpers/withAuth"
import { useProjectGoalList } from "~/hooks/projectGoal/useProjectGoalList"
import { ClientOnly } from "~/utils/ClientOnly"

export const loader = withAuth()

const ProjectGoalsSection = () => {
  const params = useParams()
  const projectId = params.projectId as string

  const { projectGoals, error, loading } = useProjectGoalList(projectId)
  if (loading) {
    return <Skeleton className="h-full w-full" />
  }

  if (error) {
    return <Alert variant="error" description={`Error cargando Proyectos. Error: ${error.message}`} />
  }

  if (isEmpty(projectGoals)) {
    return <Paragraph>No hay proyectos creados</Paragraph>
  }

  return (
    <div className="py-4">
      <ProjectGoalList list={projectGoals} />
    </div>
  )
}

const ProjectGoalsPage = () => {
  const params = useParams()
  const programId = params.programId as string
  const projectId = params.projectId as string
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-3 col-start-1 p-4">
        <div className="flex">
          <div className="grow">
            <Title variant="h4">Proyectos</Title>
          </div>
          <div className="flex-none">
            <Link to={`/programs/${programId}/projects/${projectId}/goals/new`}>
              <Button>Nuevo</Button>
            </Link>
          </div>
        </div>
        <ProjectGoalsSection />
      </div>
      <div className="col-span-3 col-start-4 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default function Index () {
  return (
    <ClientOnly>{() => <ProjectGoalsPage />}</ClientOnly>
  )
}