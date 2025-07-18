import { isEmpty } from 'lodash-es'

export function fieldsToColumns(fields: string[]) {
  const columns =
    fields && !isEmpty(fields)
      ? fields.reduce(
          (acc, field) => {
            acc[field] = true
            return acc
          },
          {} as Record<string, boolean>,
        )
      : undefined

  return columns
}
