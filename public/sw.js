// Version du SW pour forcer la mise à jour
const SW_VERSION = 'v1.0.3'
console.log(`🔧 Service Worker ${SW_VERSION} démarré`)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
self.addEventListener('install', function(event) {
  console.log(`🔄 SW ${SW_VERSION} installé`)
  self.skipWaiting()
})

self.addEventListener('activate', function(event) {
  console.log(`✅ SW ${SW_VERSION} activé`)
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', function (event) {
  console.log(`📨 [${SW_VERSION}] Push event reçu:`, event)
  
  if (event.data) {
    try {
      const data = event.data.json()
      console.log(`📋 [${SW_VERSION}] Données notification:`, data)
      
      const options = {
        body: data.body,
        icon: data.icon || '/icon-192x192.png',
        badge: '/icon-192x192.png',
        vibrate: [200, 100, 200],
        tag: data.tag || 'default',
        requireInteraction: false,
        silent: false,
        data: {
          dateOfArrival: Date.now(),
          primaryKey: data.tag,
          url: data.url || '/'
        },
        actions: [
          {
            action: 'view',
            title: '👀 Voir',
            icon: '/icon-192x192.png'
          },
          {
            action: 'close',
            title: '❌ Fermer'
          }
        ]
      }
      
      console.log(`🔔 [${SW_VERSION}] Tentative affichage notification:`, data.title, options)
      
      // Force l'affichage même si l'app est active
      event.waitUntil(
        self.registration.showNotification(data.title, options)
          .then(() => {
            console.log(`✅ [${SW_VERSION}] Notification affichée avec succès`)
          })
          .catch(error => {
            console.error(`❌ [${SW_VERSION}] Erreur affichage notification:`, error)
          })
      )
    } catch (error) {
      console.error(`❌ [${SW_VERSION}] Erreur parsing données:`, error)
    }
  } else {
    console.log(`❌ [${SW_VERSION}] Aucune donnée dans le push event`)
    
    // Afficher une notification par défaut
    event.waitUntil(
      self.registration.showNotification('Notification reçue', {
        body: 'Une notification a été reçue sans données',
        icon: '/icon-192x192.png'
      })
    )
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log(`👆 [${SW_VERSION}] Clic notification:`, event.notification.tag)
  
  event.notification.close()
  
  if (event.action === 'close') {
    return
  }
  
  // Ouvrir ou focus la fenêtre
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      // Si une fenêtre est déjà ouverte, la focus
      for (let client of clients) {
        if (client.url.includes(self.location.origin)) {
          return client.focus()
        }
      }
      // Sinon, ouvrir une nouvelle fenêtre
      return self.clients.openWindow(self.location.origin)
    })
  )
})