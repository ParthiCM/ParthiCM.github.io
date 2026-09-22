import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

/**
 * GitHub Pages serves `404.html` for any path with no file behind it.
 * Our case-study routes (/work/:slug) are client-side only, so a direct
 * visit or a hard refresh would hit GitHub's own 404 and never boot the
 * router. Copying index.html to 404.html hands those requests back to
 * the app, which then resolves the URL normally — clean URLs, no hash.
 *
 * Done as a plugin rather than `cp` in the npm script so it works the
 * same on Windows and on the Ubuntu CI runner.
 */
function spaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const index = resolve(root, 'dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(root, 'dist/404.html'))
        console.log('\n  ✓ dist/404.html written (GitHub Pages SPA fallback)')
      }
    },
  }
}

export default defineConfig({
  // User site (ParthiCM.github.io) is served from the root, not a subpath.
  base: '/',
  plugins: [react(), spaFallback()],
  resolve: {
    alias: { '@': resolve(root, 'src') },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Three is the heavyweight; keeping it separate means the
          // initial HTML/CSS/React payload is not blocked behind it.
          three: ['three'],
          motion: ['lenis'],
        },
      },
    },
  },
})
