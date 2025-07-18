import { redirect, type LoaderFunction, type MetaFunction, type TypedResponse } from "@remix-run/cloudflare";
import { useEffect } from "react";
import { getAccessTokenCookie } from "~/cookies/access-token.server";
import { TokenManager } from "~/helpers/TokenManager";
import { withAuth } from "~/helpers/withAuth";
import { TypedLoader } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = withAuth(async () => {
  return redirect('/home')
})

export default function Index () {
  return null
}
