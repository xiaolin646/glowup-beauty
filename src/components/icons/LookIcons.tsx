import React from 'react'

interface IconProps {
  size?: number
  className?: string
}

// 日常妆图标
export const DailyLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="dailyFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#dailyFace)" />
    {/* 眉毛 */}
    <path d="M12 18c2-2 6-2 8 0M28 18c2-2 6-2 8 0" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    {/* 眼睛 */}
    <ellipse cx="18" cy="24" rx="3" ry="2" fill="#1F2937" />
    <ellipse cx="30" cy="24" rx="3" ry="2" fill="#1F2937" />
    <circle cx="17" cy="23.5" r="1" fill="white" />
    <circle cx="29" cy="23.5" r="1" fill="white" />
    {/* 淡淡腮红 */}
    <ellipse cx="14" cy="30" rx="3" ry="2" fill="#FDA4AF" fillOpacity="0.5" />
    <ellipse cx="34" cy="30" rx="3" ry="2" fill="#FDA4AF" fillOpacity="0.5" />
    {/* 裸色嘴唇 */}
    <path d="M20 36c2 2 6 2 8 0" stroke="#F9A8D4" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// 晚宴妆图标
export const PartyLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="partyFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
      <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#partyFace)" />
    {/* 闪亮眼影 */}
    <ellipse cx="18" cy="22" rx="5" ry="3" fill="url(#goldShine)" fillOpacity="0.6" />
    <ellipse cx="30" cy="22" rx="5" ry="3" fill="url(#goldShine)" fillOpacity="0.6" />
    {/* 眼线 */}
    <path d="M13 22l-2-2M35 22l2-2" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 22c1-1 3-1 6 0M27 22c1-1 3-1 6 0" stroke="#1F2937" strokeWidth="2" />
    {/* 浓密睫毛 */}
    <path d="M14 20v2M16 19v3M20 19v3M22 20v2M26 20v2M28 19v3M32 19v3M34 20v2" stroke="#1F2937" strokeWidth="1" />
    {/* 高光颧骨 */}
    <path d="M14 28l-4-2M14 32l-4 2" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
    <path d="M34 28l4-2M34 32l4 2" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
    {/* 艳丽红唇 */}
    <path d="M18 36c3 3 9 3 12 0" fill="#DC2626" />
    <path d="M18 36c3 2 6 2 6 0" fill="#EF4444" />
    <path d="M24 36c0-2 3-2 6 0" fill="#B91C1C" />
  </svg>
)

// 甜美约会妆图标
export const DateLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="dateFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
      <linearGradient id="pinkBlush" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F9A8D4" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#dateFace)" />
    {/* 爱心腮红 */}
    <ellipse cx="12" cy="30" rx="4" ry="3" fill="url(#pinkBlush)" fillOpacity="0.4" />
    <ellipse cx="36" cy="30" rx="4" ry="3" fill="url(#pinkBlush)" fillOpacity="0.4" />
    {/* 爱心 */}
    <path d="M12 28c-2-2-2-5 0-6s4 2 4 4-2 4-4 4" fill="#EC4899" />
    <path d="M36 28c-2-2-2-5 0-6s4 2 4 4-2 4-4 4" fill="#EC4899" />
    {/* 温柔眉毛 */}
    <path d="M12 16c3-2 8-2 10 0M26 16c3-2 8-2 10 0" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    {/* 温柔眼妆 */}
    <ellipse cx="18" cy="22" rx="4" ry="2.5" fill="#F9A8D4" fillOpacity="0.6" />
    <ellipse cx="30" cy="22" rx="4" ry="2.5" fill="#F9A8D4" fillOpacity="0.6" />
    <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#1F2937" />
    <ellipse cx="30" cy="23" rx="2" ry="1.5" fill="#1F2937" />
    {/* 水润唇 */}
    <path d="M19 36c2.5 2.5 7.5 2.5 10 0" fill="#F472B6" />
    <path d="M20 35c2 1 6 1 8 0" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
)

