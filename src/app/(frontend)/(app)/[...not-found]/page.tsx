import { notFound } from 'next/navigation'

// Catch-all for any unmatched route. Because the app uses multiple root layouts
// (route groups, no top-level app/layout.tsx), unmatched URLs would otherwise
// render Next's bare default 404. Funnelling them through notFound() here makes
// them render the styled not-found.tsx within this group's layout (Header/Footer).
export default function CatchAllNotFound() {
  notFound()
}
