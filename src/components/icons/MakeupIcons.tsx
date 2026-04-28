import React from 'react'

interface IconProps {
  size?: number
  className?: string
}

// 高端唇膏图标
export const LipstickIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="lipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* 膏体 */}
    <path d="M20 8h8v12l-4 4-4-4V8z" fill="url(#lipGrad)" />
    {/* 高光 */}
    <path d="M22 10h4v6l-2 2-2-2V10z" fill="white" fillOpacity="0.3" />
    {/* 金属管 */}
    <rect x="18" y="20" width="12" height="6" rx="1" fill="url(#goldGrad)" />
    {/* 底座 */}
    <rect x="16" y="26" width="16" height="14" rx="2" fill="url(#goldGrad)" />
    <rect x="18" y="28" width="12" height="10" rx="1" fill="#1F2937" />
  </svg>
)

// 精致眼影盘图标
export const EyeshadowIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="panGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
    </defs>
    {/* 外壳 */}
    <rect x="4" y="12" width="40" height="28" rx="4" fill="#1F2937" />
    {/* 眼影格 */}
    <circle cx="16" cy="22" r="6" fill="url(#panGrad)" />
    <circle cx="32" cy="22" r="6" fill="#EC4899" />
    <circle cx="16" cy="34" r="6" fill="#F97316" />
    <circle cx="32" cy="34" r="6" fill="#8B5CF6" />
    {/* 高光 */}
    <circle cx="14" cy="20" r="2" fill="white" fillOpacity="0.4" />
    <circle cx="30" cy="20" r="2" fill="white" fillOpacity="0.3" />
    {/* 金属扣 */}
    <rect x="20" y="8" width="8" height="4" rx="1" fill="#D97706" />
  </svg>
)

// 高光修容图标
export const HighlighterIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
    {/* 发光效果 */}
    <circle cx="24" cy="24" r="18" fill="url(#glowGrad)" fillOpacity="0.3" />
    <circle cx="24" cy="24" r="12" fill="url(#glowGrad)" fillOpacity="0.5" />
    {/* 主体 */}
    <circle cx="24" cy="24" r="8" fill="url(#glowGrad)" />
    {/* 星形高光 */}
    <path d="M24 14l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="white" fillOpacity="0.8" />
  </svg>
)

// 精致粉底液图标
export const FoundationIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="foundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FECACA" />
        <stop offset="100%" stopColor="#FEE2E2" />
      </linearGradient>
    </defs>
    {/* 瓶身 */}
    <rect x="14" y="16" width="20" height="24" rx="3" fill="url(#foundGrad)" />
    {/* 瓶身高光 */}
    <rect x="16" y="18" width="6" height="20" rx="2" fill="white" fillOpacity="0.3" />
    {/* 泵头 */}
    <rect x="20" y="8" width="8" height="8" rx="1" fill="#1F2937" />
    <rect x="22" y="4" width="4" height="4" rx="1" fill="#1F2937" />
    {/* 按压头 */}
    <rect x="18" y="6" width="12" height="2" rx="1" fill="#D97706" />
  </svg>
)

// 睫毛膏图标
export const MascaraIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="mascGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
    </defs>
    {/* 刷杆 */}
    <rect x="18" y="8" width="12" height="28" rx="2" fill="url(#mascGrad)" />
    {/* 刷头 */}
    <ellipse cx="24" cy="38" rx="8" ry="4" fill="#1F2937" />
    {/* 刷毛 */}
    <path d="M18 36v4M21 35v5M24 34v6M27 35v5M30 36v4" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
    {/* 盖子 */}
    <rect x="16" y="4" width="16" height="6" rx="1" fill="#EC4899" />
    <rect x="18" y="6" width="12" height="2" rx="1" fill="#F472B6" />
  </svg>
)

// 腮红图标
export const BlushIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="100%" stopColor="#FB7185" />
      </linearGradient>
    </defs>
    {/* 圆盒 */}
    <circle cx="24" cy="26" r="16" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="2" />
    {/* 腮红 */}
    <circle cx="24" cy="26" r="12" fill="url(#blushGrad)" />
    {/* 压纹 */}
    <circle cx="24" cy="26" r="8" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    <circle cx="24" cy="26" r="4" stroke="white" strokeWidth="1" strokeOpacity="0.4" fill="none" />
    {/* 高光 */}
    <ellipse cx="20" cy="22" rx="4" ry="2" fill="white" fillOpacity="0.3" />
  </svg>
)

