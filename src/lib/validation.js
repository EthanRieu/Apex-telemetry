const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Renvoie un objet { champ: message } ; vide si tout est valide
export function validateSignup(values) {
  const errors = {}
  if (!values.prenom.trim()) errors.prenom = 'Indique ton prénom.'
  if (!EMAIL.test(values.email.trim())) {
    errors.email = 'Saisis une adresse e-mail valide, par exemple julie@exemple.fr.'
  }
  if (values.motDePasse.length < 8 || !/\d/.test(values.motDePasse)) {
    errors.motDePasse = 'Ton mot de passe doit contenir au moins 8 caractères, dont un chiffre.'
  }
  if (!values.cgu) errors.cgu = 'Accepte les conditions d’utilisation pour créer ton compte.'
  return errors
}
