import { useId } from 'react'

export default function TextField({
  label,
  hint,
  error,
  type = 'text',
  required = false,
  className = '',
  ...inputProps
}) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  // Le lecteur d'écran lit l'aide et l'erreur en plus du libellé
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="font-semibold">
        {label}
        {required && (
          <span className="text-ink-muted" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={
          'min-h-12 w-full rounded-lg border bg-carbon-900 px-4 text-base text-ink transition-colors ' +
          'placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-50 ' +
          (error ? 'border-danger' : 'border-carbon-600 hover:border-ink-muted')
        }
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
