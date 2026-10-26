import { useState } from 'react'
import Button from '../components/Button/Button.jsx'
import FilterChip from '../components/FilterChip/FilterChip.jsx'
import SelectField from '../components/SelectField/SelectField.jsx'
import SessionCard from '../components/SessionCard/SessionCard.jsx'
import SessionDialog from '../components/SessionDialog/SessionDialog.jsx'
import { bestLap, lapTime } from '../lib/chrono.js'

const ALL = 'tous'

const SORTS = {
  recent: { label: 'Plus récentes', compare: (a, b) => b.date.localeCompare(a.date) },
  best: { label: 'Meilleur tour', compare: (a, b) => lapTime(bestLap(a)) - lapTime(bestLap(b)) },
}

// Valeurs uniques d'un champ, triées : sert à construire les filtres depuis les données
const uniqueValues = (sessions, key) => [...new Set(sessions.map((s) => s[key]))].sort((a, b) => a.localeCompare(b))

export default function SessionsPage({ sessions }) {
  const [source, setSource] = useState(ALL)
  const [circuit, setCircuit] = useState(ALL)
  const [sort, setSort] = useState('recent')
  const [openId, setOpenId] = useState(null)

  // Tout le reste est dérivé de l'état : rien n'est stocké en double
  const sources = uniqueValues(sessions, 'source')
  const circuits = uniqueValues(sessions, 'circuit')
  const inCircuit = sessions.filter((s) => circuit === ALL || s.circuit === circuit)
  const visible = inCircuit.filter((s) => source === ALL || s.source === source).sort(SORTS[sort].compare)
  const openSession = sessions.find((s) => s.id === openId)

  function resetFilters() {
    setSource(ALL)
    setCircuit(ALL)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
      <p className="font-semibold tracking-widest text-chrono-400 uppercase">Compte de démonstration</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">Tes sessions</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Filtre par circuit ou par source, puis ouvre une session pour voir tes secteurs et ton tour idéal.
      </p>

      <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-carbon-700 bg-carbon-900 p-4 md:p-5 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-labelledby="filtre-source" className="flex flex-col gap-2">
          <span id="filtre-source" className="text-sm font-semibold text-ink-muted">
            Source
          </span>
          <div className="flex flex-wrap gap-2">
            <FilterChip selected={source === ALL} count={inCircuit.length} onClick={() => setSource(ALL)}>
              Toutes
            </FilterChip>
            {sources.map((value) => {
              const count = inCircuit.filter((s) => s.source === value).length
              return (
                <FilterChip
                  key={value}
                  selected={source === value}
                  count={count}
                  disabled={count === 0}
                  onClick={() => setSource(value)}
                >
                  {value}
                </FilterChip>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:w-md">
          <SelectField
            label="Circuit"
            value={circuit}
            onChange={(event) => setCircuit(event.target.value)}
            options={[
              { value: ALL, label: 'Tous les circuits' },
              ...circuits.map((value) => ({ value, label: value })),
            ]}
          />
          <SelectField
            label="Trier par"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            options={Object.entries(SORTS).map(([value, { label }]) => ({ value, label }))}
          />
        </div>
      </div>

      <p className="mt-6 text-ink-muted" aria-live="polite">
        {visible.length} {visible.length > 1 ? 'sessions' : 'session'}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((session) => (
            <li key={session.id}>
              <SessionCard session={session} onOpen={setOpenId} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-carbon-600 p-8 md:items-center md:text-center">
          <h2 className="text-xl font-semibold">Aucune session ne correspond</h2>
          <p className="text-ink-muted">Essaie une autre source ou un autre circuit.</p>
          <Button variant="secondary" onClick={resetFilters}>
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {openSession && <SessionDialog session={openSession} onClose={() => setOpenId(null)} />}
    </div>
  )
}
