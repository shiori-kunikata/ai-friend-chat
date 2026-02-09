import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages にデプロイする場合、リポジトリ名を base に設定
// https://<username>.github.io/ai-friend-chat/
export default defineConfig({
  plugins: [react()],
  base: '/ai-friend-chat/',
})
