import { Link, useParams } from "@remix-run/react";
import { Alert } from "~/components/globals/Alert";
import { ProgramForm } from "~/components/pages/program/ProgramForm";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetProgram } from "~/hooks/program/useGetProgram";

export default function Index () {
  const { programId } = useParams()
  if (!programId) {
    return <Alert variant="error" description="Parametro no encontrado" />
  }

  const { error, loading, program } = useGetProgram(programId)
  return (
    <>
      {error && <Alert variant="error" description={error.cause?.message ?? error.message} />}
      {loading && <Skeleton className="w-full" />}
      <div className="flex flex-column w-full ga-y-2">
        <div className="w-full">
          <ProgramForm program={program} />
        </div>
        <div className="flex gap-2">
          <Link to={`/programs/${programId}/projects`}>
            <Button type="button" variant={'secondary'}>Ver Proyectos</Button>
          </Link>
        </div>
      </div>
    </>
  )
}