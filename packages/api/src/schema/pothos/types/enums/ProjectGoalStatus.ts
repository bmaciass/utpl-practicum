import { projectGoalStatusEnum } from '@sigep/db'
import builder from '../../builder'

export const ProjectGoalStatusEnum = builder.enumType('ProjectGoalStatus', {
  values: projectGoalStatusEnum.enumValues,
})
