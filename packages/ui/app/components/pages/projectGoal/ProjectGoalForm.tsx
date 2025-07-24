import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { isNil, omit } from 'lodash-es'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Alert } from '~/components/globals/Alert'
import { ProjectStatusSelect } from '~/components/selects/ProjectStatusSelect'

import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  ProjectGoalStatus,
  type ProjectGoal_UseGetProjectGoalQuery
} from '~/gql/graphql'
import { useCreateProjectGoal } from '~/hooks/projectGoal/useCreateProjectGoal'
import { useUpdateProjectGoal } from '~/hooks/projectGoal/useUpdateProjectGoal'

const formSchema = z.object({
  name: z.string().min(2, {
    error: 'Nombre debe tener al menos dos caracteres',
  }),
  status: z.enum(ProjectGoalStatus),
  // startDate: z.date(),
  // endDate: z.date(),
  active: z.boolean(),
})

export function ProjectGoalForm (props: {
  projectGoal?: ProjectGoal_UseGetProjectGoalQuery['projectGoal']['one']
}) {
  const { projectGoal } = props
  const location = useLocation()
  const params = useParams()
  const projectId = params.projectId as string
  const shouldUpdate = !isNil(projectGoal)

  const {
    createProjectGoal,
    error: errorCreate,
    loading: loadingCreate,
    projectGoal: projectGoalCreated,
  } = useCreateProjectGoal()
  const {
    updateProjectGoal,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useUpdateProjectGoal(projectId)

  const error = errorCreate ?? errorUpdate
  const loading = loadingCreate ?? loadingUpdate

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: ProjectGoalStatus.Pending,
      // startDate: new Date(),
      // endDate: new Date(),
      active: true,
    },
  })

  useEffect(() => {
    if (projectGoal) {
      form.reset(projectGoal)
    }
  }, [form, projectGoal])

  useEffect(() => {
    if (projectGoalCreated) {
      navigate(`${location.pathname.replace('/new', '')}/${projectGoalCreated.id}`)
    }
  }, [projectGoalCreated, location, navigate])

  const onCancel = () => {
    navigate(-1)
  }

  function onSubmit (values: z.infer<typeof formSchema>) {
    if (shouldUpdate) {
      updateProjectGoal({
        variables: { data: values, where: { id: projectGoal.id } },
      })
      return
    }
    createProjectGoal({
      variables: { data: { ...omit(values, ['active']), projectId } },
    })
  }

  return (
    <div className='flex flex-col space-y-2'>
      {error && (
        <Alert
          closable
          variant='error'
          description={error.cause?.message ?? error.message}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la meta</FormLabel>
                <FormControl>
                  <Input className='w-1/2' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <ProjectStatusSelect
                    onValueChange={field.onChange}
                    {...omit(field, 'onChange')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='active'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center gap-2'>
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
          <div className='flex gap-x-2'>
            <Button variant={'secondary'} type='button' onClick={onCancel}>
              Cancelar
            </Button>
            <Button type='submit' disabled={loading}>
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
