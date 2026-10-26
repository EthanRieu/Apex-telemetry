import { useId } from 'react'

export default function SelectField({ label, options, className = '', ...selectProps }) {
  const id = useId()

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink-muted">
        {label}
      </label>
      <select
        id={id}
        className="min-h-11 w-full rounded-lg border border-carbon-600 bg-carbon-900 px-3 text-base text-ink transition-colors hover:border-ink-muted"
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
