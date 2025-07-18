import { createContext, type PropsWithChildren, useContext } from "react"

type TAppEnvProps = {
  apiUrl: string
}

const AppEnvContext = createContext<TAppEnvProps | undefined>(undefined)

export const AppEnvProvider = (props: PropsWithChildren<{ data: TAppEnvProps }>) => {
  const { data, children } = props
  return (
    <AppEnvContext.Provider value={data}>{children}</AppEnvContext.Provider>
  )
}

export const useAppEnv = () => {
  const context = useContext(AppEnvContext)
  if (!context) throw new Error('AppEnvProvider is not initialized')

  return context
}
