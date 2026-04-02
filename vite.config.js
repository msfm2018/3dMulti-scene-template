import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  // 关键配置：防止 Vite 在开发阶段过度预构建 Rapier
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d']
  }
});