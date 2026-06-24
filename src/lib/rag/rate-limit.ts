import { MESSAGE_LIMIT_PER_IP } from './config'
import { getRateLimitCollection } from './mongo'

/**
 * Best-effort client IP from proxy headers. Cloudflare (you use CF) sets
 * cf-connecting-ip; most other proxies set x-forwarded-for (client is first).
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export interface RateLimitResult {
  allowed: boolean
  count: number
  remaining: number
  limit: number
}

/**
 * Atomically count one message for this IP and report whether it's within the
 * limit. The first message for an IP stamps createdAt, which the TTL index uses
 * to expire (and thereby reset) the record after the configured window.
 */
export async function consumeMessage(ip: string): Promise<RateLimitResult> {
  const coll = await getRateLimitCollection()

  const doc = await coll.findOneAndUpdate(
    { _id: ip },
    {
      $inc: { count: 1 },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true, returnDocument: 'after' },
  )

  const count = doc?.count ?? 1
  return {
    allowed: count <= MESSAGE_LIMIT_PER_IP,
    count,
    remaining: Math.max(0, MESSAGE_LIMIT_PER_IP - count),
    limit: MESSAGE_LIMIT_PER_IP,
  }
}
