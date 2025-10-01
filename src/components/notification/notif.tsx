'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification, debugSubscriptions } from './actions'

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function DebugPWAVercel() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('Hello depuis Vercel!')
  const [logs, setLogs] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 9)])
  }

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const registerServiceWorker = async () => {
    try {
      addLog('🔄 Enregistrement Service Worker...')
      const registration = await navigator.serviceWorker.register('/sw.js')
      addLog('✅ Service Worker enregistré')
      
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
      
      if (sub) {
        addLog('✅ Subscription existante trouvée')
      }
    } catch (error) {
      addLog(`❌ Erreur Service Worker: ${error}`)
    }
  }

  const handleSubscribe = async () => {
    try {
      addLog('🔄 Demande permission...')
      const permission = await Notification.requestPermission()
      
      if (permission !== 'granted') {
        addLog('❌ Permission refusée')
        return
      }

      addLog('✅ Permission accordée')
      
      const registration = await navigator.serviceWorker.ready
      addLog('🔄 Création subscription...')
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })

      setSubscription(sub)
      addLog('✅ Subscription créée')

      // Sérialiser pour le serveur
      const serializedSub = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(sub.getKey('p256dh')!),
          auth: arrayBufferToBase64(sub.getKey('auth')!),
        },
      }

      addLog('🔄 Envoi au serveur...')
      const result = await subscribeUser(serializedSub)
      
      if (result.success) {
        addLog('✅ Abonnement serveur OK')
      } else {
        addLog(`❌ Erreur serveur: ${result.error}`)
      }
    } catch (error) {
      addLog(`❌ Erreur subscription: ${error}`)
    }
  }

  const handleSendNotification = async () => {
    try {
      addLog(`🔄 Envoi notification: "${message}"`)
      const result = await sendNotification(message)
      
      if (result.success) {
        addLog('✅ Notification envoyée!')
      } else {
        addLog(`❌ Erreur: ${result.error}`)
        if (result.details) {
          addLog(`📋 Détails: ${result.details}`)
        }
      }
    } catch (error) {
      addLog(`❌ Erreur envoi: ${error}`)
    }
  }

  const handleDebug = async () => {
    try {
      const info = await debugSubscriptions()
      setDebugInfo(info)
      addLog(`📊 Debug: ${info.count} subs, VAPID: ${info.vapidConfigured}`)
    } catch (error) {
      addLog(`❌ Erreur debug: ${error}`)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe()
        setSubscription(null)
      }
      await unsubscribeUser()
      addLog('✅ Désabonné')
    } catch (error) {
      addLog(`❌ Erreur désabonnement: ${error}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">🔧 Debug PWA Vercel</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">État</h3>
              <p className="text-sm">
                <span className="font-medium">Subscription:</span>{' '}
                <span className={subscription ? 'text-green-600' : 'text-red-600'}>
                  {subscription ? '✅ Actif' : '❌ Inactif'}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">VAPID Public Key:</span>{' '}
                <span className={process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ? 'text-green-600' : 'text-red-600'}>
                  {process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ? '✅ Configurée' : '❌ Manquante'}
                </span>
              </p>
            </div>

            <div className="space-y-3">
              {!subscription ? (
                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-blue-500  py-2 px-4 rounded hover:bg-blue-600"
                >
                  🔔 S abonner
                </button>
              ) : (
                <button 
                  onClick={handleUnsubscribe}
                  className="w-full bg-red-500 py-2 px-4 rounded hover:bg-red-600"
                >
                  🔕 Se désabonner
                </button>
              )}

              <div className="space-y-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message de test"
                  className="w-full p-2 border rounded"
                />
                <button 
                  onClick={handleSendNotification}
                  disabled={!subscription}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
                >
                  📤 Envoyer Test
                </button>
                <button 
                  onClick={() => {
                    if (Notification.permission === 'granted') {
                      new Notification('Test Direct 🔔', {
                        body: 'Notification directe (sans push)',
                        icon: '/icon-192x192.png'
                      })
                      addLog('🔔 Notification directe envoyée')
                    }
                  }}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  🔔 Test Notification Directe
                </button>
              </div>

              <button 
                onClick={handleDebug}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              >
                🔍 Debug Info
              </button>
            </div>
          </div>

          {/* Logs */}
          <div>
            <h3 className="font-semibold mb-2">📋 Logs</h3>
            <div className="bg-black text-green-400 p-3 rounded font-mono text-sm h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">Aucun log...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="mb-1">{log}</div>
                ))
              )}
            </div>
            <button 
              onClick={() => setLogs([])}
              className="mt-2 text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              🗑️ Vider logs
            </button>
          </div>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">🔍 Informations Debug</h3>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}