// 清透裸妆图标
export const NaturalLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="naturalFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#naturalFace)" />
    {/* 自然眉毛 */}
    <path d="M12 18c2-1 5-1 8 0M28 18c2-1 5-1 8 0" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    {/* 自然眼妆 */}
    <ellipse cx="18" cy="23" rx="2" ry="1" fill="#92400E" />
    <ellipse cx="30" cy="23" rx="2" ry="1" fill="#92400E" />
    <circle cx="17.5" cy="22.5" r="0.5" fill="white" />
    <circle cx="29.5" cy="22.5" r="0.5" fill="white" />
    {/* 自然腮红 */}
    <ellipse cx="14" cy="28" rx="3" ry="2" fill="#FBBF24" fillOpacity="0.3" />
    <ellipse cx="34" cy="28" rx="3" ry="2" fill="#FBBF24" fillOpacity="0.3" />
    {/* 裸色嘴唇 */}
    <path d="M20 36c2 1.5 6 1.5 8 0" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// 韩系水光肌图标
export const KoreanGlowIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="glowFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
      <linearGradient id="glowHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#glowFace)" />
    {/* 水光高光 */}
    <ellipse cx="24" cy="20" rx="8" ry="4" fill="url(#glowHighlight)" fillOpacity="0.4" />
    <ellipse cx="16" cy="24" rx="3" ry="2" fill="white" fillOpacity="0.5" />
    <ellipse cx="32" cy="24" rx="3" ry="2" fill="white" fillOpacity="0.5" />
    {/* 高光点 */}
    <circle cx="20" cy="18" r="1" fill="white" />
    <circle cx="28" cy="18" r="1" fill="white" />
    <circle cx="24" cy="16" r="1" fill="white" />
    {/* 眉毛 */}
    <path d="M12 18c2-2 6-2 8 0M28 18c2-2 6-2 8 0" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
    {/* 清透眼妆 */}
    <ellipse cx="18" cy="23" rx="2.5" ry="1.5" fill="#1F2937" />
    <ellipse cx="30" cy="23" rx="2.5" ry="1.5" fill="#1F2937" />
    <circle cx="17" cy="22.5" r="0.8" fill="white" />
    <circle cx="29" cy="22.5" r="0.8" fill="white" />
    {/* 水光唇 */}
    <path d="M19 36c2.5 2 7.5 2 10 0" fill="#F9A8D4" />
    <ellipse cx="24" cy="35" rx="4" ry="1" fill="white" fillOpacity="0.4" />
  </svg>
)

// 复古港风图标
export const VintageLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="vintageFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#vintageFace)" />
    {/* 复古粗眉 */}
    <path d="M10 16c3-3 9-3 12 0" fill="#1F2937" />
    <path d="M26 16c3-3 9-3 12 0" fill="#1F2937" />
    <path d="M12 15c2-2 6-2 10 0" fill="#374151" />
    <path d="M26 15c2-2 6-2 10 0" fill="#374151" />
    {/* 上扬眼线 */}
    <path d="M13 22c0-2 2-4 5-2M35 22c0-2-2-4-5-2" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#1F2937" />
    <ellipse cx="30" cy="23" rx="2" ry="1.5" fill="#1F2937" />
    {/* 复古腮红 */}
    <path d="M10 28c4 2 10 2 14 0" fill="#F87171" fillOpacity="0.5" />
    <path d="M24 28c4 2 10 2 14 0" fill="#F87171" fillOpacity="0.5" />
    {/* 复古红唇 */}
    <path d="M16 35c4 4 12 4 16 0v3c-4 3-12 3-16 0z" fill="#DC2626" />
    <path d="M18 36c3 2 9 2 12 0" fill="#B91C1C" />
  </svg>
)

// 烟熏妆图标
export const SmokeyEyeIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="smokeyFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#FBCFE8" />
      </linearGradient>
      <linearGradient id="smokeyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="50%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#9CA3AF" />
      </linearGradient>
    </defs>
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="16" ry="18" fill="url(#smokeyFace)" />
    {/* 烟熏眼影 */}
    <ellipse cx="18" cy="22" rx="6" ry="4" fill="url(#smokeyGrad)" fillOpacity="0.8" />
    <ellipse cx="30" cy="22" rx="6" ry="4" fill="url(#smokeyGrad)" fillOpacity="0.8" />
    {/* 加重眼尾 */}
    <ellipse cx="14" cy="24" rx="3" ry="2" fill="#1F2937" />
    <ellipse cx="34" cy="24" rx="3" ry="2" fill="#1F2937" />
    {/* 烟熏眼线 */}
    <path d="M12 23l-3 1M36 23l3 1" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    {/* 眼睛 */}
    <ellipse cx="18" cy="23" rx="2" ry="1.5" fill="#1F2937" />
    <ellipse cx="30" cy="23" rx="2" ry="1.5" fill="#1F2937" />
    <circle cx="17" cy="22.5" r="0.8" fill="#9CA3AF" />
    <circle cx="29" cy="22.5" r="0.8" fill="#9CA3AF" />
    {/* 深色嘴唇 */}
    <path d="M18 36c3 2 9 2 12 0" fill="#7F1D1D" />
    <path d="M20 35c2 1 6 1 8 0" stroke="#991B1B" strokeWidth="1" />
  </svg>
)

