import SectorBadge from './SectorBadge.jsx'

export default {
  title: 'Base/SectorBadge',
  component: SectorBadge,
  args: { status: 'record', children: '42.602' },
  argTypes: { status: { control: 'inline-radio', options: ['record', 'better', 'slower'] } },
}

export const Record = {}
export const Better = { args: { status: 'better', children: '1:03.243' } }
export const Slower = { args: { status: 'slower', children: '35.967' } }
export const LongValue = { args: { status: 'slower', children: '12:03.243' } }

export const Legend = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <SectorBadge status="record">Meilleur secteur</SectorBadge>
      <SectorBadge status="better">Amélioration</SectorBadge>
      <SectorBadge status="slower">Plus lent</SectorBadge>
    </div>
  ),
}
