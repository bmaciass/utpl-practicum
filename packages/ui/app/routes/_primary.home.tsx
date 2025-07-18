import { withAuth } from "~/helpers/withAuth"

export const loader = withAuth()

export default function Index () {
  return (
    <p>foo bar</p>
  )
}