// 新娘妆图标
export const BridalLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="bridalFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FDF2F8" />
      </linearGradient>
      <linearGradient id="pearlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F9FAFB" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
    {/* 头纱 */}
    <path d="M8 8c8 4 24 4 32 0v20c-8 4-24 4-32 0z" fill="white" fillOpacity="0.6" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="24" cy="8" r="2" fill="url(#pearlGrad)" />
    <circle cx="20" cy="10" r="1.5" fill="url(#pearlGrad)" />
    <circle cx="28" cy="10" r="1.5" fill="url(#pearlGrad)" />
    {/* 脸型 */}
    <ellipse cx="24" cy="28" rx="14" ry="16" fill="url(#bridalFace)" stroke="#FBCFE8" strokeWidth="1" />
    {/* 精致眉毛 */}
    <path d="M14 22c2-1 5-1 8 0M26 22c2-1 5-1 8 0" stroke="#92400E" strokeWidth="1" strokeLinecap="round" />
    {/* 温柔眼妆 */}
    <ellipse cx="18" cy="26" rx="3" ry="2" fill="#FECDD3" fillOpacity="0.6" />
    <ellipse cx="30" cy="26" rx="3" ry="2" fill="#FECDD3" fillOpacity="0.6" />
    <ellipse cx="18" cy="27" rx="1.5" ry="1" fill="#92400E" />
    <ellipse cx="30" cy="27" rx="1.5" ry="1" fill="#92400E" />
    {/* 珍珠高光 */}
    <circle cx="16" cy="24" r="0.8" fill="white" />
    <circle cx="32" cy="24" r="0.8" fill="white" />
    {/* 温柔腮红 */}
    <ellipse cx="14" cy="32" rx="4" ry="2" fill="#FECDD3" fillOpacity="0.5" />
    <ellipse cx="34" cy="32" rx="4" ry="2" fill="#FECDD3" fillOpacity="0.5" />
    {/* 玫瑰唇 */}
    <path d="M19 38c2.5 2 7.5 2 10 0" fill="#F43F5E" />
    <path d="M20 37c2 1 6 1 8 0" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
)

// 精灵妆图标
export const FantasyLookIcon: React.FC<IconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <defs>
      <linearGradient id="fantasyFace" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF2F8" />
        <stop offset="100%" stopColor="#EDE9FE" />
      </linearGradient>
      <linearGradient id="blueEye" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
    {/* 尖耳朵 */}
    <path d="M6 20l-4-8 8 4zM42 20l4-8-8 4z" fill="#FBCFE8" />
    <path d="M8 18l-2-4 4 2zM40 18l2-4-4 2z" fill="#EDE9FE" />
    {/* 脸型 */}
    <ellipse cx="24" cy="26" rx="14" ry="16" fill="url(#fantasyFace)" />
    {/* 精灵眼影 */}
    <ellipse cx="18" cy="24" rx="5" ry="3" fill="#C4B5FD" fillOpacity="0.6" />
    <ellipse cx="30" cy="24" rx="5" ry="3" fill="#C4B5FD" fillOpacity="0.6" />
    {/* 蓝色眼睛 */}
    <ellipse cx="18" cy="24" rx="2.5" ry="2" fill="url(#blueEye)" />
    <ellipse cx="30" cy="24" rx="2.5" ry="2" fill="url(#blueEye)" />
    <circle cx="18" cy="24" r="1" fill="#1F2937" />
    <circle cx="30" cy="24" r="1" fill="#1F2937" />
    <circle cx="17" cy="23.5" r="0.8" fill="white" />
    <circle cx="29" cy="23.5" r="0.8" fill="white" />
    {/* 精灵高光 */}
    <path d="M24 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#FCD34D" />
    <circle cx="24" cy="12" r="1" fill="white" />
    {/* 梦幻唇 */}
    <path d="M19 36c2.5 2 7.5 2 10 0" fill="#A78BFA" />
    <path d="M20 35c2 1 6 1 8 0" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
)
