import { RETRIEVE_K, VECTOR_INDEX } from './config'
import { getChunksCollection } from './mongo'
import { embed } from './voyage'

export interface RetrievedChunk {
  source: string
  text: string
  score: number
}

/**
 * Embed the query and run an Atlas $vectorSearch to find the most relevant
 * chunks. Returns [] if the index/collection isn't ready yet (e.g. before the
 * first `pnpm reindex`), so callers can degrade gracefully.
 */
export async function retrieve(query: string, k: number = RETRIEVE_K): Promise<RetrievedChunk[]> {
  const [queryVector] = await embed([query], 'query')
  if (!queryVector) return []

  const collection = await getChunksCollection()

  const results = await collection
    .aggregate<RetrievedChunk>([
      {
        $vectorSearch: {
          index: VECTOR_INDEX,
          path: 'embedding',
          queryVector,
          numCandidates: Math.max(100, k * 10),
          limit: k,
        },
      },
      {
        $project: {
          _id: 0,
          source: 1,
          text: 1,
          score: { $meta: 'vectorSearchScore' },
        },
      },
    ])
    .toArray()

  return results
}
