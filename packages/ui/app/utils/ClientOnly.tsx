import { useSyncExternalStore } from 'react'

function subscribe () {
  return () => { }
}

export function useHydrated () {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

type Props = {
  /**
   * You are encouraged to add a fallback that is the same dimensions
   * as the client rendered children. This will avoid content layout
   * shift which is disgusting
   */
  children (): React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly ({ children, fallback = null }: Props) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>
}