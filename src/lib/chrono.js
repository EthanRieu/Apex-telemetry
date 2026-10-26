// Fonctions de calcul sur les sessions. Tout ce qui se calcule à partir
// des secteurs est dérivé ici plutôt que stocké dans le JSON.

const sum = (values) => values.reduce((total, value) => total + value, 0)

export function lapTime(lap) {
  return sum(lap.secteurs)
}

export function bestLap(session) {
  return session.tours.reduce((best, lap) => (lapTime(lap) < lapTime(best) ? lap : best))
}

// Meilleur temps réalisé dans chaque secteur, tous tours confondus
export function bestSectors(session) {
  return session.tours[0].secteurs.map((_, i) =>
    Math.min(...session.tours.map((lap) => lap.secteurs[i])),
  )
}

// Le tour parfait : la somme des meilleurs secteurs
export function idealLapTime(session) {
  return sum(bestSectors(session))
}

// Code couleur façon chronométrage :
// record = meilleur secteur de la session, better = mieux qu'au tour précédent
export function sectorStatus(session, lapIndex, sectorIndex) {
  const time = session.tours[lapIndex].secteurs[sectorIndex]
  if (time === bestSectors(session)[sectorIndex]) return 'record'
  const previous = session.tours[lapIndex - 1]
  if (previous && time < previous.secteurs[sectorIndex]) return 'better'
  return 'slower'
}

// Secteur du meilleur tour où le pilote perd le plus par rapport à son tour idéal
export function biggestLoss(session) {
  const best = bestLap(session)
  const ideal = bestSectors(session)
  const deltas = best.secteurs.map((time, i) => time - ideal[i])
  const index = deltas.indexOf(Math.max(...deltas))
  return { sector: index + 1, delta: deltas[index] }
}

// 138437 -> "2:18.437"
export function formatLapTime(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(3).padStart(6, '0')
  return minutes > 0 ? `${minutes}:${seconds}` : seconds
}

// 412 -> "+0.412 s"
export function formatDelta(ms) {
  return `+${(ms / 1000).toFixed(3)} s`
}

// "2026-09-12" -> "12 sept. 2026"
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
