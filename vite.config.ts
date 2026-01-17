import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'
import windi from 'vite-plugin-windicss'

const variablePath  = normalizePath(path.resolve(__dirname, './src/variable.scss'));

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '${variablePath}'; `
      }
    },
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // PostCSS配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist:  ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  root: path.resolve(__dirname, ''),
  plugins: [react(),windi()],
})
