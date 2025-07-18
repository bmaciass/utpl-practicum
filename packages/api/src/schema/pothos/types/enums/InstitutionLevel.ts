import builder from '../../builder'
import { institutionGovernanceLevelEnum } from '@sigep/db'

export const InstitutionLevelEnum = builder.enumType('InstitutionLevel', {
  values: institutionGovernanceLevelEnum.enumValues,
})
