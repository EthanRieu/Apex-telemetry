import Logo from './Logo.jsx'

const LINKS = [
  { route: 'sessions', label: 'Sessions' },
  { route: 'tarifs', label: 'Tarifs' },
]

const linkClass =
  'inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-ink-muted transition-colors hover:text-ink ' +
  'aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-signal-400 aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8'

export default function Header({ route }) {
  return (
    <header className="border-b border-carbon-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 md:px-6">
        <a href="#/" className="inline-flex min-h-11 items-center rounded-lg">
          <Logo />
          <span className="sr-only"> Telemetry, accueil</span>
        </a>

        <nav aria-label="Navigation principale" className="w-full md:w-auto">
          <ul className="flex items-center justify-between gap-1 md:justify-end md:gap-2">
            {LINKS.map((link) => (
              <li key={link.route}>
                <a
                  href={`#/${link.route}`}
                  className={linkClass}
                  aria-current={route === link.route ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#/inscription"
                aria-current={route === 'inscription' ? 'page' : undefined}
                className="inline-flex min-h-11 items-center rounded-lg border border-carbon-600 px-4 font-semibold transition-colors hover:border-ink-muted hover:bg-carbon-800 aria-[current=page]:border-signal-400"
              >
                Créer un compte
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
