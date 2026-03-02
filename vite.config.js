import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
        hmr: { protocol: 'ws', host: 'localhost', port: 5173 },
        watch: {
            usePolling: false,
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
        },
    },
    build: {
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mui: ['@mui/material', '@mui/icons-material'],
                    router: ['react-router-dom'],
                },
            },
        },
    },
});
