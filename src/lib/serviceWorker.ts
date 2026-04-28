// Service Worker 注册与更新管理
const SW_FILE = '/sw.js'
let swRegistration: ServiceWorkerRegistration | null = null

export async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] 浏览器不支持 Service Worker')
    return
  }

  try {
    swRegistration = await navigator.serviceWorker.register(SW_FILE, {
      scope: '/',
      type: 'classic'
    })

    console.log('[SW] 注册成功，版本:', swRegistration.active?.scriptURL || 'unknown')

    // 检查更新
    swRegistration.addEventListener('updatefound', () => {
      const newWorker = swRegistration?.installing
      if (!newWorker) return

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // 有新版本可用
          console.log('[SW] 新版本可用，刷新页面以更新')
          
          // 可选：自动更新
          // newWorker.postMessage({ type: 'SKIP_WAITING' })
          // window.location.reload()
        }
      })
    })

  } catch (error) {
    console.error('[SW] 注册失败:', error)
  }
}

export async function updateServiceWorker(): Promise<void> {
  if (!swRegistration) return
  
  try {
    await swRegistration.update()
    console.log('[SW] 检查更新完成')
  } catch (error) {
    console.error('[SW] 更新检查失败:', error)
  }
}

export async function clearCache(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!swRegistration?.active) {
      resolve(false)
      return
    }

    const channel = new MessageChannel()
    channel.port1.onmessage = (event) => {
      resolve(event.data?.success || false)
    }

    swRegistration.active.postMessage({ type: 'CLEAR_CACHE' }, [channel.port2])
  })
}
