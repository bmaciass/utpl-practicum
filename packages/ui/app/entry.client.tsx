/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { InMemoryCache } from "@apollo/client/cache/index.js";
import { ApolloClient, HttpLink } from "@apollo/client/core/index.js";
import { ApolloProvider } from "@apollo/client/react/index.js";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { apiClient } from './apollo/apiClient'

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ApolloProvider client={apiClient}>
        <RemixBrowser />
      </ApolloProvider>
    </StrictMode>
  );
});
