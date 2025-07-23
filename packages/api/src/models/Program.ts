import {
  type Db,
  type PersonRecord,
  Program,
  type ProgramPayload,
  type ProgramRecord,
  type ProjectGoalRecord,
  type ProjectRecord,
  type UserRecord,
} from '@sigep/db'
import { type SQL, eq } from 'drizzle-orm'
import { compact, isNil } from 'lodash-es'
import type { Except } from 'type-fest'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'
import type { TStringFilter } from '~/helpers/filter-inputs'
import { stringCondition } from '~/helpers/gqlFiltersToDrizzleFilters'

type AugmentedProgram = ProgramRecord & {
  projects: (ProjectRecord & { goals: ProjectGoalRecord[] })[]
  responsible: UserRecord & { person: PersonRecord }
}

type Entities = Except<AugmentedProgram, keyof ProgramRecord>

type FindManyWhereFilters = {
  name?: TStringFilter
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type ProgramSelectField = keyof typeof Program.$inferSelect

export class ProgramModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<ProgramSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<ProgramRecord, Fields[number]> & Entities>> {
    const { fields, where } = data ?? {}
    const { active, name, offset, limit } = where ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(Program.active, active) : null,
      ...(name ? stringCondition(Program.name, name) : []),
    ])

    const result = await this.db.query.Program.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      with: {
        projects: { with: { goals: true } },
        responsible: { with: { person: true } },
      }, // FIXME: may be dynamic
      offset,
      limit,
    })
    return result
  }

  async findUnique<
    Fields extends Array<ProgramSelectField>,
    Includes extends Array<keyof Entities>,
  >(
    uid: string,
    fields?: Array<keyof typeof Program.$inferSelect>,
    include?: Includes,
  ): Promise<(Pick<ProgramRecord, Fields[number]> & Entities) | undefined> {
    const a = await this.db.query.Program.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
      with: {
        projects: { with: { goals: true } },
        responsible: { with: { person: true } },
      }, // FIXME: may be dynamic
    })
    return a
  }

  async findUniqueOrThrow<Fields extends Array<ProgramSelectField>>(
    uid: string,
    fields?: Array<keyof typeof Program.$inferSelect>,
  ): Promise<Pick<ProgramRecord, Fields[number]>> {
    const institution = await this.findUnique(uid, fields)
    if (!institution) throw new Error('institution record not found')
    return institution
  }

  async create(
    data: Pick<
      ProgramPayload,
      | 'name'
      | 'description'
      | 'responsibleUid'
      | 'createdBy'
      | 'startDate'
      | 'endDate'
    >,
  ) {
    const [row] = await this.db
      .insert(Program)
      .values({ ...data, description: data.description ?? null })
      .returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<
        ProgramPayload,
        | 'name'
        | 'description'
        | 'responsibleUid'
        | 'updatedBy'
        | 'startDate'
        | 'endDate'
        | 'active'
      >
    >,
  ) {
    const [row] = await this.db
      .update(Program)
      .set(data)
      .where(eq(Program.uid, uid))
      .returning()
    return row
  }
}
