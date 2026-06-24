/**
 * Shared configuration for the portfolio RAG assistant.
 */

// Mongo collection that stores embedded chunks.
export const CHUNKS_COLLECTION = 'rag_chunks'

// Atlas Vector Search index name (created by `pnpm reindex`).
export const VECTOR_INDEX = 'rag_vector_index'

// Voyage embedding model + dimensions. voyage-3.5-lite is cheap, fast, and on
// the free tier. Output dimension must match the Atlas index definition.
export const VOYAGE_MODEL = 'voyage-3.5-lite'
export const EMBED_DIMENSIONS = 1024

// Claude model used to answer. Haiku 4.5 is fast and inexpensive — plenty for
// Q&A over a small fixed context.
export const CHAT_MODEL = 'claude-haiku-4-5'

// How many chunks to retrieve per question.
export const RETRIEVE_K = 5

// The portfolio owner's name, used in the assistant's system prompt.
export const OWNER_NAME = 'Hrishikesh'

// --- Rate limiting --------------------------------------------------------
// Max messages a single IP may send before being blocked.
export const MESSAGE_LIMIT_PER_IP = 4
// Mongo collection that tracks per-IP message counts.
export const RATE_LIMIT_COLLECTION = 'rag_rate_limits'
// A per-IP record auto-expires this many seconds after the IP's first message
// (TTL index), which resets that IP's count. 24h.
export const RATE_LIMIT_WINDOW_SECONDS = 24 * 60 * 60

export interface ChunkDoc {
  source: string // file name, e.g. "about.md"
  chunkIndex: number // position within the file
  text: string
  embedding: number[]
}

export interface RateLimitDoc {
  _id: string // the client IP
  count: number
  createdAt: Date // when this IP's window started (drives TTL expiry)
}
