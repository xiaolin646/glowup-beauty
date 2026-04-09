/// <reference lib="webworker" />

const CACHE_NAME = 'glowup-v1.0.0'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
]

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  // 立即激活
  ;(self as unknown as ServiceWorkerGlobalScope).skipWaiting()
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  // 获取控制权
  ;(self as unknown as ServiceWorkerGlobalScope).clients.claim()
})

// 请求拦截 - 缓存优先策略
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event

  // 只处理同源 GET 请求
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // 缓存命中，返回缓存并更新
        event.waitUntil(
          fetch(request).then((response) => {
            if (response.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response)
              })
            }
          }).catch(() => {/* 网络请求失败，忽略 */})
        )
        return cachedResponse
      }

      // 缓存未命中，网络请求
      return fetch(request).then((response) => {
        // 缓存成功的 GET 响应
        if (response.ok && request.url.includes(self.location.origin)) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
        }
        return response
      }).catch(() => {
        // 网络请求失败，返回离线页面
        if (request.mode === 'navigate') {
          return caches.match('/index.html') as Promise<Response>
        }
        return new Response('离线', { status: 503, statusText: 'Service Unavailable' })
      })
    })
  )
})

// 消息处理 - 清除缓存
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data?.type === 'SKIP_WAITING') {
    ;(self as unknown as ServiceWorkerGlobalScope).skipWaiting()
  }
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports?.[0]?.postMessage({ success: true })
    })
  }
})

export {}
