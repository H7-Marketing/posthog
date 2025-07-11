import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${path.resolve(__dirname, 'node_modules/antd/es/style/variable.less')}";`
            }
        }
    },
    build: {
        outDir: 'dist'
    }
})
