import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'WorkflowMonacoEditor',
      fileName: (format) => `workflow-monaco-editor.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'monaco-editor',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'monaco-editor': 'monaco',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'react/jsx-dev-runtime': 'ReactJSXRuntimeDev',
        },
      },
    },
  },
})
