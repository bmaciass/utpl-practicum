import { useNavigate, useParams } from "@remix-run/react";
import { Alert } from "~/components/globals/Alert";
import { UserForm } from "~/components/pages/user/UserForm";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetUser } from "~/hooks/user/useGetUser";

export default function Index () {
  const { id } = useParams()
  if (!id) {
    return <Alert variant="error" description="Parametro no encontrado" />
  }

  const { error, loading, user } = useGetUser(id)
  return (
    <>
      {error && <Alert variant="error" description={error.cause?.message ?? error.message} />}
      {loading && <Skeleton className="w-full" />}
      <UserForm user={user} />
    </>
  )
}