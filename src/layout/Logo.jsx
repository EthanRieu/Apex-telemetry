export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
        <path d="M3 20 L12 4 L21 20" fill="none" strokeWidth="3" strokeLinejoin="round" className="stroke-ink" />
        <circle cx="12" cy="5" r="2.5" className="fill-signal-400" />
      </svg>
      <span className="font-display text-2xl font-bold tracking-wide uppercase">
        Apex<span className="text-signal-400">.</span>
      </span>
    </span>
  )
}
