import TextField from './TextField.jsx'

export default {
  title: 'Base/TextField',
  component: TextField,
  args: { label: 'Adresse e-mail', type: 'email', placeholder: 'julie@exemple.fr' },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
}

export const Default = {}
export const Required = { args: { required: true } }
export const WithHint = {
  args: { label: 'Mot de passe', type: 'password', hint: '8 caractères minimum.', placeholder: '' },
}
export const Filled = { args: { defaultValue: 'julie.martin@exemple.fr' } }
export const WithError = {
  args: { required: true, defaultValue: 'julie@', error: 'Saisis une adresse e-mail valide, par exemple julie@exemple.fr.' },
}
export const Disabled = { args: { disabled: true, defaultValue: 'julie.martin@exemple.fr' } }
export const LongContent = {
  args: {
    label: 'Nom de ton écurie ou de ton groupe de pilotes (tel qu’il apparaîtra dans le classement)',
    defaultValue: 'Écurie des Coteaux Champenois – Section Simracing Endurance',
    hint: 'Il sera visible par tous les membres de la Team.',
  },
}
