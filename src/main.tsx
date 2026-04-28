import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerServiceWorker } from './lib/serviceWorker'
import { reportWebVitals } from './utils/performance'

// ====================
// 全局错误处理
// ====================

// 生产环境禁用 console 输出
if (import.meta.env.PROD) {
  // 覆盖 console 方法为空函数
  console.log = () => {}
  console.info = () => {}
  console.debug = () => {}
  // 保留 error 和 warn，但避免泄露敏感信息
}

window.addEventListener('error', (event) => {
  // 生产环境不输出错误详情到控制台
  if (!import.meta.env.PROD) {
    console.error('[Global Error]', event.error)
  }
  
  // 可选：上报错误到监控服务
  if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
    // 仅在开启错误追踪时记录
    const errorData = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    }
    // 通过安全通道上报错误
    console.log('[Error Tracking]', errorData)
  }
})

window.addEventListener('unhandledrejection', (event) => {
  if (!import.meta.env.PROD) {
    console.error('[Unhandled Promise Rejection]', event.reason)
  }
  
  // 可选：上报 Promise 错误
  if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
    console.log('[Error Tracking - Promise]', event.reason)
  }
})

// ====================
// Service Worker 注册
// ====================

// 仅在生产环境注册 SW
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    registerServiceWorker()
  })
}

// ====================
// React 挂载
// ====================

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ====================
// 性能监控 (Web Vitals)
// ====================
if (import.meta.env.PROD) {
  reportWebVitals((metric) => {
    // 上报性能数据到分析服务
    console.log('[Web Vitals]', metric.name, metric.value);
    
    // 可选：发送到分析平台
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   metric_label: metric.name,
    // });
  });
}
