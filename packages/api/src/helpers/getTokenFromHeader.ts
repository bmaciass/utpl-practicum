export function getTokenFromHeader(request: Request): string | undefined {
  const authStr = request.headers.get('authorization')

  return authStr ?? undefined
}
