import { SessionManager, UserPasswordManager } from '@sigep/auth'
import {
  type Db,
  type PersonPayload,
  User,
  type UserPayload,
  type UserRecord,
} from '@sigep/db'
import { eq, sql, type SQL } from 'drizzle-orm'
import { compact, isEmpty, isNil, set } from 'lodash-es'
import { fieldsToColumns } from '~/helpers/fieldsToColumns'
import type { TStringFilter } from '~/helpers/filter-inputs'
import { stringCondition } from '~/helpers/gqlFiltersToDrizzleFilters'
import { hashAndSaltFromPassword } from '~/helpers/hashAndSaltFromPassword'

type FindManyWhereFilters = {
  name?: TStringFilter
  active?: boolean
}

type FindManyLimitParams = {
  offset?: number
  limit?: number
}
export type UserCreatePayload = Pick<UserPayload, 'name' | 'password'> &
  Pick<PersonPayload, 'dni' | 'firstName' | 'lastName'>
type UserSelectField = keyof typeof User.$inferSelect

export class UserModel {
  constructor(protected db: Db) {}

  async findMany<Fields extends Array<UserSelectField>>(data?: {
    where?: FindManyWhereFilters & FindManyLimitParams
    fields?: Fields
  }): Promise<Array<Pick<UserRecord, Fields[number]>>> {
    const { fields, where } = data ?? {}
    const { active, name, offset, limit } = where ?? {}
    const filters: SQL[] = compact([
      !isNil(active) ? eq(User.active, active) : null,
      ...(name ? stringCondition(User.name, name) : []),
    ])

    const result = await this.db.query.User.findMany({
      where: (_, operators) => operators.and(...filters),
      columns: fieldsToColumns(fields as string[]),
      offset,
      limit,
    })
    return result
  }

  async findUnique<Fields extends Array<UserSelectField>>(
    uid: string,
    fields?: Array<keyof typeof User.$inferSelect>,
  ): Promise<Pick<UserRecord, Fields[number]> | undefined> {
    const a = await this.db.query.User.findFirst({
      where: (fields, operators) => operators.eq(fields.uid, uid),
      columns: fieldsToColumns(fields as string[]),
      with: {
        person: true,
      },
    })
    return a
  }

  async findUniqueOrThrow<Fields extends Array<UserSelectField>>(
    uid: string,
    fields?: Array<keyof typeof User.$inferSelect>,
  ): Promise<Pick<UserRecord, Fields[number]>> {
    const institution = await this.findUnique(uid, fields)
    if (!institution) throw new Error('institution record not found')
    return institution
  }

  async create(
    data: Pick<UserPayload, 'name' | 'password' | 'personUid'>,
  ) {
    const { hash, salt } = hashAndSaltFromPassword(data.password)
    const [row] = await this.db
      .insert(User)
      .values({
        name: data.name,
        password: hash,
        personUid: data.personUid,
        salt,
        // createdBy: data.createdBy,
      })
      .returning()
    return row
  }

  async update(
    uid: string,
    data: Partial<
      Pick<UserPayload, 'name' | 'password' | 'active'>
    >,
  ) {
    const { password } = data
    let hash: string | undefined = undefined
    let salt: string | undefined = undefined
    if (password) {
      const result = hashAndSaltFromPassword(password)
      hash = result.hash
      salt = result.salt
    }
    const result = await this.db
      .update(User)
      .set({
        name: data.name,
        // updatedBy: data.updatedBy,
        active: data.active,
        password: hash,
        salt,
      })
      .where(eq(User.uid, uid))
      .returning()
    return result[0]
  }
}
