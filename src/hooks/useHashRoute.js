import { useEffect, useState } from 'react'

// Navigation par hash (#/sessions) : de vrais liens, le bouton retour fonctionne,
// et aucune configuration n'est nécessaire côté hébergeur.
const readRoute = () => window.location.hash.replace(/^#\/?/, '')

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const handleChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  return route
}

export function navigate(route) {
  window.location.hash = `/${route}`
}
