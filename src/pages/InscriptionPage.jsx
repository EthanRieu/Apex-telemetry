import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button/Button.jsx'
import TextField from '../components/TextField/TextField.jsx'
import { formatPrice } from '../lib/offres.js'
import { validateSignup } from '../lib/validation.js'

const EMPTY = { prenom: '', email: '', motDePasse: '', cgu: false }
const FIELD_ORDER = ['prenom', 'email', 'motDePasse', 'cgu']

export default function InscriptionPage({ offres, selectedOffer, onSelectOffer }) {
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success

  // Les erreurs sont recalculées à chaque rendu, jamais stockées
  const errors = validateSignup(values)
  const showError = (name) => (submitted || touched[name] ? errors[name] : undefined)
  const offre = offres.find((o) => o.id === selectedOffer)

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    const firstInvalid = FIELD_ORDER.find((name) => errors[name])
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus()
      return
    }
    // Pas de backend : on simule l'appel réseau
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1200)
  }

  if (status === 'success') {
    return <Confirmation prenom={values.prenom.trim()} email={values.email.trim()} offre={offre} />
  }

  const inputProps = (name) => ({
    name,
    value: values[name],
    onChange: (event) => update(name, event.target.value),
    onBlur: () => setTouched((current) => ({ ...current, [name]: true })),
    error: showError(name),
    disabled: status === 'submitting',
  })

  return (
    <div className="mx-auto max-w-xl px-4 pt-10 md:pt-14">
      <h1 className="font-display text-4xl font-bold uppercase md:text-5xl">Crée ton compte</h1>
      <p className="mt-3 text-ink-muted">Moins d’une minute. Les champs marqués * sont obligatoires.</p>

      <form noValidate onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <fieldset className="flex flex-col gap-3" disabled={status === 'submitting'}>
          <legend className="mb-3 font-semibold">Ton offre</legend>
          {offres.map((o) => (
            <label
              key={o.id}
              className={
                'flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ' +
                'has-checked:border-chrono-400 has-checked:bg-carbon-800 has-focus-visible:outline-2 ' +
                'has-focus-visible:outline-offset-2 has-focus-visible:outline-chrono-400 border-carbon-600 hover:border-ink-muted'
              }
            >
              <input
                type="radio"
                name="offre"
                value={o.id}
                checked={selectedOffer === o.id}
                onChange={() => onSelectOffer(o.id)}
                className="size-5 accent-chrono-400 focus-visible:outline-none"
              />
              <span className="flex-1 font-semibold">{o.nom}</span>
              <span className="text-ink-muted tabular-nums">{formatPrice(o)}</span>
            </label>
          ))}
        </fieldset>

        <TextField label="Prénom" required autoComplete="given-name" {...inputProps('prenom')} />
        <TextField
          label="Adresse e-mail"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          {...inputProps('email')}
        />
        <TextField
          label="Mot de passe"
          type="password"
          required
          autoComplete="new-password"
          hint="8 caractères minimum, dont un chiffre."
          {...inputProps('motDePasse')}
        />

        <div className="flex flex-col gap-1.5">
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="cgu"
              checked={values.cgu}
              onChange={(event) => update('cgu', event.target.checked)}
              aria-invalid={showError('cgu') ? true : undefined}
              aria-describedby={showError('cgu') ? 'cgu-error' : undefined}
              disabled={status === 'submitting'}
              className="size-5 shrink-0 accent-chrono-400"
            />
            <span>J’accepte les conditions d’utilisation *</span>
          </label>
          {showError('cgu') && (
            <p id="cgu-error" className="text-sm font-semibold text-danger">
              {showError('cgu')}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" fullWidth loading={status === 'submitting'}>
          {status === 'submitting' ? 'Création du compte…' : `Créer mon compte ${offre.nom}`}
        </Button>
      </form>
    </div>
  )
}

function Confirmation({ prenom, email, offre }) {
  const titleRef = useRef(null)

  // Le focus va sur le message : le lecteur d'écran annonce la confirmation
  useEffect(() => {
    titleRef.current.focus()
  }, [])

  return (
    <div className="mx-auto max-w-xl px-4 pt-10 md:pt-14">
      <div className="rounded-2xl border border-chrono-400 bg-carbon-900 p-6 md:p-8">
        <p className="font-semibold tracking-widest text-chrono-400 uppercase">Compte créé</p>
        <h1 ref={titleRef} tabIndex={-1} className="mt-2 font-display text-4xl font-bold uppercase outline-none">
          Bienvenue {prenom} !
        </h1>
        <p className="mt-4 text-ink-muted">
          Ton offre <strong className="text-ink">{offre.nom}</strong> ({formatPrice(offre)}) est active. Un e-mail de
          confirmation vient d’être envoyé à <strong className="text-ink">{email}</strong>.
        </p>
        <Button href="#/sessions" size="lg" className="mt-6">
          Analyser une session de démo
        </Button>
      </div>
    </div>
  )
}
