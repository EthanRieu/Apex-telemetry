// Classes écrites en entier : Tailwind ne détecte pas les classes construites dynamiquement
const VARIANTS = {
  primary: 'bg-signal-600 text-ink hover:bg-signal-700 active:bg-signal-700',
  secondary: 'border border-carbon-600 text-ink hover:border-ink-muted hover:bg-carbon-800',
  ghost: 'text-ink-muted hover:bg-carbon-800 hover:text-ink',
}

const SIZES = {
  md: 'min-h-11 px-4 text-base',
  lg: 'min-h-12 px-6 text-lg',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  // Un lien qui ressemble à un bouton : il change d'écran, il ne déclenche pas d'action
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}
