import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from '@remix-run/cloudflare'

export type TypedLoader<T = unknown> = (
  args: LoaderFunctionArgs,
) => Promise<T> | T

export type TypedAction<T = unknown> = (
  args: ActionFunctionArgs,
) => Promise<T> | T
