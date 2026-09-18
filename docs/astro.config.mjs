import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://milesburton.github.io/trade-trace',
  integrations: [
    starlight({
      title: 'Trade Trace',
      description: 'Transparent tradesman reviews with blockchain immutability',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        alt: 'Trade Trace Logo',
      },
      favicon: './src/assets/favicon.svg',
      social: {
        discord: 'https://discord.gg/tSGgsKnz',
        github: 'https://github.com/milesburton/trade-trace',
      },
      editLink: {
        baseUrl: 'https://github.com/milesburton/trade-trace/edit/main/docs/src/content/docs/',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: 'introduction' },
            { label: 'Quick start', slug: 'guides/quick-start' },
            { label: 'Installation', slug: 'guides/installation' },
          ],
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Platform',
          autogenerate: { directory: 'platform' },
        },
        {
          label: 'Development',
          autogenerate: { directory: 'development' },
        },
        {
          label: 'API',
          autogenerate: { directory: 'api' },
        },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
      },
      plugins: [],
    }),
  ],
})
