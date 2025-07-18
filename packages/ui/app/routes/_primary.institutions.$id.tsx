import { useNavigate, useParams } from "@remix-run/react";
import { Alert } from "~/components/globals/Alert";
import { InstitutionForm } from "~/components/pages/institution/InstitutionForm";
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
      <InstitutionForm institution={institution} />
    </>
  )
}