'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TOCItemType } from 'fumadocs-core/toc'

interface DocsTOCProps {
  toc: TOCItemType[]
}

export function DocsTOC({ toc }: DocsTOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  if (!toc || toc.length === 0) return null

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <nav className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto">
        <p className="flex items-center gap-1.5 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
            <path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
          On this page
        </p>
        <ul className="space-y-0.5 text-sm">
          {toc.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className={cn(
                  'block py-1 transition-colors',
                  item.depth === 3 && 'pl-4',
                  activeId === item.url.slice(1)
                    ? 'text-[var(--accent)] font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
