import Anthropic from '@anthropic-ai/sdk'

import { CHAT_MODEL, OWNER_NAME } from '@/lib/rag/config'
import { consumeMessage, getClientIp } from '@/lib/rag/rate-limit'
import { retrieve } from '@/lib/rag/retrieve'

// Mongo + Anthropic need the Node runtime (not edge). Always dynamic.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const anthropic = new Anthropic() // reads ANTHROPIC_API_KEY from env

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function buildSystemPrompt(context: string): string {
  return [
    `You are the friendly AI assistant on ${OWNER_NAME}'s developer portfolio website.`,
    `Answer visitors' questions about ${OWNER_NAME} using ONLY the context below, which comes from ${OWNER_NAME}'s own notes.`,
    '',
    'Rules:',
    `- If the answer isn't in the context, say you don't have that information and suggest reaching out via the contact section. Never invent details.`,
    `- Be concise and conversational. Refer to ${OWNER_NAME} in the third person.`,
    `- Don't mention "the context" or that you're reading from notes — just answer naturally.`,
    '',
    'Context:',
    '---',
    context || '(No knowledge has been indexed yet.)',
    '---',
  ].join('\n')
}

export async function POST(req: Request): Promise<Response> {
  let messages: ChatMessage[]
  try {
    const body = (await req.json()) as { messages?: unknown }
    messages = Array.isArray(body.messages)
      ? (body.messages as ChatMessage[])
          .filter(
            (m) =>
              m &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string' &&
              m.content.trim().length > 0,
          )
          .slice(-10) // bound history to keep token usage in check
      : []
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user')
  if (!lastUser) {
    return Response.json({ error: 'No user message provided.' }, { status: 400 })
  }

  // Enforce the persistent per-IP message limit (one message = one POST).
  const ip = getClientIp(req)
  try {
    const rl = await consumeMessage(ip)
    if (!rl.allowed) {
      return Response.json(
        {
          error: `You've reached the limit of ${rl.limit} messages. Please try again later, or reach out to ${OWNER_NAME} via the contact section.`,
        },
        { status: 429, headers: { 'Retry-After': '3600' } },
      )
    }
  } catch (err) {
    // Fail open: don't break chat if the rate-limit store is unavailable.
    console.error('Rate limit check failed:', err)
  }

  // Retrieve relevant chunks. Degrade gracefully if the index isn't ready.
  let context = ''
  try {
    const chunks = await retrieve(lastUser.content)
    context = chunks.map((c) => `[${c.source}]\n${c.text}`).join('\n\n')
  } catch (err) {
    console.error('RAG retrieval failed:', err)
  }

  const system = buildSystemPrompt(context)

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const claudeStream = anthropic.messages.stream({
          model: CHAT_MODEL,
          max_tokens: 1024,
          system,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        })

        for await (const event of claudeStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } catch (err) {
        console.error('Claude streaming failed:', err)
        controller.enqueue(encoder.encode('\n\nSorry — something went wrong on my end.'))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
