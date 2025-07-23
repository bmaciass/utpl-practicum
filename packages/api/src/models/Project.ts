import {
  type Db,
  Project,
  type ProjectGoalRecord,
  type ProjectPayload,
  type ProjectRecord,
} from '@sigep/db'
import { eq, type SQL } from 'drizzle-orm'
import { compact, isNil } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'
import type { Except } from 'type-fest'

type AugmentedProject = ProjectRecord & {
  goals: ProjectGoalRecord[]
}

type Entities = Except<AugmentedProject, keyof ProjectRecord>

type FindManyWhereFilters = {
  programUid?: string
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type ProjectSelectField = keyof typeof Project.$inferSelect

export class ProjectModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<ProjectSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<ProjectRecord, Fields[number]> & Entities>> {
    const { fields, where } = data ?? {}
    const { active, programUid: programId, offset, limit } = where ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(Project.active, active) : null,
      !isNil(programId) ? eq(Project.programUid, programId) : null,
    ])

    const result = await this.db.query.Project.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      with: { goals: true }, // FIXME: may be dynamic
      offset,
      limit,
    })
    return result
  }

  async findUnique<
    Fields extends Array<ProjectSelectField>,
    Includes extends Array<keyof Entities>,
  >(
    uid: string,
    fields?: Fields,
    include?: Includes,
  ): Promise<(Pick<ProjectRecord, Fields[number]> & Entities) | undefined> {
    const project = await this.db.query.Project.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
      with: { goals: true }, // FIXME: may be dynamic
    })
    return project
  }

  async findUniqueOrThrow<
    Fields extends Array<ProjectSelectField>,
    Includes extends Array<keyof Entities>,
  >(
    uid: string,
    fields?: Fields,
    include?: Includes,
  ): Promise<Pick<ProjectRecord, Fields[number]>> {
    const project = await this.findUnique(uid, fields)
    if (!project) throw new Error('project record not found')
    return project
  }

  async create(
    data: Pick<
      ProjectPayload,
      | 'name'
      | 'description'
      | 'status'
      | 'createdBy'
      | 'startDate'
      | 'endDate'
      | 'programUid'
      | 'responsibleUid'
    >,
  ) {
    const [row] = await this.db.insert(Project).values(data).returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<
        ProjectPayload,
        | 'name'
        | 'description'
        | 'status'
        | 'updatedBy'
        | 'startDate'
        | 'endDate'
        | 'programUid'
        | 'responsibleUid'
        | 'active'
      >
    >,
  ) {
    const [row] = await this.db
      .update(Project)
      .set(data)
      .where(eq(Project.uid, uid))
      .returning()
    return row
  }
}
