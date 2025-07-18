export function notFound(message: string): never {
  throw new Response(message, { status: 404, statusText: 'Not Found' })
}
