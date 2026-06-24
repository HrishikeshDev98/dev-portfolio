import { type Collection, MongoClient } from 'mongodb'

import {
  type ChunkDoc,
  CHUNKS_COLLECTION,
  RATE_LIMIT_COLLECTION,
  RATE_LIMIT_WINDOW_SECONDS,
  type RateLimitDoc,
} from './config'

/**
 * A single cached MongoClient connection, reused across hot reloads and
 * serverless invocations. Uses the same DATABASE_URI that Payload connects to,
 * but a separate native driver client so we can run $vectorSearch aggregations
 * and manage Atlas Search indexes directly.
 */

// Cache on globalThis so Next.js dev hot-reload doesn't open a new pool each time.
const globalForMongo = globalThis as unknown as {
  _ragMongoClient?: Promise<MongoClient>
}

function clientPromise(): Promise<MongoClient> {
  const uri = process.env.DATABASE_URI
  if (!uri) {
    throw new Error('DATABASE_URI is not set — required for the RAG assistant.')
  }
  if (!globalForMongo._ragMongoClient) {
    globalForMongo._ragMongoClient = new MongoClient(uri).connect()
  }
  return globalForMongo._ragMongoClient
}

export async function getChunksCollection(): Promise<Collection<ChunkDoc>> {
  const client = await clientPromise()
  // db() uses the database named in the connection string.
  return client.db().collection<ChunkDoc>(CHUNKS_COLLECTION)
}

// Lazily create the rate-limit collection + TTL index once per process.
let rateLimitColl: Promise<Collection<RateLimitDoc>> | null = null

export function getRateLimitCollection(): Promise<Collection<RateLimitDoc>> {
  if (!rateLimitColl) {
    rateLimitColl = (async () => {
      const client = await clientPromise()
      const coll = client.db().collection<RateLimitDoc>(RATE_LIMIT_COLLECTION)
      // TTL index: each IP's record is removed RATE_LIMIT_WINDOW_SECONDS after
      // createdAt, which resets that IP's message count. createIndex is
      // idempotent, so this is safe to call on every cold start.
      await coll.createIndex({ createdAt: 1 }, { expireAfterSeconds: RATE_LIMIT_WINDOW_SECONDS })
      return coll
    })()
  }
  return rateLimitColl
}
