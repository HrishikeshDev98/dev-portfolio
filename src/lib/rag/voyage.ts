import { EMBED_DIMENSIONS, VOYAGE_MODEL } from './config'

const VOYAGE_URL = 'https://api.voyageai.com/v1/embeddings'

// Voyage accepts many inputs per request; batch to stay well within limits.
const BATCH_SIZE = 96

interface VoyageResponse {
  data: { index: number; embedding: number[] }[]
}

/**
 * Embed an array of texts with Voyage AI.
 *
 * @param inputType "document" when embedding stored chunks, "query" when
 *   embedding a user's question. Voyage uses this to improve retrieval quality,
 *   so it must be set correctly on each side.
 */
export async function embed(texts: string[], inputType: 'document' | 'query'): Promise<number[][]> {
  // Accept either VOYAGE_API_KEY (conventional) or VOYAGE_API (already in .env).
  const apiKey = process.env.VOYAGE_API_KEY ?? process.env.VOYAGE_API
  if (!apiKey) {
    throw new Error('VOYAGE_API_KEY (or VOYAGE_API) is not set — required for embeddings.')
  }
  if (texts.length === 0) return []

  const out: number[][] = []

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE)

    const res = await fetch(VOYAGE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: batch,
        model: VOYAGE_MODEL,
        input_type: inputType,
        output_dimension: EMBED_DIMENSIONS,
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(`Voyage API error ${res.status}: ${detail}`)
    }

    const json = (await res.json()) as VoyageResponse
    // Sort by index to guarantee alignment with the input order.
    json.data.sort((a, b) => a.index - b.index).forEach((d) => out.push(d.embedding))
  }

  return out
}
