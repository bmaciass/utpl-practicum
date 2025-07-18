export const IS_PRODUCTION = process.env.ENVIRONMENT === 'production'
export const IS_DEVELOPMENT = process.env.ENVIRONMENT === 'development'

export const API_URL = IS_PRODUCTION
  ? 'https://api.utpl-practicum.com/graphql'
  : 'http://localhost:6002/graphql'
