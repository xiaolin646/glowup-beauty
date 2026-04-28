import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, CheckCircle, Minus, Plus, ChevronLeft } from 'lucide-react';
import { Product, Review, ProductDetail } from '../types';

// Mock 产品数据
const mockProducts: Record<number, ProductDetail> = {
  1: {
    id: 1,
    name: '小灯泡精华液',
    brand: 'SK-II',
    price: 1199,
    originalPrice: 1499,
    rating: 4.9,
    category: '精华',
    subcategory: '美白精华',
    description: 'SK-II PITERA™精华露，蕴含超过90%的PITERA™成分，有效改善肌肤细纹、皱纹、肤色不均等问题。',
    stock: 50,
    tags: ['美白', '淡斑', '提亮'],
    ingredients: ['PITERA™', '烟酰胺', '抗坏血酸葡糖苷'],
    suitableSkinTypes: ['干性', '中性', '油性'],
    certification: ['国家药监局认证', 'FDA认证'],
    verified: true,
    salesCount: 25800,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600',
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600',
    ],
    details: {
      effect: '深层补水、提亮肤色、淡化色斑、改善暗沉',
      howToUse: '早晚洁面后，取适量精华液于掌心，轻轻涂抹于面部和颈部，配合提拉按摩效果更佳。',
      precautions: '仅供外用，避免接触眼睛。如有不适，请停止使用并咨询专业医师。'
    },
    variants: [
      { size: '50ml', stock: 30 },
      { size: '100ml', stock: 20 },
    ],
    reviewsCount: 12580,
    reviewList: [
      { id: 1, userId: 'u1', userName: '美妆达人小A', rating: 5, content: '用了三个月，皮肤真的变亮了！强烈推荐！', date: '2026-03-15', skinType: '干性', helpful: 256 },
      { id: 2, userId: 'u2', userName: '护肤新手', rating: 5, content: '质地很清爽，不油腻，吸收很快。', date: '2026-03-10', skinType: '油性', helpful: 128 },
      { id: 3, userId: 'u3', userName: '敏感肌妈妈', rating: 4, content: '整体不错，温和不刺激，会回购。', date: '2026-03-05', skinType: '敏感肌', helpful: 64 },
    ],
    relatedProducts: []
  },
  2: {
    id: 2,
    name: '大红瓶面霜',
    brand: 'SK-II',
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviewsCount: 8960,
    category: '面霜',
    description: 'SK-II经典面霜，蕴含PITERA™和R.N.A Complex技术，深层滋养肌肤，提升肌肤弹性。',
    stock: 80,
    tags: ['保湿', '抗老', '紧致'],
    ingredients: ['PITERA™', 'R.N.A Complex', '泛醇'],
    suitableSkinTypes: ['干性', '中性'],
    certification: ['国家药监局认证'],
    verified: true,
    salesCount: 18600,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600',
    ],
    details: {
      effect: '深层保湿、抗皱紧致、提升弹性',
      howToUse: '早晚精华后使用，取适量均匀涂抹于面部，轻柔按摩至吸收。',
      precautions: '请在有效期内使用，如有过敏现象请立即停用。'
    },
    reviewList: [],
    relatedProducts: []
  }
};

// 模拟获取产品详情
const getProductById = async (id: number): Promise<ProductDetail | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts[id] || null;
};

// 模拟获取推荐产品
const getRelatedProducts = (category: string): Product[] => {
  return [
    { id: 2, name: '大红瓶面霜', brand: 'SK-II', price: 899, rating: 4.8, reviews: 8960, category: '面霜', verified: true },
    { id: 3, name: '神仙水', brand: 'SK-II', price: 1199, rating: 4.9, reviews: 25600, category: '爽肤水', verified: true },
    { id: 4, name: '小银瓶精华', brand: 'SK-II', price: 1399, rating: 4.7, reviews: 5680, category: '精华', verified: true },
  ];
};

