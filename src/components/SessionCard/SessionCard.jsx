import Button from '../Button/Button.jsx'
import { bestLap, formatDate, formatLapTime, lapTime } from '../../lib/chrono.js'

export default function SessionCard({ session, onOpen }) {
  const best = lapTime(bestLap(session))

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-carbon-700 bg-carbon-900 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold break-words uppercase">{session.circuit}</h3>
          <p className="text-sm text-ink-muted">
            {session.pays} · {session.longueurKm.toLocaleString('fr-FR')} km
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-carbon-700 px-2 py-1 text-xs font-semibold">
          {session.source}
        </span>
      </div>

      <div>
        <p className="text-sm text-ink-muted">Meilleur tour</p>
        <p className="font-display text-4xl font-bold tabular-nums text-chrono-400">{formatLapTime(best)}</p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="col-span-2">
          <dt className="sr-only">Voiture</dt>
          <dd className="break-words">{session.voiture}</dd>
        </div>
        <div>
          <dt className="text-ink-muted">Date</dt>
          <dd>{formatDate(session.date)}</dd>
        </div>
        <div>
          <dt className="text-ink-muted">Conditions</dt>
          <dd>
            {session.conditions} · {session.tours.length} tours
          </dd>
        </div>
      </dl>

      <Button variant="secondary" fullWidth className="mt-auto" onClick={() => onOpen(session.id)}>
        Analyser la session<span className="sr-only"> de {session.circuit} du {formatDate(session.date)}</span>
      </Button>
    </article>
  )
}