// 眉笔图标
export const BrowPencilIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="browGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#374151" />
      </linearGradient>
    </defs>
    {/* 笔杆 */}
    <rect x="20" y="4" width="8" height="32" rx="4" fill="url(#browGrad)" />
    {/* 金属环 */}
    <rect x="18" y="32" width="12" height="4" rx="1" fill="#D97706" />
    {/* 笔尖 */}
    <path d="M20 36l4 8 4-8h-8z" fill="#1F2937" />
    {/* 笔尖高光 */}
    <path d="M22 36l2 4 2-4h-4z" fill="#6B7280" />
  </svg>
)

// 香水图标
export const PerfumeIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="perfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
      <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F9A8D4" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* 瓶身 */}
    <rect x="14" y="18" width="20" height="24" rx="3" fill="url(#perfGrad)" stroke="#FBCFE8" strokeWidth="1" />
    {/* 液体 */}
    <rect x="16" y="28" width="16" height="12" rx="2" fill="url(#liquidGrad)" fillOpacity="0.6" />
    {/* 瓶颈 */}
    <rect x="20" y="12" width="8" height="6" fill="#D97706" />
    {/* 喷头 */}
    <rect x="18" y="8" width="12" height="4" rx="1" fill="#D97706" />
    <rect x="22" y="4" width="4" height="4" fill="#D97706" />
    {/* 高光 */}
    <rect x="16" y="20" width="4" height="16" rx="2" fill="white" fillOpacity="0.3" />
  </svg>
)

// 卸妆液图标
export const MakeupRemoverIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="wipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0E7FF" />
        <stop offset="100%" stopColor="#C7D2FE" />
      </linearGradient>
    </defs>
    {/* 瓶身 */}
    <rect x="12" y="14" width="24" height="28" rx="4" fill="url(#wipeGrad)" />
    {/* 白色标签 */}
    <rect x="14" y="20" width="20" height="16" rx="2" fill="white" />
    {/* 按压泵 */}
    <rect x="20" y="8" width="8" height="6" rx="1" fill="#6366F1" />
    <rect x="18" y="6" width="12" height="3" rx="1" fill="#6366F1" />
    {/* 棉片图标 */}
    <ellipse cx="24" cy="28" rx="6" ry="4" fill="#C7D2FE" />
    <path d="M20 26c2-1 6-1 8 0" stroke="white" strokeWidth="1" />
  </svg>
)

// 护肤精华图标
export const SerumIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="serumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D1FAE5" />
        <stop offset="100%" stopColor="#6EE7B7" />
      </linearGradient>
      <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* 滴管 */}
    <path d="M24 4v10" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="8" r="3" fill="#059669" />
    {/* 瓶身 */}
    <rect x="16" y="14" width="16" height="28" rx="3" fill="url(#serumGrad)" />
    {/* 液体 */}
    <rect x="18" y="28" width="12" height="12" rx="2" fill="url(#dropGrad)" fillOpacity="0.6" />
    {/* 滴落效果 */}
    <circle cx="24" cy="44" r="2" fill="url(#dropGrad)" />
    {/* 高光 */}
    <rect x="18" y="16" width="4" height="12" rx="2" fill="white" fillOpacity="0.3" />
  </svg>
)

// 化妆刷图标
export const BrushIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="bristleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* 刷毛 */}
    <ellipse cx="24" cy="12" rx="10" ry="8" fill="url(#bristleGrad)" />
    <path d="M14 12c0 8 4 24 10 32 6-8 10-24 10-32" fill="url(#bristleGrad)" />
    {/* 刷毛纹理 */}
    <path d="M18 10v28M24 8v32M30 10v28" stroke="#D97706" strokeWidth="1" strokeOpacity="0.3" />
    {/* 金属环 */}
    <rect x="20" y="36" width="8" height="4" rx="1" fill="#D97706" />
    {/* 手柄 */}
    <rect x="21" y="40" width="6" height="6" rx="1" fill="#1F2937" />
  </svg>
)

