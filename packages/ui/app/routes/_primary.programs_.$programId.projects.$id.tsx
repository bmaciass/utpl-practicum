import { Link, useParams } from "@remix-run/react";
import { Alert } from "~/components/globals/Alert";
import { ProjectForm } from "~/components/pages/project/ProjectForm";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetProject } from "~/hooks/project/useGetProject";

export default function Index () {
  const params = useParams()
  const id = params.id as string
  const programId = params.programId as string

  const { error, loading, project } = useGetProject(id)
  return (
    <>
      {error && <Alert variant="error" description={error.message} />}
      {loading && <Skeleton className="w-full" />}
      <div className="flex flex-column w-full ga-y-2">
        <div className="w-full">
          <ProjectForm project={project} />
        </div>
        <div className="flex gap-2">
          <Link to={`/programs/${programId}/projects/${id}/goals`}>
            <Button type="button" variant={'secondary'}>Ver Metas</Button>
          </Link>
        </div>
      </div>
    </>
  )
}