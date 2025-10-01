import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Attendancy',
    short_name: 'Attendancy',
    description: 'Attendancy',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: "/icons/dark-192x192.png",
        sizes: '192x192',
        type: 'image/png',
      },
      {
       "src": "/icons/dark-512x512.png",
        sizes: '512x512',
        type: 'image/png',

      },
    ],
  }
}