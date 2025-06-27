import { type Db, Institution } from '@sigep/db'
import { eq, type SQL } from 'drizzle-orm'
import { compact, isNil } from 'lodash-es'
import type { TStringFilter } from '~/helpers/filter-inputs'
import { stringCondition } from '~/helpers/gqlFiltersToDrizzleFilters'

type FindManyWhereFilters = {
  name?: TStringFilter
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

export class InstitutionModel {
  constructor(protected db: Db) {}

  async findMany(data?: FindManyWhereFilters & FindManyLimitParams) {
    const { active, name, offset, limit } = data ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(Institution.active, active) : null,
      ...(name ? stringCondition(Institution.name, name) : []),
    ])

    return this.db.query.Institution.findMany({
      where: (_, operators) => operators.and(...filters),
      offset,
      limit,
    })
  }
}
