import type { PersonRecord, UserRecord } from '@sigep/db'
import builder from '~/schema/pothos/builder'

export type TUser = Pick<UserRecord, 'name' | 'active'> & {
  id: string
} & Pick<PersonRecord, 'firstName' | 'lastName' | 'dni'>

export const User = builder.objectRef<TUser>('User').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    dni: t.exposeString('dni'),
    active: t.exposeBoolean('active'),
  }),
})
