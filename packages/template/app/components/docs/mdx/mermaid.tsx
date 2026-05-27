'use client'

import { useEffect, useId, useRef } from 'react'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, '')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    async function render() {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        fontFamily: 'inherit',
        flowchart: { curve: 'basis' },
      })

      const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim())
      if (ref.current) {
        ref.current.innerHTML = svg
      }
    }

    render().catch(console.error)
  }, [chart, id])

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto rounded-lg border border-border bg-card p-4"
    />
  )
}
