import { lazy, Suspense } from 'react'

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
  </div>
)

export const lazyWithRetry = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return lazy(() => {
    const retry = (retries: number) => {
      return importFn().catch((error) => {
        if (retries > 0) {
          return retry(retries - 1)
        }
        throw error
      })
    }
    return retry(3)
  })
}

export const LazyProductDetailPage = lazyWithRetry(
  () => import('@/pages/ProductDetailPage')
)

export const LazySkinProfilePage = lazyWithRetry(
  () => import('@/pages/SkinProfilePage')
)

export const LazySearchPage = lazyWithRetry(
  () => import('@/pages/SearchPage')
)

export const LazyAITest = lazyWithRetry(
  () => import('@/pages/AITest')
)

export { LoadingSpinner }
