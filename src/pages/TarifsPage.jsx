import Button from '../components/Button/Button.jsx'
import { formatPrice } from '../lib/offres.js'

export default function TarifsPage({ offres, onChoose }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="font-display text-4xl font-bold uppercase md:text-5xl">Choisis ton offre</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Prix TTC, sans engagement : tu changes d’offre ou tu résilies depuis ton compte, en un clic.
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {offres.map((offre) => (
          <li
            key={offre.id}
            className={
              'flex flex-col gap-4 rounded-2xl border bg-carbon-900 p-5 ' +
              (offre.recommandee ? 'border-signal-400' : 'border-carbon-700')
            }
          >
            <div>
              {offre.recommandee && (
                <p className="mb-2 inline-block rounded-md bg-signal-600 px-2 py-0.5 text-xs font-semibold uppercase">
                  Recommandée
                </p>
              )}
              <h2 className="font-display text-3xl font-bold uppercase">{offre.nom}</h2>
              <p className="mt-1 text-ink-muted">{offre.description}</p>
            </div>
            <p className="font-display text-4xl font-bold">{formatPrice(offre)}</p>
            <ul className="flex flex-col gap-2">
              {offre.avantages.map((avantage) => (
                <li key={avantage} className="flex gap-2">
                  <span aria-hidden="true" className="text-chrono-400">✓</span>
                  {avantage}
                </li>
              ))}
            </ul>
            {/* Un seul bouton principal : celui de l'offre recommandée */}
            <Button
              variant={offre.recommandee ? 'primary' : 'secondary'}
              fullWidth
              className="mt-auto"
              onClick={() => onChoose(offre.id)}
            >
              Choisir {offre.nom}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
