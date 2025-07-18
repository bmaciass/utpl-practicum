import { createContext, type PropsWithChildren, useContext } from "react";

type TSessionContext = {
  uid?: string
}

const SessionContext = createContext<TSessionContext | undefined>(undefined)

export const SessionProvider = ({ children }: PropsWithChildren) => {
  return <SessionContext.Provider value={{ uid: '' }}>{children}</SessionContext.Provider>
}

export const useSession = () => {
  const sessionContext = useContext(SessionContext)
  if (!sessionContext) throw new Error('session provider is not initialized')

  return sessionContext
}