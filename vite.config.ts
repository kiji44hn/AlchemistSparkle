import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three'; // Three.jsを別チャンク
          }
          if (id.includes('node_modules/vue')) {
            return 'vendor-vue'; // Vueを別チャンク
          }
        },
      },
    },
    chunkSizeWarningLimit: 700, // 700 kBまで警告を抑制
  },
});