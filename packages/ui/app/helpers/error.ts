export function error(message: string, status: number): never {
  throw new Response(message, { status })
}
