import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@remix-run/react"
import { isNil, omit } from "lodash-es"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert } from "~/components/globals/Alert"
import { UserSelect } from "~/components/selects/UserSelect"

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
import { Textarea } from "~/components/ui/textarea"
import type { GetPrograms_UseGetProgramQuery } from "~/gql/graphql"
import { useCreateProgram } from "~/hooks/program/useCreateProgram"
import { useUpdateProgram } from "~/hooks/program/useUpdateProgram"

const formSchema = z.object({
  name: z.string().min(2, {
    error: "Nombre debe tener al menos dos caracteres",
  }),
  description: z.string(),
  // startDate: z.date(),
  // endDate: z.date(),
  responsibleId: z.string().nonoptional(),
  active: z.boolean()
})

export function ProgramForm (props: { program?: GetPrograms_UseGetProgramQuery['program']['one'] }) {
  const { program } = props
  const shouldUpdate = !isNil(program)

  const { createProgram, error: errorCreate, loading: loadingCreate, program: programCreated } = useCreateProgram()
  const { updateProgram, error: errorUpdate, loading: loadingUpdate } = useUpdateProgram()

  const error = errorCreate ?? errorUpdate
  const loading = loadingCreate ?? loadingUpdate

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      // startDate: new Date(),
      // endDate: new Date(),
      responsibleId: "",
      active: true
    },
  })

  useEffect(() => {
    if (program) {
      form.reset({
        ...program,
        description: program.description ?? undefined,
      })
    }
  }, [form, program])

  useEffect(() => {
    if (programCreated) {
      navigate(`/programs/${programCreated.id}`)
    }
  }, [programCreated, navigate])

  const onCancel = () => {
    navigate('/programs')
  }

  function onSubmit (values: z.infer<typeof formSchema>) {
    if (shouldUpdate) {
      updateProgram({ variables: { data: values, where: { id: program.id } } })
      return
    }
    createProgram({ variables: { data: omit(values, ['active']) } })
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
                <FormLabel>Nombre de institucion</FormLabel>
                <FormControl>
                  <Input className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Textarea className="w-1/2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsibleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <UserSelect onValueChange={field.onChange} {...omit(field, 'onChange')} />
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