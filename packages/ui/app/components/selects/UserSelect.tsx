import type { SelectProps } from "@radix-ui/react-select"
import type { CSSProperties } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useUserList } from "~/hooks/user/useUserList"
import { Alert } from "../globals/Alert"
import { Skeleton } from "../ui/skeleton"

type CustomSelectProps = SelectProps & {
  placeholder?: string
  styles?: {
    trigger?: CSSProperties
  }
}

// FIXME: This needs to be more modular
export const UserSelect = (props: CustomSelectProps) => {
  const { styles, placeholder, ...selectProps } = props

  const { error, loading, users } = useUserList()

  if (error) return <Alert variant="error" description={error.message} />

  if (loading) return <Skeleton className="w-full" />

  return (
    <Select {...selectProps}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder ?? 'Selecciona un usuario'} />
      </SelectTrigger>
      <SelectContent>
        {users.filter((user) => user.active).map((user) => <SelectItem key={`user-select-${user.id}`} value={user.id}>{`${user.firstName} ${user.lastName}`}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}