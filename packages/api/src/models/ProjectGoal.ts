import {
  type Db,
  ProjectGoal,
  type ProjectGoalPayload,
  type ProjectGoalRecord,
} from '@sigep/db'
import { type SQL, eq } from 'drizzle-orm'
import { compact, isNil } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'

type FindManyWhereFilters = {
  projectUid?: string
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}

type ProjectGoalSelectField = keyof typeof ProjectGoal.$inferSelect

export class ProjectGoalModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<ProjectGoalSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<ProjectGoalRecord, Fields[number]>>> {
    const { fields, where } = data ?? {}
    const { active, projectUid, offset, limit } = where ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(ProjectGoal.active, active) : null,
      !isNil(projectUid) ? eq(ProjectGoal.projectUid, projectUid) : null,
    ])

    const result = await this.db.query.ProjectGoal.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      offset,
      limit,
    })
    return result
  }

  async findUnique<Fields extends Array<ProjectGoalSelectField>>(
    uid: string,
    fields?: Fields,
  ): Promise<Pick<ProjectGoalRecord, Fields[number]> | undefined> {
    const projectGoal = await this.db.query.ProjectGoal.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
    })
    return projectGoal
  }

  async findUniqueOrThrow<Fields extends Array<ProjectGoalSelectField>>(
    uid: string,
    fields?: Array<keyof typeof ProjectGoal.$inferSelect>,
  ): Promise<Pick<ProjectGoalRecord, Fields[number]>> {
    const projectGoal = await this.findUnique(uid, fields)
    if (!projectGoal) throw new Error('project goal record not found')
    return projectGoal
  }

  async create(
    data: Pick<
      ProjectGoalPayload,
      'name' | 'startDate' | 'endDate' | 'status' | 'projectUid' | 'createdBy'
    >,
  ) {
    const [row] = await this.db.insert(ProjectGoal).values(data).returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<
        ProjectGoalPayload,
        | 'name'
        | 'startDate'
        | 'endDate'
        | 'status'
        | 'projectUid'
        | 'updatedBy'
        | 'active'
      >
    >,
  ) {
    const result = await this.db
      .update(ProjectGoal)
      .set(data)
      .where(eq(ProjectGoal.uid, uid))
      .returning()
    return result[0]
  }
}
