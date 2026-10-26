import { useEffect, useRef } from 'react'
import Button from '../Button/Button.jsx'
import SectorBadge from '../SectorBadge/SectorBadge.jsx'
import {
  bestLap,
  biggestLoss,
  formatDate,
  formatDelta,
  formatLapTime,
  idealLapTime,
  lapTime,
  sectorStatus,
} from '../../lib/chrono.js'

// <dialog> natif : piège le focus, se ferme avec Échap et rend le focus au bouton d'origine
export default function SessionDialog({ session, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current.showModal()
  }, [])

  const best = bestLap(session)
  const loss = biggestLoss(session)

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="session-titre"
      onClose={onClose}
      // Un clic sur le fond (hors de la boîte) ferme la modale
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
      className={
        'm-0 h-dvh max-h-none w-full max-w-none bg-carbon-900 text-ink backdrop:bg-carbon-950/80 ' +
        'md:m-auto md:h-fit md:max-h-[90dvh] md:max-w-3xl md:rounded-2xl md:border md:border-carbon-700'
      }
    >
      <div className="flex flex-col gap-6 p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-ink-muted">
              {session.source} · {formatDate(session.date)} · {session.conditions}
            </p>
            <h2 id="session-titre" className="font-display text-3xl font-bold uppercase md:text-4xl">
              {session.circuit}
            </h2>
            <p className="text-ink-muted">{session.voiture}</p>
          </div>
          <Button variant="secondary" onClick={() => dialogRef.current.close()}>
            Fermer
          </Button>
        </div>

        <dl className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <dt className="text-sm text-ink-muted">Meilleur tour</dt>
            <dd className="font-display text-3xl font-bold tabular-nums">{formatLapTime(lapTime(best))}</dd>
            <dd className="text-sm text-ink-muted">Tour {best.numero}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-muted">Tour idéal</dt>
            <dd className="font-display text-3xl font-bold tabular-nums text-chrono-400">
              {formatLapTime(idealLapTime(session))}
            </dd>
            <dd className="text-sm text-ink-muted">Somme des meilleurs secteurs</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-muted">Vitesse max</dt>
            <dd className="font-display text-3xl font-bold tabular-nums">{session.vitesseMaxKmh} km/h</dd>
          </div>
        </dl>

        <p className="rounded-lg border-l-4 border-signal-400 bg-carbon-800 p-4">
          {loss.delta > 0 ? (
            <>
              Ton secteur le plus coûteux est le <strong>secteur {loss.sector}</strong> : {formatDelta(loss.delta)}{' '}
              par rapport à ton meilleur passage.
            </>
          ) : (
            <>Tour parfait : ton meilleur tour contient tes trois meilleurs secteurs.</>
          )}
        </p>

        <div>
          <h3 className="text-lg font-semibold">Détail des tours</h3>
          {/* Le tableau défile horizontalement sur petit écran : la zone doit être atteignable au clavier */}
          <div tabIndex={0} role="region" aria-label="Tableau des tours" className="mt-3 overflow-x-auto rounded-lg">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="text-sm text-ink-muted">
                <tr>
                  <th scope="col" className="py-2 pr-3 font-semibold">Tour</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Temps</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Secteur 1</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Secteur 2</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Secteur 3</th>
                </tr>
              </thead>
              <tbody>
                {session.tours.map((lap, lapIndex) => {
                  const isBest = lap === best
                  return (
                    <tr key={lap.numero} className={`border-t border-carbon-700 ${isBest ? 'bg-carbon-800' : ''}`}>
                      <th scope="row" className="py-2 pr-3 font-semibold">
                        {lap.numero}
                        {isBest && <span className="ml-2 text-xs text-chrono-400 uppercase">Meilleur</span>}
                      </th>
                      {/* Le temps du tour juste après son numéro : visible sans défiler sur mobile */}
                      <td className={`py-2 pr-3 font-semibold tabular-nums ${isBest ? 'text-chrono-400' : ''}`}>
                        {formatLapTime(lapTime(lap))}
                      </td>
                      {lap.secteurs.map((time, sectorIndex) => (
                        <td key={sectorIndex} className="py-2 pr-3">
                          <SectorBadge status={sectorStatus(session, lapIndex, sectorIndex)}>
                            {formatLapTime(time)}
                          </SectorBadge>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm" aria-label="Légende des couleurs">
            <li><SectorBadge status="record">Meilleur secteur</SectorBadge></li>
            <li><SectorBadge status="better">Mieux qu’au tour précédent</SectorBadge></li>
            <li><SectorBadge status="slower">Plus lent</SectorBadge></li>
          </ul>
        </div>
      </div>
    </dialog>
  )
}
