import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'pre-build',
      closeBundle() {
        const path = './dist/picovue.global.js'
        const meta = `/** picovue v${pkg.version} (c) GingerTek **/`
        const styles = fs.readFileSync('./dist/style.css', 'utf-8')
        const css = `var css=new CSSStyleSheet();css.replaceSync(\`${styles.trim()}\`);document.adoptedStyleSheets.push(css);`
        fs.writeFileSync(path, `${meta}\n${css}\n${fs.readFileSync(path, 'utf-8')}`)
        fs.unlinkSync('./dist/style.css')
      }
    }
  ],
  build: {
    sourcemap: true,
    lib: {
      name: 'PicoVue',
      fileName: () => `picovue.global.js`,
      entry: './src/main.js',
      formats: ['iife']
    },
    rollupOptions: {
      input: './src/main.js',
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})