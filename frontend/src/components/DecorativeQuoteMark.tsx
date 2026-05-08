import { useId } from 'react'
import { Quote,Star } from 'lucide-react'

/**
 * Large typographic quote using Tailwind gradient text (alternative to icon).
 */

export function DecorativeQuoteMark({ className = '' }) {
  const gradId = `quote-icon-grad-${useId().replace(/:/g, '')}`
  
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center opacity-95 ${className}`.trim()}
      aria-hidden
    >
      <svg
        className="pointer-events-none absolute size-0 overflow-hidden"
        width="0"
        height="0"
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="0.5"
            y1="1"
            x2="0.5"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#5B6CD7" />
            <stop offset="100%" stopColor="#D6DAF5" />
          </linearGradient>
        </defs>
      </svg>
      <Quote
        className="pointer-events-none h-full w-full [&_path]:stroke-none"
        fill={`url(#${gradId})`}
      />
    </span>

  )
}

export function DecorativeStarMark({ className = '' }) {
  const gradId2 = `star-icon-grad-${useId().replace(/:/g, '')}`
  
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center opacity-95 ${className}`.trim()}
      aria-hidden
    >
      <svg
        className="pointer-events-none absolute size-0 overflow-hidden"
        width="0"
        height="0"
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradId2}
            x1="0"
            y1=".5"
            x2="1"
            y2=".5"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#D6DAF5" />
            <stop offset="100%" stopColor="#5B6CD7" />
          </linearGradient>
        </defs>
      </svg>
      <Star
        className="pointer-events-none h-full w-full [&_path]:stroke-none"
        fill={`url(#${gradId2})`}
      />
    </span>

  )
}

