import { type Db, User, type Person } from '@sigep/db'
import { eq, type SQL } from 'drizzle-orm'
import { compact, isNil } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'
import type { TStringFilter } from '~/helpers/filter-inputs'
import { stringCondition } from '~/helpers/gqlFiltersToDrizzleFilters'

type UserSelectField = keyof typeof User.$inferSelect
type PersonSelectField = keyof typeof Person.$inferSelect

type FindManyWhereFilters = {
  name?: TStringFilter
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type CompoundFields = {
  user?: UserSelectField[]
  person?: PersonSelectField[]
}

export class UserPersonService {
  constructor(protected db: Db) {}

  async findUnique<Fields extends CompoundFields>(id: string, fields?: Fields) {
    const result = await this.db.query.User.findFirst({
      where: ({ uid }, { eq }) => eq(uid, id),
      columns: fields?.user ? fieldsToColumns(fields.user) : undefined,
      with: {
        person: {
          columns: fields?.person ? fieldsToColumns(fields.person) : undefined,
        },
      },
    })
    return result
  }

  async findMany<Fields extends CompoundFields>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }) {
    const { fields, where } = data ?? {}
    const { active, name, offset, limit } = where ?? {}

    const filters: SQL[] = compact([
      !isNil(active) ? eq(User.active, active) : null,
      ...(name ? stringCondition(User.name, name) : []),
    ])

    const result = await this.db.query.User.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fields?.user ? fieldsToColumns(fields.user) : undefined,
      offset,
      limit,
      with: {
        person: {
          columns: fields?.person ? fieldsToColumns(fields.person) : undefined,
        },
      },
    })

    return result
  }
}
