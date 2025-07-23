import type { SelectProps } from '@radix-ui/react-select'
import type { CSSProperties } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import type { ProjectStatus } from '~/gql/graphql'

type CustomSelectProps = SelectProps & {
  placeholder?: string
  styles?: {
    trigger?: CSSProperties
  }
}

// FIXME: This needs to be more modular
export const ProjectStatusSelect = (props: CustomSelectProps) => {
  const { styles, placeholder, ...selectProps } = props

  const records: Record<ProjectStatus, string> = {
    pending: 'Pendiente',
    in_progress: 'En curso',
    done: 'Finalizado',
    cancelled: 'Cancelado',
  }

  return (
    <Select {...selectProps}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={placeholder ?? 'Selecciona un estado'} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(records).map((status) => (
          <SelectItem key={`user-select-${status}`} value={status}>
            {records[status as ProjectStatus]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
