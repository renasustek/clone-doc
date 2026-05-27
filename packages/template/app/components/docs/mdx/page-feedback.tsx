import { ThumbsUp, ThumbsDown } from 'lucide-react'

export function PageFeedback() {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground">
      <span>Was this page helpful?</span>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium">
          <ThumbsUp className="h-3.5 w-3.5" />
          Yes
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium">
          <ThumbsDown className="h-3.5 w-3.5" />
          No
        </button>
      </div>
    </div>
  )
}
