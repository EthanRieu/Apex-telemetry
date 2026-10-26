import '../src/fonts.js'
import '../src/index.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-carbon-950 p-6 font-sans text-ink antialiased">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'error' : une violation d'accessibilité fait échouer le test de la story
      test: 'error',
    },
  },
}

export default preview
