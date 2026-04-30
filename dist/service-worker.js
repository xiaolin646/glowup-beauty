/**
 * Service Worker - PWA离线支持
 */

const CACHE_NAME = 'glowup-beauty-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// 安装阶段
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  )
})

// 激活阶段
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// 拦截请求
self.addEventListener('fetch', (event) => {
  // 只拦截导航请求和GET请求
  if (event.request.mode !== 'navigate' && event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 如果缓存中有，返回缓存
        if (cachedResponse) {
          return cachedResponse
        }

        // 否则从网络获取
        return fetch(event.request).then((networkResponse) => {
          // 如果是成功的响应，缓存它
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone())
            })
          }
          return networkResponse
        }).catch(() => {
          // 如果网络也不可用，返回离线页面或占位符
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
        })
      })
  )
})

// 推送通知
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {}
  const options = {
    body: data.body || '有新消息',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: data.url ? { url: data.url } : {},
    actions: data.actions || []
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'GlowUp Beauty', options)
  )
})

// 通知点击
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  const url = event.notification.data.url || '/'
  event.waitUntil(
    clients.openWindow(url)
  )
})
