import {
  type Db,
  Person,
  type PersonPayload,
  type PersonRecord,
} from '@sigep/db'
import { type SQL, eq } from 'drizzle-orm'
import { compact, isNil } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'
import type { TStringFilter } from '~/helpers/filter-inputs'
import { stringCondition } from '~/helpers/gqlFiltersToDrizzleFilters'

type FindManyWhereFilters = {
  firstName?: TStringFilter
  lastName?: TStringFilter
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type PersonSelectField = keyof typeof Person.$inferSelect

export class PersonModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<PersonSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<PersonRecord, Fields[number]>>> {
    const { fields, where } = data ?? {}
    const { active, firstName, lastName, offset, limit } = where ?? {}

    const filters: SQL[] = compact([
      !isNil(active) ? eq(Person.active, active) : null,
      ...(firstName ? stringCondition(Person.firstName, firstName) : []),
      ...(lastName ? stringCondition(Person.lastName, lastName) : []),
    ])

    const result = await this.db.query.Person.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      offset,
      limit,
    })
    return result
  }

  async findUnique<Fields extends Array<PersonSelectField>>(
    uid: string,
    fields?: Array<keyof typeof Person.$inferSelect>,
  ): Promise<Pick<PersonRecord, Fields[number]> | undefined> {
    return await this.db.query.Person.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
    })
  }

  async findUniqueOrThrow<Fields extends Array<PersonSelectField>>(
    uid: string,
    fields?: Array<PersonSelectField>,
  ): Promise<Pick<PersonRecord, Fields[number]>> {
    const institution = await this.findUnique(uid, fields)
    if (!institution) throw new Error('institution record not found')
    return institution
  }

  async create(data: Pick<PersonPayload, 'firstName' | 'lastName' | 'dni'>) {
    const [row] = await this.db.insert(Person).values(data).returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<PersonPayload, 'firstName' | 'lastName' | 'dni' | 'active'>
    >,
  ) {
    const result = await this.db
      .update(Person)
      .set(data)
      .where(eq(Person.uid, uid))
      .returning()
    return result[0]
  }
}
