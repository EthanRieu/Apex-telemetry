import Button from '../components/Button/Button.jsx'
import SectorBadge from '../components/SectorBadge/SectorBadge.jsx'
import {
  bestLap,
  biggestLoss,
  formatDelta,
  formatLapTime,
  idealLapTime,
  lapTime,
  sectorStatus,
} from '../lib/chrono.js'

const STEPS = [
  {
    title: 'Importe ta session',
    text: 'Un fichier ACC, iRacing, Assetto Corsa ou un export RaceBox de ton trackday.',
  },
  {
    title: 'Lis tes secteurs',
    text: 'Chaque secteur prend une couleur : meilleur, amélioration ou plus lent.',
  },
  {
    title: 'Vise ton tour idéal',
    text: 'Apex additionne tes meilleurs secteurs et te dit où se cachent tes dixièmes.',
  },
]

export default function HomePage({ featuredSession }) {
  const best = bestLap(featuredSession)
  const bestIndex = featuredSession.tours.indexOf(best)
  const loss = biggestLoss(featuredSession)

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 md:px-6 md:pt-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-24">
        <div>
          <p className="font-semibold tracking-widest text-chrono-400 uppercase">Télémétrie circuit</p>
          <h1 className="mt-3 font-display text-5xl leading-none font-bold uppercase md:text-6xl xl:text-7xl">
            Trouve les dixièmes que tu laisses en piste.
          </h1>
          <p className="mt-5 text-lg text-ink-muted md:text-xl">
            Apex analyse tes sessions en simulation comme sur circuit réel, et te montre en un coup d’œil le
            secteur où tu perds le plus de temps.
          </p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <Button href="#/tarifs" size="lg">
              Choisir mon offre
            </Button>
            <Button href="#/sessions" size="lg" variant="ghost">
              Voir une session de démo
            </Button>
          </div>
          <p className="mt-4 text-sm text-ink-muted">Offre gratuite disponible, sans carte bancaire.</p>
        </div>

        <figure className="rounded-2xl border border-carbon-700 bg-carbon-900 p-5 md:p-6">
          <figcaption className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
            <span className="font-display text-2xl font-bold uppercase">{featuredSession.circuit}</span>
            <span className="text-sm text-ink-muted">{featuredSession.voiture}</span>
          </figcaption>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-ink-muted">Meilleur tour</dt>
              <dd className="font-display text-4xl font-bold tabular-nums">{formatLapTime(lapTime(best))}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Tour idéal</dt>
              <dd className="font-display text-4xl font-bold tabular-nums text-chrono-400">
                {formatLapTime(idealLapTime(featuredSession))}
              </dd>
            </div>
          </dl>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Secteurs du meilleur tour">
            {best.secteurs.map((time, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-sm text-ink-muted">S{i + 1}</span>
                <SectorBadge status={sectorStatus(featuredSession, bestIndex, i)}>{formatLapTime(time)}</SectorBadge>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-carbon-800 p-3 text-sm">
            Secteur le plus coûteux : <strong>S{loss.sector}</strong>, {formatDelta(loss.delta)} par rapport à ton
            meilleur S{loss.sector}.
          </p>
        </figure>
      </section>

      <section aria-labelledby="etapes" className="mx-auto mt-20 max-w-6xl px-4 md:px-6">
        <h2 id="etapes" className="font-display text-3xl font-bold uppercase md:text-4xl">
          Comment ça marche
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-carbon-700 p-5">
              <span className="font-display text-4xl font-bold text-signal-400" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
