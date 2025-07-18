// src/types/env.d.ts
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv extends Cloudflare.Env {}
}
