# DNS Hack for MongoDB Atlas SRV Resolution

## Problem

MongoDB Atlas uses SRV DNS records (`_mongodb._tcp.cluster0.xxx.mongodb.net`) for connection strings (`mongodb+srv://`).
Some ISPs fail to resolve these SRV records, causing:

```
Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.05c73mu.mongodb.net
```

MongoDB Compass may still work because it handles DNS differently or uses a cached lookup.

## Fix

Create `src/instrumentation.ts` — Next.js runs this at server startup before any DB connection is made:

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { setServers } = await import('node:dns/promises')
    await setServers(['1.1.1.1', '8.8.8.8'])
  }
}
```

- `1.1.1.1` — Cloudflare DNS
- `8.8.8.8` — Google DNS
- The `NEXT_RUNTIME === 'nodejs'` guard prevents webpack from trying to bundle `node:dns/promises` (a Node.js built-in), which would throw `UnhandledSchemeError: Reading from "node:dns/promises" is not handled by plugins`
- The dynamic `import()` is required for the same reason — static imports break the build

## When to use

Re-add this file if MongoDB Atlas connection fails with `querySrv ECONNREFUSED` in a new environment (different machine, CI, VPS) where the system DNS doesn't resolve SRV records.

## Permanent alternatives

- Change system DNS to `1.1.1.1` / `8.8.8.8` at the OS or router level
- Use a standard `mongodb://` connection string with explicit host:port instead of `mongodb+srv://`
