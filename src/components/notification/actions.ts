'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

interface SerializedPushSubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

// Stockage global temporaire (sera perdu au redémarrage, mais fonctionne pour les tests)
const subscriptions = new Map<string, SerializedPushSubscription>()

export async function subscribeUser(sub: SerializedPushSubscription) {
  try {
    // Utiliser l'endpoint comme clé unique
    const key = Buffer.from(sub.endpoint).toString('base64').slice(0, 20)
    subscriptions.set('current', sub)
    subscriptions.set(key, sub)
    
    console.log('✅ Subscription enregistrée:', {
      endpoint: sub.endpoint.substring(0, 50) + '...',
      hasKeys: !!(sub.keys?.p256dh && sub.keys?.auth)
    })
    
    return { success: true, key }
  } catch (error) {
    console.error('❌ Erreur subscribeUser:', error)
    return { success: false, error: String(error) }
  }
}

export async function unsubscribeUser() {
  try {
    subscriptions.clear()
    console.log('✅ Utilisateur désabonné')
    return { success: true }
  } catch (error) {
    console.error('❌ Erreur unsubscribeUser:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendNotification(message: string) {
  try {
    console.log('🔔 Tentative envoi notification:', message)
    
    const subscription = subscriptions.get('current')
    if (!subscription) {
      console.error('❌ Aucune subscription trouvée')
      return { success: false, error: 'Aucun abonnement disponible' }
    }

    console.log('📋 Subscription trouvée:', {
      endpoint: subscription.endpoint.substring(0, 50) + '...',
      hasP256dh: !!subscription.keys?.p256dh,
      hasAuth: !!subscription.keys?.auth
    })

    // Vérification des clés VAPID
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      console.error('❌ Clés VAPID manquantes')
      return { success: false, error: 'Clés VAPID non configurées' }
    }

    const pushSubscription: webpush.PushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    }

    const payload = JSON.stringify({
      title: 'Test Notification 🔔',
      body: message,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'test-' + Date.now(),
      timestamp: Date.now(),
    })

    console.log('📤 Envoi en cours...', payload)
    
    const result = await webpush.sendNotification(pushSubscription, payload)
    
    console.log('✅ Notification envoyée!', {
      statusCode: result.statusCode,
      headers: result.headers
    })
    
    return { success: true, statusCode: result.statusCode }
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('❌ Erreur sendNotification:', {
      message: error.message,
      statusCode: error.statusCode,
      body: error.body,
      stack: error.stack
    })
    
    return { 
      success: false, 
      error: error.message || 'Erreur inconnue',
      statusCode: error.statusCode,
      details: error.body
    }
  }
}

// Fonction utilitaire pour debug
export async function debugSubscriptions() {
  return {
    count: subscriptions.size,
    hasCurrent: subscriptions.has('current'),
    keys: Array.from(subscriptions.keys()),
    vapidConfigured: !!(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY)
  }
}