import { Link, Outlet } from "@remix-run/react"
import { isEmpty } from "lodash-es"
import { Alert } from "~/components/globals/Alert"
import { UserList } from "~/components/pages/user/UserList"
import { Title } from "~/components/typography/Headers"
import { Paragraph } from "~/components/typography/Paragraph"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import { withAuth } from "~/helpers/withAuth"
import { useUserList } from "~/hooks/user/useUserList"
import { ClientOnly } from "~/utils/ClientOnly"

export const loader = withAuth()

const UsersSection = () => {
  const { users, error, loading } = useUserList()
  if (loading) {
    return <Skeleton className="h-full w-full" />
  }

  if (error) {
    return <Alert variant="error" description={`Error cargando Instituciones. Error: ${error.cause?.message ?? error.message}`} />
  }

  if (isEmpty(users)) {
    return <Paragraph>No hay usuarios creados</Paragraph>
  }

  return (
    <div className="py-4">
      <UserList list={users} />
    </div>
  )
}

const UsersPage = () => {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-3 col-start-1 p-4">
        <div className="flex">
          <div className="grow">
            <Title variant="h4">Usuarios</Title>
          </div>
          <div className="flex-none">
            <Link to={'/users/new'}>
              <Button>Nuevo</Button>
            </Link>
          </div>
        </div>
        <UsersSection />
      </div>
      <div className="col-span-3 col-start-4 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default function Index () {
  return (
    <ClientOnly>{() => <UsersPage />}</ClientOnly>
  )
}