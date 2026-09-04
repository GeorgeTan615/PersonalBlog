import { profile } from "@/content/profile"

const ARROW = { up: "▲", down: "▼", flat: "·" } as const
const TONE = {
  up: "text-up",
  down: "text-down",
  flat: "text-ink-3",
} as const

/**
 * A market-strip of facts about George rather than a fake price feed —
 * it borrows the form of a ticker without pretending to be live data.
 *
 * The item list is rendered twice so the -50% translate loops seamlessly.
 */
export function Ticker() {
  const items = profile.ticker

  return (
    <div
      className="overflow-hidden border-b border-rule bg-bg-2 select-none"
      aria-hidden="true"
    >
      <div className="flex w-max animate-tape">
        {[0, 1].map((pass) => (
          <div className="flex" key={pass}>
            {items.map((item) => (
              <span
                key={`${pass}-${item.symbol}`}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-rule px-4 py-1.5 font-mono text-2xs tracking-wider"
              >
                <b className="font-medium text-ink">{item.symbol}</b>
                <span className={TONE[item.dir]}>
                  {ARROW[item.dir]} {item.note}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
