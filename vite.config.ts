import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    Components({
      dirs: ['components'],
      extensions: ['vue'],
      deep: true,
      directoryAsNamespace: true,
      dts: 'components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      '~': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          "@import '@/assets/scss/_mixins.scss';@import '@/assets/scss/_breakpoints.scss';",
      },
    },
  },
});
