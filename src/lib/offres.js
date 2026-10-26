// 6 -> "6 € / mois", 29 (unique) -> "29 € une fois"
export function formatPrice(offre) {
  if (offre.prix === 0) return '0 €'
  return offre.periode === 'unique' ? `${offre.prix} € une fois` : `${offre.prix} € / mois`
}
