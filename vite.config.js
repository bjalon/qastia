import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rawBase = process.env.BASE_PATH?.trim();
const base = rawBase
  ? rawBase.endsWith('/')
    ? rawBase
    : `${rawBase}/`
  : '/';

export default defineConfig({
  base,
  plugins: [react()],
  publicDir: 'static',
});
