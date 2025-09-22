import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  theme: {
    extend: {
        colors: {
            'lavender': '#d8bfd8',
            'thistle': '#e6e6fa',
            'rose': '#ffd1dc',
            'lilac': '#c8a2c8',
            'ivory': '#ece8e3',
            'champagne': '#ead6c6',
            'rosegold': '#d3a6a5',
            'taupe': '#a78a89',
            'mauve': '#b47377',
            'leather': '#665552'
        }
    }
  }
})
