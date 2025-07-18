import builder from '../../builder'
import { institutionAreaEnum } from '@sigep/db'

export const InstitutionAreaEnum = builder.enumType('InstitutionArea', {
  values: institutionAreaEnum.enumValues,
})
