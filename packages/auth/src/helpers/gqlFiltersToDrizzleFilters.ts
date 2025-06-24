import { eq, ilike, type Column } from 'drizzle-orm'
import type { TStringFilter } from './filter-inputs'

type StringFilterExpressions = keyof TStringFilter

export function stringCondition(column: Column, filter: TStringFilter) {
  const expressions = Object.keys(filter) as StringFilterExpressions[]
  const arr = []
  for (const expression of expressions) {
    if (typeof filter[expression] === 'string') {
      arr.push({
        operator: castExpressionToOperator(expression),
        column: column,
        value: filter[expression] as string,
      })
    }
  }
  return arr.map((a) => a.operator.call(null, a.column, a.value))
}

export function castExpressionToOperator(expression: StringFilterExpressions) {
  switch (expression) {
    case 'equals':
      return eq
    case 'contains':
      return stringContains
    case 'endsWith':
      return stringEndsWith
    case 'startsWith':
      return stringStartsWith
  }
}

export function stringStartsWith(column: Column, value: string) {
  return ilike(column, `${value}%`)
}

export function stringContains(column: Column, value: string) {
  return ilike(column, `%${value}%`)
}

export function stringEndsWith(column: Column, value: string) {
  return ilike(column, `%${value}`)
}