// 镜子图标
export const MirrorIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F9FAFB" />
        <stop offset="50%" stopColor="#E5E7EB" />
        <stop offset="100%" stopColor="#D1D5DB" />
      </linearGradient>
    </defs>
    {/* 镜框 */}
    <circle cx="24" cy="20" r="14" fill="#1F2937" />
    {/* 镜面 */}
    <circle cx="24" cy="20" r="12" fill="url(#mirrorGrad)" />
    {/* 高光 */}
    <ellipse cx="19" cy="15" rx="5" ry="3" fill="white" fillOpacity="0.5" />
    {/* 底座 */}
    <rect x="22" y="34" width="4" height="8" fill="#1F2937" />
    <ellipse cx="24" cy="44" rx="8" ry="2" fill="#1F2937" />
  </svg>
)

// 口红收藏图标
export const LipstickCollectionIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="lc1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id="lc2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="lc3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    {/* 三支口红 */}
    <rect x="6" y="20" width="8" height="24" rx="2" fill="#1F2937" />
    <rect x="6" y="16" width="8" height="6" rx="1" fill="url(#lc1)" />
    
    <rect x="20" y="20" width="8" height="24" rx="2" fill="#1F2937" />
    <rect x="20" y="16" width="8" height="6" rx="1" fill="url(#lc2)" />
    
    <rect x="34" y="20" width="8" height="24" rx="2" fill="#1F2937" />
    <rect x="34" y="16" width="8" height="6" rx="1" fill="url(#lc3)" />
    
    {/* 高光 */}
    <rect x="7" y="18" width="2" height="3" rx="1" fill="white" fillOpacity="0.4" />
    <rect x="21" y="18" width="2" height="3" rx="1" fill="white" fillOpacity="0.4" />
    <rect x="35" y="18" width="2" height="3" rx="1" fill="white" fillOpacity="0.4" />
  </svg>
)

// 美妆蛋图标
export const BeautyBlenderIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="blenderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
    </defs>
    {/* 美妆蛋主体 */}
    <path d="M24 6c-10 0-18 10-18 20s8 14 18 14 18-4 18-14-8-20-18-20z" fill="url(#blenderGrad)" />
    {/* 上部分（平面） */}
    <ellipse cx="24" cy="12" rx="12" ry="6" fill="url(#blenderGrad)" stroke="#F9A8D4" strokeWidth="1" />
    {/* 高光 */}
    <ellipse cx="18" cy="18" rx="4" ry="6" fill="white" fillOpacity="0.3" />
  </svg>
)

// 眼线笔图标
export const EyelinerIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="linerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
    </defs>
    {/* 笔杆 */}
    <rect x="20" y="8" width="8" height="28" rx="4" fill="url(#linerGrad)" />
    {/* 金属笔尖 */}
    <path d="M20 36l4 8 4-8h-8z" fill="#D97706" />
    {/* 笔尖墨水 */}
    <path d="M22 42l2 4 2-4h-4z" fill="#1F2937" />
    {/* 盖子 */}
    <rect x="18" y="4" width="12" height="6" rx="1" fill="#1F2937" />
    <rect x="20" y="6" width="8" height="2" fill="#374151" />
  </svg>
)

// 定妆喷雾图标
export const SettingSprayIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="sprayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
    </defs>
    {/* 瓶身 */}
    <rect x="14" y="16" width="20" height="28" rx="4" fill="url(#sprayGrad)" />
    {/* 液体 */}
    <rect x="16" y="24" width="16" height="18" rx="2" fill="#3B82F6" fillOpacity="0.3" />
    {/* 喷头 */}
    <rect x="20" y="10" width="8" height="6" fill="#1F2937" />
    <rect x="18" y="8" width="12" height="3" rx="1" fill="#1F2937" />
    {/* 喷嘴 */}
    <rect x="22" y="4" width="4" height="4" fill="#1F2937" />
    {/* 水雾效果 */}
    <circle cx="24" cy="2" r="1" fill="#93C5FD" />
    <circle cx="22" cy="1" r="0.5" fill="#93C5FD" />
    <circle cx="26" cy="1" r="0.5" fill="#93C5FD" />
    {/* 高光 */}
    <rect x="16" y="18" width="4" height="16" rx="2" fill="white" fillOpacity="0.3" />
  </svg>
)
