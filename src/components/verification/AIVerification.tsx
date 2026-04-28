import { useState, useRef, useCallback } from 'react'
import { Camera, Upload, Sparkles, ShieldCheck, AlertCircle, CheckCircle, HelpCircle, X, Image as ImageIcon, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import { popularBrands } from '@/data/verificationData'
import VerificationResult from './VerificationResult'

export interface VerificationResultData {
  status: 'authentic' | 'suspicious' | 'counterfeit' | 'unknown'
  confidence: number
  features: {
    feature: string
    status: 'pass' | 'fail' | 'warning'
    description: string
  }[]
  advice: string
  productName: string
  brand: string
  price?: number
  purchaseChannel?: string
  skinType?: string
}

const mockResults: VerificationResultData[] = [
  {
    status: 'authentic',
    confidence: 96,
    features: [
      { feature: '包装印刷', status: 'pass', description: '印刷清晰，颜色准确' },
      { feature: '防伪标签', status: 'pass', description: '防伪码验证通过' },
      { feature: '材质质感', status: 'pass', description: '材质与正品一致' },
      { feature: '批号标识', status: 'pass', description: '批号格式正确' },
      { feature: '价格合理性', status: 'pass', description: '价格处于合理区间' }
    ],
    advice: '恭喜！该产品通过多项真伪验证，确认为正品。',
    productName: '雅诗兰黛小棕瓶精华液',
    brand: '雅诗兰黛'
  },
  {
    status: 'suspicious',
    confidence: 72,
    features: [
      { feature: '包装印刷', status: 'warning', description: '部分细节存在差异' },
      { feature: '防伪标签', status: 'warning', description: '防伪码验证存疑' },
      { feature: '材质质感', status: 'pass', description: '材质基本一致' },
      { feature: '批号标识', status: 'fail', description: '批号格式异常' },
      { feature: '价格合理性', status: 'warning', description: '价格偏低，需注意' }
    ],
    advice: '该产品存在部分可疑特征，建议联系官方客服进一步核实。',
    productName: '迪奥烈艳蓝金唇膏',
    brand: '迪奥'
  },
  {
    status: 'counterfeit',
    confidence: 89,
    features: [
      { feature: '包装印刷', status: 'fail', description: '印刷模糊，颜色偏差明显' },
      { feature: '防伪标签', status: 'fail', description: '无有效防伪码' },
      { feature: '材质质感', status: 'fail', description: '材质与正品差异大' },
      { feature: '批号标识', status: 'fail', description: '批号格式完全不符' },
      { feature: '价格合理性', status: 'fail', description: '价格远低于市场价' }
    ],
    advice: '该产品多项特征与正品不符，疑似假冒产品，请勿使用。',
    productName: '兰蔻粉水',
    brand: '兰蔻'
  }
]

// 购买渠道选项
const purchaseChannels = [
  '专柜',
  '天猫旗舰店',
  '京东自营',
  '唯品会',
  '代购',
  '免税店',
  '品牌官网',
  '抖音/小红书直播间',
  '其他'
]

// 肤质选项
const skinTypes = [
  { value: 'oily', label: '油皮', desc: 'T区出油多，毛孔粗大' },
  { value: 'dry', label: '干皮', desc: '皮肤干燥，易起皮' },
  { value: 'combination', label: '混油皮', desc: 'T区油，U区干' },
  { value: 'sensitive', label: '敏感肌', desc: '容易过敏，泛红' },
  { value: 'normal', label: '正常肌', desc: '皮肤状态稳定' }
]

interface AIVerificationProps {
  onClose?: () => void
}

export default function AIVerification({ onClose }: AIVerificationProps) {
  const [images, setImages] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [customBrand, setCustomBrand] = useState('')
  const [productName, setProductName] = useState('')
  const [purchaseChannel, setPurchaseChannel] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [skinType, setSkinType] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<VerificationResultData | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // 获取最终品牌名称
  const getFinalBrand = () => {
    return selectedBrand === 'custom' ? customBrand.trim() : selectedBrand
  }

  // 处理图片选择
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // 最多3张
      const remainingSlots = 3 - images.length
      const filesToProcess = Array.from(files).slice(0, remainingSlots)
      
      filesToProcess.forEach(file => {
        processImageFile(file)
      })
    }
  }

  // 处理图片文件
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      setImages(prev => [...prev, imageData].slice(0, 3))
      setResult(null)
    }
    reader.readAsDataURL(file)
  }

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  // 拖拽处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const remainingSlots = 3 - images.length
      const filesToProcess = Array.from(files).slice(0, remainingSlots)
      filesToProcess.forEach(file => processImageFile(file))
    }
  }, [images.length])

  // 打开相机
  const handleOpenCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setShowCamera(true)
    } catch (err) {
      console.error('无法访问相机:', err)
      setCameraError('无法访问相机，请检查权限设置或使用上传图片功能')
    }
  }

  // 关闭相机
  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
    if (cameraInputRef.current) {
      cameraInputRef.current.value = ''
    }
  }

  // 拍照
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg', 0.9)
        if (images.length < 3) {
          setImages(prev => [...prev, imageData].slice(0, 3))
          setResult(null)
        }
        if (images.length >= 2) {
          handleCloseCamera()
        }
      }
    }
  }

  // 开始分析
  const handleAnalyze = () => {
    const finalBrand = getFinalBrand()
    if (!images.length || !finalBrand) return
    
    setIsAnalyzing(true)
    
    // 模拟AI分析过程
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult({
        ...randomResult,
        productName: productName || '未知产品',
        brand: finalBrand,
        price: purchasePrice ? parseFloat(purchasePrice) : undefined,
        purchaseChannel: purchaseChannel || undefined,
        skinType: skinType || undefined
      })
      setIsAnalyzing(false)
    }, 2500)
  }

  // 重置
  const handleReset = () => {
    setImages([])
    setSelectedBrand('')
    setCustomBrand('')
    setProductName('')
    setPurchaseChannel('')
    setPurchasePrice('')
    setSkinType('')
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-pink-100 dark:border-pink-900/30">
      {/* 相机视图 */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={handleCloseCamera}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-h-[60vh] object-contain"
            />
          </div>
          <div className="p-8 flex flex-col items-center">
            {cameraError ? (
              <p className="text-red-400 text-center mb-4">{cameraError}</p>
            ) : (
              <p className="text-white/80 text-center mb-4">将产品置于镜头中央</p>
            )}
            <button
              onClick={handleCapture}
              disabled={images.length >= 3}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
            >
              <div className="w-14 h-14 bg-pink-500 rounded-full" />
            </button>
            {images.length >= 3 && (
              <p className="text-white/60 text-sm mt-2">已达最大上传数量(3张)</p>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI智能验真</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">上传产品信息，AI帮你辨别真假</p>
        </div>
      </div>

      {result ? (
        <VerificationResult result={result} onReset={handleReset} onClose={onClose || handleReset} />
      ) : (
        <>
          {/* 图片上传区域 */}
          <div 
            className={cn(
              "relative rounded-2xl border-2 border-dashed transition-all duration-300 mb-6 overflow-hidden",
              images.length > 0 
                ? "border-pink-300 bg-pink-50 dark:bg-pink-900/20" 
                : isDragging
                  ? "border-pink-500 bg-pink-100 dark:bg-pink-900/30"
                  : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 hover:border-pink-300"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {images.length > 0 ? (
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700">
                      <img 
                        src={img} 
                        alt={`产品图${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded">
                          正面照
                        </span>
                      )}
                      {index === 1 && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                          成分表
                        </span>
                      )}
                      {index === 2 && (
                        <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                          批号
                        </span>
                      )}
                    </div>
                  ))}
                  {images.length < 3 && (
                    <div 
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400">添加更多</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 text-center">
                  提示：建议上传正面照、成分表、批号照片以提高验真准确率
                </p>
              </div>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-pink-500" />
                </div>
                <p className="text-gray-600 dark:text-slate-300 text-center mb-2">
                  上传产品照片进行AI验真
                </p>
                <p className="text-gray-400 dark:text-slate-500 text-sm text-center mb-4">
                  最多上传3张图片（正面照、成分表、批号）
                </p>
                <div className="flex gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="verification-upload"
                    multiple
                  />
                  <label
                    htmlFor="verification-upload"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium cursor-pointer hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/40 transition-all active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    选择图片
                  </label>
                  <button 
                    onClick={handleOpenCamera}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-600 text-pink-600 dark:text-pink-400 rounded-full font-medium border-2 border-pink-200 dark:border-slate-500 hover:border-pink-300 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    拍照
                  </button>
                </div>
              </div>
            )}

            {/* 分析中遮罩 */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 border-4 border-pink-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin" />
                  <div className="absolute inset-4 bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">AI分析中...</p>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">正在识别产品特征</p>
              </div>
            )}
          </div>

          {/* 产品信息表单 */}
          <div className="space-y-4 mb-6">
            {/* 品牌选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                产品品牌 <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value)
                  if (e.target.value !== 'custom') {
                    setCustomBrand('')
                  }
                }}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              >
                <option value="">请选择品牌</option>
                {popularBrands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
                <option value="custom">其他品牌（手动输入）</option>
              </select>
              
              {/* 自定义品牌输入框 */}
              {selectedBrand === 'custom' && (
                <input
                  type="text"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  placeholder="请输入品牌名称"
                  className="mt-2 w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-pink-300 dark:border-pink-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus
                />
              )}
            </div>

            {/* 产品名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                产品名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="如：小棕瓶精华液 50ml"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* 购买渠道和价格 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  购买渠道
                </label>
                <select
                  value={purchaseChannel}
                  onChange={(e) => setPurchaseChannel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                >
                  <option value="">请选择</option>
                  {purchaseChannels.map((channel) => (
                    <option key={channel} value={channel}>
                      {channel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  购买价格（元）
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* 肤质选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                您的肤质 <span className="text-gray-400 font-normal">(选填，有助于给出更准确建议)</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {skinTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSkinType(skinType === type.value ? '' : type.value)}
                    className={cn(
                      "p-3 rounded-xl text-center transition-all",
                      skinType === type.value
                        ? "bg-pink-500 text-white shadow-lg"
                        : "bg-gray-50 dark:bg-slate-700 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    )}
                  >
                    <div className={cn(
                      "font-medium text-sm",
                      skinType === type.value ? "text-white" : "text-gray-700 dark:text-slate-300"
                    )}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 验真按钮 */}
          <button
            onClick={handleAnalyze}
            disabled={!images.length || !getFinalBrand() || !productName.trim() || isAnalyzing}
            className={cn(
              "w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2",
              images.length > 0 && getFinalBrand() && productName.trim() && !isAnalyzing
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-xl hover:shadow-pink-200 dark:hover:shadow-pink-900/40 active:scale-[0.98]"
                : "bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
            )}
          >
            <ShieldCheck className="w-5 h-5" />
            开始AI验真
          </button>

          {/* 提示 */}
          <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 dark:text-slate-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>验真结果仅供参考，建议结合官方验证渠道确认。如有疑虑，请联系品牌官方客服。</p>
          </div>
        </>
      )}
    </div>
  )
}
