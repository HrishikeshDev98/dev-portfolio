import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'

/**
 * Split a markdown document into overlapping chunks using LangChain's
 * markdown-aware recursive splitter. The splitter prefers to break on markdown
 * structure (headings, lists, paragraphs) before falling back to characters,
 * which keeps each chunk semantically coherent.
 *
 * For short files this may emit a single chunk — that's expected and fine.
 */
export async function chunkMarkdown(text: string): Promise<string[]> {
  // Strip HTML comments (<!-- ... -->) — these are author notes, not content
  // about the portfolio owner, so they shouldn't be embedded or retrieved.
  const cleaned = text.replace(/<!--[\s\S]*?-->/g, '')

  const splitter = RecursiveCharacterTextSplitter.fromLanguage('markdown', {
    chunkSize: 800,
    chunkOverlap: 300,
  })

  const chunks: string[] = await splitter.splitText(cleaned)
  // Drop empties / whitespace-only fragments.
  return chunks.map((c: string) => c.trim()).filter((c: string) => c.length > 0)
}
