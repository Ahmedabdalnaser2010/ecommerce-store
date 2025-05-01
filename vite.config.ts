// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import viteCompression from 'vite-plugin-compression'
// import tsconfigPaths from 'vite-tsconfig-paths'

// export default defineConfig(({ mode }) => {
//   // Load environment variables
//   const env = loadEnv(mode, process.cwd(), 'VITE_')

//   return {
//     plugins: [
//       react(),
//       tsconfigPaths(),
//       viteCompression({
//         algorithm: 'brotliCompress',
//         ext: '.br',
//         threshold: 10240,
//       })
//     ],

//     // Environment variable configuration
//     define: {
//       'process.env': {
//         ...env,
//         NODE_ENV: mode // Pass the current mode
//       }
//     },

//     // Existing optimizations
//     optimizeDeps: {
//       include: ['react', 'react-dom', 'react-router-dom'],
//       exclude: ['react-icons']
//     },
//     build: {
//       target: 'es2020',
//       cssCodeSplit: true,
//       minify: 'terser',
//       chunkSizeWarningLimit: 1000,
//       assetsInlineLimit: 4096,
//       rollupOptions: {
//         output: {
//           manualChunks: (id) => {
//             if (id.includes('node_modules')) {
//               if (id.includes('react-icons')) return 'icons'
//               if (id.includes('framer-motion') || id.includes('lottie')) return 'animations'
//               if (id.includes('react')) return 'react-vendor'
//               return 'vendor'
//             }
//           }
//         }
//       }
//     }
//   }
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'
// import { visualizer } from 'rollup-plugin-visualizer'
// import compression from 'vite-plugin-compression'

// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths(),
//     visualizer({ open: true }),
//     compression({
//       algorithm: 'brotliCompress',
//       ext: '.br'
//     })
//   ],
//   build: {
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true, // Remove console logs in production
//         drop_debugger: true // Remove debugger statements
//       }
//     },
//     chunkSizeWarningLimit: 1600,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'],
//           redux: ['@reduxjs/toolkit', 'react-redux'],
//           router: ['react-router', 'react-router-dom'],
//           form: ['react-hook-form', '@hookform/resolvers', 'zod'],
//           lottie: ['lottie-react']
//         }
//       }
//     },
//   }
//   , esbuild: {
//     legalComments: 'none'
//   },
//   optimizeDeps: {
//     exclude: ['lottie-web']
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          router: ['react-router-dom'],
          form: ['react-hook-form', '@hookform/resolvers', 'zod'],
          lottie: ['lottie-react'],
          flowbite: ['flowbite', 'flowbite-react']
        }
      }
    }
  },
  server: {
    port: 3000
  }
})