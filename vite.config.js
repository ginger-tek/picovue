import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json' with { type: 'json' }
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'post-build',
      closeBundle() {
        const path = './dist/picovue.global.js'
        const meta = `/** PicoVue v${pkg.version} (c) GingerTek **/`
        fs.writeFileSync(path, `${meta}\n${fs.readFileSync(path, 'utf-8')}`)
      }
    }
  ],
  build: {
    // sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: './src/index.js',
      name: 'PicoVue',
      fileName: (a) => a == 'umd' ? 'picovue.global.js' : `picovue.${a}.js`,
      formats: ['umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      }
    }
  }
})
