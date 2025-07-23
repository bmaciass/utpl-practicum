import {
  type Db,
  Institution,
  type InstitutionEstrategicObjetiveRecord,
  type InstitutionPayload,
  type InstitutionRecord,
} from '@sigep/db'
import { eq, sql, type SQL } from 'drizzle-orm'
import { compact, isEmpty, isNil, set } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'
import type { TStringFilter } from '~/helpers/filter-inputs'
import { stringCondition } from '~/helpers/gqlFiltersToDrizzleFilters'
import type { Except } from 'type-fest'

type AugmentedInstitution = InstitutionRecord & {
  objetives: InstitutionEstrategicObjetiveRecord[]
}

type Entities = Except<AugmentedInstitution, keyof InstitutionRecord>

type FindManyWhereFilters = {
  name?: TStringFilter
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type InstitutionSelectField = keyof typeof Institution.$inferSelect

export class InstitutionModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<InstitutionSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<InstitutionRecord, Fields[number]> & Entities>> {
    const { fields, where } = data ?? {}
    const { active, name, offset, limit } = where ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(Institution.active, active) : null,
      ...(name ? stringCondition(Institution.name, name) : []),
    ])

    const result = await this.db.query.Institution.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      with: { objetives: true }, // FIXME: may be dynamic
      offset,
      limit,
    })
    return result
  }

  async findUnique<
    Fields extends Array<InstitutionSelectField>,
    Includes extends Array<keyof Entities>,
  >(
    uid: string,
    fields?: Array<keyof typeof Institution.$inferSelect>,
    include?: Includes,
  ): Promise<(Pick<InstitutionRecord, Fields[number]> & Entities) | undefined> {
    const a = await this.db.query.Institution.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
      with: { objetives: true }, // FIXME: may be dynamic
    })
    return a
  }

  async findUniqueOrThrow<Fields extends Array<InstitutionSelectField>>(
    uid: string,
    fields?: Array<keyof typeof Institution.$inferSelect>,
  ): Promise<Pick<InstitutionRecord, Fields[number]>> {
    const institution = await this.findUnique(uid, fields)
    if (!institution) throw new Error('institution record not found')
    return institution
  }

  async create(
    data: Pick<InstitutionPayload, 'name' | 'level' | 'area' | 'createdBy'>,
  ) {
    const [row] = await this.db.insert(Institution).values(data).returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<
        InstitutionPayload,
        'name' | 'level' | 'area' | 'updatedBy' | 'active'
      >
    >,
  ) {
    const result = await this.db
      .update(Institution)
      .set(data)
      .where(eq(Institution.uid, uid))
      .returning()
    return result[0]
  }
}
