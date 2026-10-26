import { useState } from 'react'
import FilterChip from './FilterChip.jsx'

export default {
  title: 'Base/FilterChip',
  component: FilterChip,
  args: { children: 'Spa-Francorchamps', selected: false },
}

export const Default = {}
export const Selected = { args: { selected: true } }
export const WithCount = { args: { count: 3 } }
export const SelectedWithCount = { args: { selected: true, count: 3 } }
export const Disabled = { args: { disabled: true, count: 0 } }
export const LongLabel = { args: { children: 'Circuit de Nevers Magny-Cours (configuration club)' } }

// Un groupe interactif : un seul choix possible, comme sur l'écran Sessions
export const Group = {
  render: function GroupStory() {
    const [value, setValue] = useState('Tous')
    return (
      <div role="group" aria-label="Source" className="flex flex-wrap gap-2">
        {['Tous', 'ACC', 'iRacing', 'Assetto Corsa', 'RaceBox'].map((option) => (
          <FilterChip key={option} selected={value === option} onClick={() => setValue(option)}>
            {option}
          </FilterChip>
        ))}
      </div>
    )
  },
}
