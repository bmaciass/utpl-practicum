import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "@remix-run/react"
import { isNil, omit } from "lodash-es"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert } from "~/components/globals/Alert"
import { ProjectStatusSelect } from "~/components/selects/ProjectStatusSelect"
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
import { type GetProjects_UseGetProjectQuery, ProjectStatus } from "~/gql/graphql"
import { useCreateProject } from "~/hooks/project/useCreateProject"
import { useUpdateProject } from "~/hooks/project/useUpdateProject"

const formSchema = z.object({
  name: z.string().min(2, {
    error: "Nombre debe tener al menos dos caracteres",
  }),
  description: z.string(),
  status: z.enum(ProjectStatus),
  // startDate: z.date(),
  // endDate: z.date(),
  responsibleId: z.string().nonoptional(),
  active: z.boolean()
})

export function ProjectForm (props: { project?: GetProjects_UseGetProjectQuery['project']['one'] }) {
  const { project } = props
  const params = useParams()
  const programId = params.programId as string
  const shouldUpdate = !isNil(project)

  const { createProject, error: errorCreate, loading: loadingCreate, project: proyectCreated } = useCreateProject()
  const { updateProject, error: errorUpdate, loading: loadingUpdate } = useUpdateProject(programId)

  const error = errorCreate ?? errorUpdate
  const loading = loadingCreate ?? loadingUpdate

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: ProjectStatus.Pending,
      // startDate: new Date(),
      // endDate: new Date(),
      responsibleId: "",
      active: true
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({
        ...project,
        description: project.description ?? undefined,
      })
    }
  }, [form, project])

  useEffect(() => {
    if (proyectCreated) {
      navigate(`/programs/${programId}/projects/${proyectCreated.id}`)
    }
  }, [proyectCreated, programId, navigate])

  const onCancel = () => {
    navigate('/programs')
  }

  function onSubmit (values: z.infer<typeof formSchema>) {
    if (shouldUpdate) {
      updateProject({ variables: { data: values, where: { id: project.id } } })
      return
    }
    createProject({ variables: { data: { ...omit(values, ['active']), programId } } })
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
                <FormLabel>Nombre de proyecto</FormLabel>
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <ProjectStatusSelect onValueChange={field.onChange} {...omit(field, 'onChange')} />
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