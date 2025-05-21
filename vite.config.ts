import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import fs from 'fs';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const srcDir = path.resolve(__dirname, 'src/components');

const entries: Record<string, string> = {};
fs.readdirSync(srcDir).forEach((componentDir) => {
    const componentDirPath = path.join(srcDir, componentDir);
    const componentFilePath = path.join(
        componentDirPath,
        `${componentDir}.tsx`
    );

    if (
        fs.statSync(componentDirPath).isDirectory() &&
        fs.existsSync(componentFilePath)
    ) {
        entries[`components/${componentDir}/${componentDir}`] =
            componentFilePath;
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
            entryRoot: 'src/components',
            outDir: 'dist/components',
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
