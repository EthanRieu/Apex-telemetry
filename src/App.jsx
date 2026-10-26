import { useEffect, useRef, useState } from 'react'
import offres from './data/offres.json'
import sessions from './data/sessions.json'
import { navigate, useHashRoute } from './hooks/useHashRoute.js'
import Footer from './layout/Footer.jsx'
import Header from './layout/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import InscriptionPage from './pages/InscriptionPage.jsx'
import SessionsPage from './pages/SessionsPage.jsx'
import TarifsPage from './pages/TarifsPage.jsx'

const TITLES = {
  sessions: 'Tes sessions',
  tarifs: 'Tarifs',
  inscription: 'Créer un compte',
}

// La session mise en avant sur l'accueil : la plus récente à Spa
const featuredSession = sessions
  .filter((s) => s.circuit === 'Spa-Francorchamps')
  .reduce((latest, s) => (s.date > latest.date ? s : latest))

export default function App() {
  const route = useHashRoute()
  // L'offre est partagée par Tarifs et Inscription : l'état vit dans leur parent commun
  const [selectedOffer, setSelectedOffer] = useState('pilote')
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)

  // À chaque changement d'écran : titre de l'onglet, retour en haut, focus sur le contenu
  useEffect(() => {
    document.title = TITLES[route] ? `${TITLES[route]} · Apex Telemetry` : 'Apex Telemetry · Télémétrie circuit'
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    mainRef.current.focus()
  }, [route])

  function handleChooseOffer(offerId) {
    setSelectedOffer(offerId)
    navigate('inscription')
  }

  let page
  if (route === 'sessions') page = <SessionsPage sessions={sessions} />
  else if (route === 'tarifs') page = <TarifsPage offres={offres} onChoose={handleChooseOffer} />
  else if (route === 'inscription') {
    page = <InscriptionPage offres={offres} selectedOffer={selectedOffer} onSelectOffer={setSelectedOffer} />
  } else page = <HomePage featuredSession={featuredSession} />

  return (
    <>
      <a
        href="#contenu"
        onClick={(event) => {
          // Lien d'évitement : on déplace le focus sans toucher au hash (utilisé par la navigation)
          event.preventDefault()
          mainRef.current.focus()
        }}
        className="sr-only rounded-lg bg-ink px-4 py-3 font-semibold text-carbon-950 focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10"
      >
        Aller au contenu
      </a>
      <Header route={route} />
      <main id="contenu" ref={mainRef} tabIndex={-1} className="outline-none">
        {page}
      </main>
      <Footer />
    </>
  )
}
