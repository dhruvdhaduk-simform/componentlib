import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import fs from 'fs';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const srcDir = path.resolve(__dirname, 'src/stories');

const entries: Record<string, string> = {};
fs.readdirSync(srcDir).forEach((file) => {
    if (
        file.endsWith('.tsx') &&
        !file.endsWith('.stories.tsx') &&
        !file.includes('.stories') &&
        file !== 'index.tsx'
    ) {
        const name = file.replace(/\.tsx$/, '');
        entries[name] = path.resolve(srcDir, file);
    }
});

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        dts({
            insertTypesEntry: false,
            copyDtsFiles: true,
            entryRoot: 'src/stories',
            outDir: 'dist',
            tsconfigPath: './tsconfig.app.json',
            exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
        }),
        libInjectCss(),
    ],
    build: {
        lib: {
            entry: entries,
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].js',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
