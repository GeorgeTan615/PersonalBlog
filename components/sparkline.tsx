type SparklineProps = {
  /** Unique per instance — used for the gradient's id. */
  id: string
  values: number[]
  width?: number
  height?: number
  strokeWidth?: number
  /** Draw the terminal dot. Off for ambient/background use. */
  endpoint?: boolean
  padX?: number
  padY?: number
  className?: string
  /** Stretch to the container instead of rendering at natural size. */
  fluid?: boolean
}

/**
 * A single-series line with a soft area fill and an emphasised endpoint.
 *
 * Rendered entirely on the server: the path length is summed exactly from
 * the polyline segments and handed to CSS as `--len`, so the draw-on-scroll
 * animation needs no client-side JS beyond the shared IntersectionObserver.
 *
 * Colour comes from `currentColor`, so a parent's text colour themes it.
 */
export function Sparkline({
  id,
  values,
  width = 120,
  height = 42,
  strokeWidth = 2,
  endpoint = true,
  padX = 2,
  padY = 5,
  className = "",
  fluid = false,
}: SparklineProps) {
  if (values.length < 2) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const innerW = width - padX * 2
  const innerH = height - padY * 2

  const points = values.map((v, i): [number, number] => [
    padX + (i / (values.length - 1)) * innerW,
    padY + innerH - ((v - min) / span) * innerH,
  ])

  const line = points
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ")

  const area = `${line} L${points[points.length - 1][0].toFixed(2)} ${height} L${points[0][0].toFixed(2)} ${height} Z`

  // Exact for a polyline, so the dash never under- or over-runs.
  const length = points.reduce((total, [x, y], i) => {
    if (i === 0) return 0
    const [px, py] = points[i - 1]
    return total + Math.hypot(x - px, y - py)
  }, 0)

  const last = points[points.length - 1]
  const gradientId = `spark-${id}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={fluid ? "100%" : width}
      height={fluid ? "100%" : height}
      preserveAspectRatio={fluid ? "none" : "xMidYMid meet"}
      className={className}
      style={{ ["--len" as string]: Math.ceil(length) + 1 }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill={`url(#${gradientId})`} stroke="none" className="draw-fill" />

      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-line"
      />

      {endpoint && (
        <circle
          cx={last[0].toFixed(2)}
          cy={last[1].toFixed(2)}
          r={Math.max(2.5, strokeWidth * 1.5)}
          fill="currentColor"
          className="draw-dot"
        />
      )}
    </svg>
  )
}
