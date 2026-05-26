import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://elysiumscale.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
