import {
  type Db,
  InstitutionalPlan,
  type InstitutionalPlanPayload,
  type InstitutionalPlanRecord,
} from '@sigep/db'
import { eq, sql, type SQL } from 'drizzle-orm'
import { compact, isEmpty, isNil, set } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'

type FindManyWhereFilters = {
  institutionUid?: string
  year?: number
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type InstitutionalPlanSelectField = keyof typeof InstitutionalPlan.$inferSelect

export class InstitutionalPlanModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<InstitutionalPlanSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<InstitutionalPlanRecord, Fields[number]>>> {
    const { fields, where } = data ?? {}
    const { active, institutionUid, year, offset, limit } = where ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(InstitutionalPlan.active, active) : null,
      !isNil(institutionUid)
        ? eq(InstitutionalPlan.institutionUid, institutionUid)
        : null,
      !isNil(year) ? eq(InstitutionalPlan.year, year) : null,
    ])

    const result = await this.db.query.InstitutionalPlan.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      offset,
      limit,
    })
    return result
  }

  async findUnique<Fields extends Array<InstitutionalPlanSelectField>>(
    uid: string,
    fields?: Array<keyof typeof InstitutionalPlan.$inferSelect>,
  ): Promise<Pick<InstitutionalPlanRecord, Fields[number]> | undefined> {
    return await this.db.query.InstitutionalPlan.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
    })
  }

  async findUniqueOrThrow<Fields extends Array<InstitutionalPlanSelectField>>(
    uid: string,
    fields?: Array<keyof typeof InstitutionalPlan.$inferSelect>,
  ): Promise<Pick<InstitutionalPlanRecord, Fields[number]>> {
    const institution = await this.findUnique(uid, fields)
    if (!institution) throw new Error('institution record not found')
    return institution
  }

  async create(
    data: Pick<
      InstitutionalPlanPayload,
      'url' | 'version' | 'year' | 'institutionUid' | 'name' | 'createdBy'
    >,
  ) {
    const [row] = await this.db
      .insert(InstitutionalPlan)
      .values(data)
      .returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<
        InstitutionalPlanPayload,
        | 'url'
        | 'version'
        | 'year'
        | 'institutionUid'
        | 'name'
        | 'updatedBy'
        | 'active'
      >
    >,
  ) {
    const [row] = await this.db
      .update(InstitutionalPlan)
      .set(data)
      .where(eq(InstitutionalPlan.uid, uid))
      .returning()
    return row
  }
}
