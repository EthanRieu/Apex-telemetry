export default function FilterChip({ selected = false, count, disabled = false, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={
        'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ' +
        'disabled:cursor-not-allowed disabled:opacity-50 ' +
        (selected
          ? 'border-chrono-400 bg-chrono-400 text-carbon-950'
          : 'border-carbon-600 text-ink hover:border-ink-muted hover:bg-carbon-800')
      }
    >
      {children}
      {count !== undefined && (
        <span
          className={
            'rounded-full px-1.5 text-xs tabular-nums ' +
            (selected ? 'bg-carbon-950/15' : 'bg-carbon-700 text-ink-muted')
          }
        >
          {count}
        </span>
      )}
    </button>
  )
}
