import { Link, useNavigate, useParams } from "@remix-run/react";
import { Alert } from "~/components/globals/Alert";
import { InstitutionForm } from "~/components/pages/institution/InstitutionForm";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetInstitution } from "~/hooks/institution/useGetInstitution";

export default function Index () {
  const { id } = useParams()
  if (!id) {
    return <Alert variant="error" description="Parametro no encontrado" />
  }

  const { error, loading, institution } = useGetInstitution(id)
  return (
    <>
      {error && <Alert variant="error" description={error.cause?.message ?? error.message} />}
      {loading && <Skeleton className="w-full" />}
      <div className="flex flex-column ga-y-2">
        <InstitutionForm institution={institution} />
        <div className="flex gap-2">
          <Link to={`/institutions/${id}/plans`}>
            <Button type="button" variant={'secondary'}>Ver Planificaciones</Button>
          </Link>
          <Link to={`/institutions/${id}/estrategicObjetives`}>
            <Button type="button" variant={'secondary'}>Ver Objetivos Estrategicos</Button>
          </Link>
        </div>
      </div>
    </>
  )
}