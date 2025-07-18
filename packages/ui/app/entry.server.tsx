/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import { isbot } from 'isbot'
import { renderToReadableStream } from 'react-dom/server'

const ABORT_DELAY = 5000

export default async function handleRequest (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) {
  let status = responseStatusCode
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY)

  const body = await renderToReadableStream(
    <RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
    />,
    {
      signal: controller.signal,
      onError (error: unknown) {
        if (!controller.signal.aborted) {
          // Log streaming rendering errors from inside the shell
          console.error(error)
        }
        status = 500
      },
    },
  )

  body.allReady.then(() => clearTimeout(timeoutId))

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  return new Response(body, {
    headers: responseHeaders,
    status,
  })
}

/*

const ABORT_DELAY = 5000
import { isbot } from 'isbot'
import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/index.js";
import { getDataFromTree } from "@apollo/client/react/ssr/index.js";
import { createElement } from 'react';

export default async function handleRequest (
  request: Request, // Request type from the Fetch API
  responseStatusCode: number,
  responseHeaders: Headers, // Headers type from the Fetch API
  remixContext: EntryContext
) {

  let statusCode = responseStatusCode

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY)

  console.log('cookie: ', request.headers.get('cookie'))

  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: "http://localhost:6002/graphql", // FIXME
      //request.headers as unknown as Record<string, string>,
      credentials: "include", // or "same-origin" if your backend server is the same domain
    }),
  });

  const App = (
    <ApolloProvider client={client}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  );

  // const content = await getDataFromTree(App);
  // const key = '<html lang="en">'
  // const headStringStart = content.indexOf(key) + key.length
  // const headStringEnd = content.indexOf('</html>')
  // const all = content.substring(headStringStart, headStringEnd)

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  // const JSX = createElement('html', { dangerouslySetInnerHTML: { __html: all } })

  // Extract the entirety of the Apollo Client cache's current state
  // const initialState = client.extract();

  const body = await renderToReadableStream(App,
    {
      signal: controller.signal,
      onError (error: unknown) {
        if (!controller.signal.aborted) {
          // Log streaming rendering errors from inside the shell
          console.error(error)
        }
        statusCode = 500
      },
    },
  )
  body.allReady.then(() => clearTimeout(timeoutId))

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady
  }

  // TODO: update everything below this line

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    status: statusCode,
    headers: responseHeaders,
  });
}

*/