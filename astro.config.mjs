// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the production domain.
  site: 'https://mountain-journal.example.com',
  vite: {
    plugins: [tailwindcss()]
  }
});
