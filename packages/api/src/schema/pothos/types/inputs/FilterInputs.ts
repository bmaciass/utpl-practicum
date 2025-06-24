import type { TStringFilter } from '~/helpers/filter-inputs'
import builder from '~/schema/pothos/builder'

export const StringFilter = builder
  .inputRef<TStringFilter>('StringFilter')
  .implement({
    fields: (t) => ({
      contains: t.string(),
      endsWith: t.string(),
      equals: t.string(),
      startsWith: t.string(),
    }),
  })
