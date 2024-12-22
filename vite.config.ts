import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [
        // 配置Element Plus采用saas样式配色系统
        ElementPlusResolver({ importStyle: 'sass' }),
      ],
    }),                  
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          
        `,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 目标服务器地址
        changeOrigin: true, // 更改请求的origin为代理服务器的origin
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，移除/api前缀
      }
    }
  }
})
