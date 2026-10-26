import { fn } from 'storybook/test'
import sessions from '../../data/sessions.json'
import SessionCard from './SessionCard.jsx'

const base = sessions[0]

export default {
  title: 'Base/SessionCard',
  component: SessionCard,
  args: { session: base, onOpen: fn() },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
}

export const Default = {}
export const RealCircuit = { args: { session: sessions.find((s) => s.source === 'RaceBox') } }
export const Rain = { args: { session: sessions.find((s) => s.conditions === 'Pluie') } }
export const LongContent = {
  args: {
    session: {
      ...base,
      circuit: 'Circuit de Nevers Magny-Cours Grand Prix',
      voiture: 'Porsche 911 GT3 R (992) – livrée endurance personnalisée',
    },
  },
}
