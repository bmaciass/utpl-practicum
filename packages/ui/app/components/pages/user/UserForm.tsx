import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useSubmit } from "@remix-run/react"
import { pick } from "lodash-es"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert } from "~/components/globals/Alert"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import type { GetUsers_UseGetUserQuery } from "~/gql/graphql"
import { useCreateUser } from "~/hooks/user/useCreateUser"
import { useUpdateUser } from "~/hooks/user/useUpdateUser"

const formSchema = z.object({
  name: z.string().min(2, {
    error: "Nombre debe tener al menos dos caracteres",
  }),
  password: z.string().min(5, {
    error: "Nombre debe tener al menos cinco caracteres",
  }),
  firstName: z.string().min(2, {
    error: "Nombre debe tener al menos dos caracteres",
  }),
  lastName: z.string().min(2, {
    error: "Nombre debe tener al menos dos caracteres",
  }),
  dni: z.string().min(9, {
    error: "Nombre debe tener al menos nueve caracteres",
  }),
  active: z.boolean()
})

export function UserForm (props: { user?: GetUsers_UseGetUserQuery['user']['one'] }) {
  const { user } = props
  const shouldUpdate = typeof user !== 'undefined' && user !== null

  const { createUser, error: errorCreate, loading: loadingCreate, user: userCreated } = useCreateUser()
  const { updateUser, error: errorUpdate, loading: loadingUpdate } = useUpdateUser()

  const error = errorCreate ?? errorUpdate
  const loading = loadingCreate ?? loadingUpdate

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      dni: "",
      firstName: '',
      lastName: '',
      active: true
    },
  })

  useEffect(() => {
    if (user) {
      form.reset(user)
    }
  }, [form, user])

  useEffect(() => {
    if (userCreated) {
      navigate(`/users/${userCreated.id}`)
    }
  }, [userCreated, navigate])

  const onCancel = () => {
    navigate('/users')
  }

  function onSubmit (values: z.infer<typeof formSchema>) {
    if (shouldUpdate) {
      updateUser({ variables: { data: values, where: { id: user.id } } })
      return
    }
    createUser({ variables: { data: pick(values, ['dni', 'firstName', 'lastName', 'name', 'password']) } })
  }

  return (
    <div className="flex flex-col space-y-2">
      {error && <Alert closable variant="error" description={error.cause?.message ?? error.message} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clave</FormLabel>
                <FormControl>
                  <Input className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cedula</FormLabel>
                <FormControl>
                  <Input className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormLabel>Activo</FormLabel>
                <FormControl>
                  <Checkbox
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2">
            <Button variant={'secondary'} type="button" onClick={onCancel}>Cancelar</Button>
            <Button type="submit" disabled={loading}>Guardar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}