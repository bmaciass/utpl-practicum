import { useEffect, useState } from 'react'
import { Alert as ShadCNALert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { CheckCircleIcon, AlertCircleIcon, CrossIcon } from 'lucide-react'

type AlertProps = {
  title?: string
  description: string
  closable?: boolean
  onClose?: () => void
  variant: 'success' | 'error'
}

export const Alert = (props: AlertProps) => {
  const { description, variant, closable, onClose, title } = props
  const isPersistent = typeof closable === 'boolean' ? !closable : false
  const [isClosed, setClosed] = useState(false) // FIXME: Closable is not working

  const handleClose = () => {
    onClose?.()
    setClosed(true)
  }

  if (isClosed) return null

  return (
    <ShadCNALert variant={variant === 'success' ? 'default' : 'destructive'} >
      {variant === 'success' ? <CheckCircleIcon /> : <AlertCircleIcon />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
      {!isPersistent && <CrossIcon onClick={handleClose} />}
    </ShadCNALert>
  )
}