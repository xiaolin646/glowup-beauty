import { Heart, ShoppingCart, Star, Shield, Award, Flame, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddCart: (product: Product) => void
  onLike: (id: string | number) => void
  onClick: (product: Product) => void
  isLiked?: boolean
  variant?: 'default' | 'compact' | 'list'
}

const mockImage = (seed: string | number) => `https://picsum.photos/seed/${seed}/300/300`

export default function ProductCard({ product, onAddCart, onLike, onClick, isLiked, variant = 'default' }: ProductCardProps) {

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`
  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w+'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k+'
    return num.toString()
  }

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0

  // Compact variant - always show add to cart button
  if (variant === 'compact') {
    return (
      <div 
        className="w-36 flex-shrink-0 cursor-pointer"
        onClick={() => onClick(product)}
      >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 group">
          <img src={mockImage(product.id)} alt={product.name} className="w-full h-full object-cover" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isCertified && (
              <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded flex items-center gap-0.5">
                <Shield className="w-3 h-3" /> 严选
              </span>
            )}
            {product.isHot && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded flex items-center gap-0.5">
                <Flame className="w-3 h-3" /> 热
              </span>
            )}
          </div>

          {/* Quick Add */}
          <button
            onClick={(e) => { e.stopPropagation(); onAddCart(product); }}
            className="absolute bottom-2 right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors active:bg-pink-600 z-10"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>

          {/* Discount Tag */}
          {discount > 0 && (
            <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-pink-500 text-white text-xs rounded">
              -{discount}%
            </span>
          )}
        </div>

        <div className="mt-2 px-1">
          <p className="text-xs text-gray-500 dark:text-slate-400">{product.brand}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-slate-100 line-clamp-2 mt-0.5">{product.name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-pink-600 font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 dark:text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div 
        className="flex gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-md transition-all cursor-pointer"
        onClick={() => onClick(product)}
      >
        <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700">
          <img src={mockImage(product.id)} alt={product.name} className="w-full h-full object-cover" />
          {product.isCertified && (
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded flex items-center gap-0.5">
              <Shield className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {product.merchant?.isVerified && (
              <span className="text-xs text-pink-500">【{product.merchant.name}】</span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900 mt-0.5 line-clamp-2">{product.name}</p>
          
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">销量 {formatNumber(product.sales || 0)}</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-pink-600">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onAddCart(product); }}
              className="px-3 py-1.5 bg-pink-500 text-white text-xs rounded-full hover:bg-pink-600 transition-colors"
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default card
  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:border-pink-200 dark:hover:border-pink-700 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={mockImage(product.id)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isCertified && (
            <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-lg font-medium flex items-center gap-1 shadow-sm">
              <Shield className="w-3.5 h-3.5" /> 臻品严选
            </span>
          )}
          {product.isHot && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg font-medium flex items-center gap-1 shadow-sm">
              <Flame className="w-3.5 h-3.5" /> 热销
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-lg font-medium flex items-center gap-1 shadow-sm">
              <Zap className="w-3.5 h-3.5" /> 新品
            </span>
          )}
        </div>

        {/* Discount Tag */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-pink-500 text-white text-xs font-bold rounded-lg">
            -{discount}%
          </span>
        )}

        {/* Quick Add */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onAddCart(product); }}
            className="flex-1 py-2.5 bg-pink-500 text-white text-sm font-medium rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 shadow-lg active:bg-pink-600"
          >
            <ShoppingCart className="w-4 h-4" />
            加入购物车
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onLike(product.id); }}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-colors",
              isLiked ? "bg-red-500 text-white" : "bg-white/90 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-white")} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-pink-500 font-medium">{product.brand}</p>
        
        {/* Name */}
        <p className="text-sm font-medium text-gray-900 dark:text-slate-100 mt-1 line-clamp-2 leading-snug">{product.name}</p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rating & Sales */}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium text-gray-700 dark:text-slate-300">{product.rating}</span>
          </div>
          <span className="text-gray-300 dark:text-slate-600">|</span>
          <span>{formatNumber(product.reviews)}条评价</span>
          <span className="text-gray-300 dark:text-slate-600">|</span>
          <span>销量 {formatNumber(product.sales || 0)}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-pink-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 dark:text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {product.merchant && product.merchant.isVerified && (
            <span className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {product.merchant.name}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Certified Badge Component
export function CertifiedBadge() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm rounded-full font-medium">
      <Shield className="w-4 h-4" />
      臻品严选
    </div>
  )
}

// Hot Badge Component  
export function HotBadge() {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs rounded-lg font-medium">
      <Flame className="w-3 h-3" />
      热销
    </div>
  )
}
