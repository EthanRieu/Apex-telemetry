import Button from './Button.jsx'

export default {
  title: 'Base/Button',
  component: Button,
  args: { children: 'Créer mon compte', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
}

export const Primary = {}
export const Secondary = { args: { variant: 'secondary', children: 'Voir une session de démo' } }
export const Ghost = { args: { variant: 'ghost', children: 'Réinitialiser les filtres' } }
export const Large = { args: { size: 'lg' } }
export const Disabled = { args: { disabled: true } }
export const Loading = { args: { loading: true, children: 'Création du compte…' } }
export const AsLink = { args: { href: '#/tarifs', children: 'Voir les offres' } }
export const LongLabel = {
  args: { children: 'Analyser la session de Spa-Francorchamps du 15 octobre 2026 sous la pluie' },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
}

// Pour vérifier le survol et le focus : passer la souris ou tabuler dessus
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Primaire</Button>
      <Button variant="secondary">Secondaire</Button>
      <Button variant="ghost">Discret</Button>
      <Button disabled>Désactivé</Button>
    </div>
  ),
}
