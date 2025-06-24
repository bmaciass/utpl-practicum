import type { Plugin } from 'graphql-yoga'

export function useResponse(): Plugin {
  return {
    onResponse({ serverContext }) {
      // FIXME: Context should be typed
      ;(serverContext as any).client.end()
    },
  }
}