// Badge 组件
const Badge: React.FC<{ children: React.ReactNode; className?: string; variant?: string }> = ({ children, className = '', variant = 'default' }) => {
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    secondary: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    outline: 'bg-transparent border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

// Card 组件
const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`} onClick={onClick}>
    {children}
  </div>
);

// Button 组件
const Button: React.FC<{ children: React.ReactNode; className?: string; variant?: string; onClick?: () => void }> = ({ children, className = '', variant = 'default', onClick }) => {
  const variants: Record<string, string> = {
    default: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white',
    outline: 'bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20',
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
};

interface ProductDetailPageProps {
  productId?: number;
  onBack?: () => void;
  onProductClick?: (productId: string | number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId = 1, onBack, onProductClick }) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await getProductById(productId);
      if (data) {
        setProduct(data);
        setSelectedSize(data.variants?.[0]?.size || '');
        if (data.category) {
          setRelatedProducts(getRelatedProducts(data.category));
        }
      }
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    alert(`已添加 ${quantity} 件「${product?.name}」到购物车`);
  };

  const handleBuyNow = () => {
    alert(`立即购买 ${quantity} 件「${product?.name}」`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-gray-500 dark:text-gray-400 mb-4">产品不存在</p>
        <Button onClick={onBack}>返回</Button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-pink-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => onBack?.()}
            className="p-2 -ml-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{product.name}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：图片展示 */}
          <div className="space-y-4">
            {/* 主图 */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.verified && (
                <div className="absolute top-4 left-4">
                  <Badge className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    已验真
                  </Badge>
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4">
                  <Badge variant="error">-{discount}%</Badge>
                </div>
              )}
            </div>

            {/* 缩略图 */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-pink-500 ring-2 ring-pink-200 dark:ring-pink-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 右侧：产品信息 */}
          <div className="space-y-6">
            {/* 品牌 & 名称 */}
            <div>
              <p className="text-pink-500 font-medium text-sm mb-1">{product.brand}</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 dark:text-gray-400">{product.reviewsCount.toLocaleString()} 条评价</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 dark:text-gray-400">销量 {product.salesCount?.toLocaleString()}</span>
              </div>
            </div>

            {/* 价格 */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-pink-600 dark:text-pink-400">¥{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">¥{product.originalPrice}</span>
                    <span className="text-sm text-pink-500">省 ¥{product.originalPrice - product.price}</span>
                  </>
                )}
              </div>
            </div>

            {/* 规格选择 */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择规格</h3>
                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.size}
                      onClick={() => setSelectedSize(variant.size!)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedSize === variant.size
                          ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {variant.size}
                      <span className="ml-1 text-xs text-gray-400">({variant.stock}件)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 数量选择 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">数量</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">库存 {product.stock} 件</span>
              </div>
            </div>

            {/* 标签 */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                加入购物车
              </Button>
              <Button
                className="flex-1"
                onClick={handleBuyNow}
              >
                立即购买
              </Button>
            </div>

            {/* 服务保障 */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col items-center text-center gap-1">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">正品保障</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">急速发货</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <CheckCircle className="w-5 h-5 text-pink-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">七天退换</span>
              </div>
            </div>

            {/* 适用肤质 */}
            {product.suitableSkinTypes && product.suitableSkinTypes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">适合肤质</h3>
                <div className="flex flex-wrap gap-2">
                  {product.suitableSkinTypes.map((type) => (
                    <Badge key={type} variant="secondary">{type}肌</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 详情 & 评价 Tab */}
        <div className="mt-12">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'details'
                  ? 'text-pink-600 dark:text-pink-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              详情
              {activeTab === 'details' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-pink-600 dark:text-pink-400'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              评价 ({product.reviewList.length})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
          </div>

          <div className="py-6">
            {activeTab === 'details' ? (
              <div className="space-y-6">
                {/* 产品功效 */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">产品功效</h3>
                  <p className="text-gray-600 dark:text-gray-400">{product.details.effect}</p>
                </Card>

                {/* 使用方法 */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">使用方法</h3>
                  <p className="text-gray-600 dark:text-gray-400">{product.details.howToUse}</p>
                </Card>

                {/* 注意事项 */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">注意事项</h3>
                  <p className="text-gray-600 dark:text-gray-400">{product.details.precautions}</p>
                </Card>

                {/* 成分 */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">核心成分</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing) => (
                        <Badge key={ing} variant="outline">{ing}</Badge>
                      ))}
                    </div>
                  </Card>
                )}

                {/* 认证 */}
                {product.certification && product.certification.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">产品认证</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certification.map((cert) => (
                        <Badge key={cert}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {product.reviewList.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">暂无评价</p>
                  </div>
                ) : (
                  product.reviewList.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-medium">
                          {review.userName[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">{review.userName}</span>
                              {review.skinType && (
                                <span className="ml-2 text-xs text-gray-500">{review.skinType}肌</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">{review.content}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-gray-400">{review.date}</span>
                            <span className="text-xs text-gray-400">有帮助 ({review.helpful})</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* 相关推荐 */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Card
                  key={p.id}
                  className="overflow-hidden"
                  onClick={() => onProductClick?.(p.id)}
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                    <img
                      src={p.image || 'https://via.placeholder.com/200'}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-pink-500">{p.brand}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{p.name}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">{p.rating}</span>
                    </div>
                    <p className="mt-1 text-pink-600 font-semibold">¥{p.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetailPage;
