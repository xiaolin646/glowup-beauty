// 通用组件导出
export { ErrorBoundary, ErrorDisplay } from './ErrorBoundary'
export { Loading, Skeleton, CardSkeleton, ProductCardSkeleton, ListSkeleton, PageLoading, IconLoading, InlineLoading } from './Loading'
export { ToastProvider, useToast } from './Toast'

// Phase 3 新增组件
export { Skeleton as SkeletonV2, SkeletonProductCard, SkeletonProductList, SkeletonProfile } from './Skeleton'
export { OptimizedImage, OptimizedBackground } from './OptimizedImage'
export { LoadingState, SkeletonLoader } from './LoadingState'
export { ErrorState, EmptyState } from './ErrorState'
export {
  SkipLink,
  Modal,
  LiveRegion,
  Collapsible,
  Tooltip,
  ScreenReaderOnly,
  FormError,
  Loading as LoadingSpinner
} from './Accessibility'

// Phase 4 页面加载组件
export { PageLoading as PageLoadingV2, usePageLoading, LoadingContent, LazyContent } from './PageLoading'
