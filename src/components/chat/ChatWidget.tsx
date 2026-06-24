'use client'

import { useEffect, useRef, useState } from 'react'

import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const history: Msg[] = [...messages, { role: 'user', content: text }]
    // Optimistically render the user turn + an empty assistant turn to fill.
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok) {
        // Surface the server's message (e.g. the per-IP limit notice).
        const data = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        const serverMsg = data?.error ?? 'Sorry, something went wrong. Please try again.'
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: serverMsg }
          return copy
        })
        return
      }
      if (!res.body) throw new Error('server')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const copy = [...prev]
          const last = copy[copy.length - 1]
          copy[copy.length - 1] = { role: 'assistant', content: last.content + chunk }
          return copy
        })
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Sorry, I could not reach the server. Please try again.',
        }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  return (
    <>
      {/* Launcher button */}
      <button
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#38228B] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
          open ? '' : 'chat-glow'
        }`}
      >
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </button>

      {/* Backdrop — dims the page and closes the chat on outside click */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 left-5 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-primary text-light shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#04071d] px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#38228B] text-light">
              <FiMessageSquare size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-light">Ask about Hrishikesh</p>
              <p className="text-xs leading-tight text-light/50">AI assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-light/70">
                Hi! Ask me anything about Hrishikesh — his skills, experience, or projects.
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={
                    'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ' +
                    (m.role === 'user'
                      ? 'rounded-br-sm bg-[#38228B] text-light'
                      : 'rounded-bl-sm border border-white/10 bg-white/5 text-light/90')
                  }
                >
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="border-t border-white/10 bg-[#04071d] p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Type your question…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-light outline-none transition-colors placeholder:text-light/40 focus:border-secondary focus:ring-1 focus:ring-secondary/40"
              />
              <button
                aria-label="Send message"
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#38228B] text-light transition hover:bg-[#46299f] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
