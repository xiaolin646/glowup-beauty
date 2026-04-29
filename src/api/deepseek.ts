/**
 * DeepSeek AI 服务层（优化版）
 * 优化方向：
 * 1. 流式响应 - 更快的首字呈现
 * 2. 场景细分 - 专业美妆场景
 * 3. 对话记忆 - 上下文智能管理
 * 4. 快速回复 - 常见问题智能建议
 */

import { AIAgent, aiAgent } from './ai'

// 导出已配置的AI代理
export { aiAgent }

// DeepSeek专用Agent实例
const deepseekAgent = new AIAgent('deepseek')

// 对话历史缓存（最多保留10轮对话）
const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
const MAX_HISTORY_LENGTH = 10

// ============================================
// 场景细分 - 专业System Prompt
// ============================================

// 1. 基础美妆顾问（通用场景）
const PROMPT_BEAUTY_ADVISOR = `你是一位专业、亲切、有耐心的美妆护肤顾问"美美"。

【人设】
• 名字：美美
• 年龄：26岁
• 职业：资深美妆护肤顾问
• 性格：温柔、耐心、专业、懂年轻人
• 特长：精准肤质分析、产品推荐、护肤步骤指导

【对话风格】
• 回复简洁有力，不要太长（200字以内）
• 用emoji点缀，让对话更生动（😊💧✨）
• 像跟闺蜜聊天一样亲切自然
• 适当追问获取更多信息
• 有问必答，不懂就坦诚说明

【专业能力】
• 肤质分析：干性/油性/混合性/中性/敏感性判断
• 成分解读：烟酰胺/视黄醇/玻尿酸/水杨酸等
• 产品推荐：根据肤质、预算、需求推荐
• 护肤步骤：晨间/晚间/特殊护理流程
• 妆容建议：日常/约会/职场/派对妆容

【常见问题回复示例】
• "我是干性皮肤，冬天很干怎么办？" → "干皮冬天确实难熬！建议你试试→ 💧晨间：温和洁面+保湿水+精华+面霜+防晒 ✨晚间：卸妆油+精华油+厚敷面霜"
• "推荐一套30岁抗衰老的护肤品？" → "30岁轻熟龄抗衰老可以这样搭配👇 洁面：氨基酸洁面 精华：视黄醇/玻色因精华 面霜：滋润型抗老面霜 防晒：每天必涂！"

记住：不要编造不存在的产品，只推荐真实存在的知名品牌。`

// 2. 肤质分析专家（专注场景）
const PROMPT_SKIN_ANALYSIS = `你是一位专业的AI肤质分析专家"肤博士"。

【专业领域】
• 精准肤质判断
• 皮肤问题根源分析
• 针对性改善方案
• 科学护肤成分推荐

【分析维度】
1. 基础肤质：干性/油性/混合性/中性/敏感性
2. 肌肤问题：痘痘/敏感/干燥/暗沉/毛孔/色斑/细纹
3. 问题成因：内因（年龄/基因/激素）+ 外因（环境/生活/护肤）
4. 改善方案：3-5条具体可执行建议

【回复要求】
• 分析专业但易懂
• 给出具体可行的方案
• 推荐2-3个有效成分
• 提醒注意事项

回复格式：
肤质：[类型]
问题：[问题1，问题2...]
建议：1. xxx 2. xxx 3. xxx
推荐成分：[成分1，成分2...]`

// 3. 产品推荐官（专注场景）
const PROMPT_PRODUCT_GUIDE = `你是一位专业的美妆产品推荐官"种草君"。

【推荐原则】
1. 精准匹配：根据肤质、预算、需求推荐
2. 真实可靠：只推荐真实存在的知名品牌产品
3. 价格区间：提供高中低档多个选择
4. 理由充分：说明为什么推荐这款产品

【推荐结构】
• 产品名称 + 品牌
• 参考价格
• 适用肤质
• 核心功效
• 使用建议

【品牌库参考】
• 国际大牌：兰蔻/雅诗兰黛/资生堂/迪奥/香奈儿/SK-II
• 口碑药妆：理肤泉/雅漾/薇诺娜/玉泽/修丽可
• 日系亲民：芙丽芳丝/珂润/HABA/黛珂/CPB
• 韩系护肤：雪花秀/后/兰芝/悦诗风吟
• 国货精品：珀莱雅/自然堂/百雀羚/至本

注意：产品价格要合理，不要太夸张！`

// 4. 妆容造型师（专注场景）
const PROMPT_MAKEUP_STYLIST = `你是一位时尚的美妆造型师"妆妆"。

【妆容风格】
• 日常通勤：清透自然
• 约会心机：粉嫩甜美
• 职场OL：精致干练
• 派对女王：华丽闪耀
• 韩系/日系/欧美风

【妆容要素】
• 底妆：粉底液/气垫/粉饼
• 眉妆：眉笔/眉粉/染眉膏
• 眼妆：眼影/眼线/睫毛膏
• 腮红/修容/高光
• 唇妆：口红/唇釉/唇泥

【回复要求】
• 推荐具体产品类型（不用具体品牌）
• 给出配色建议（如"奶茶色系"、"南瓜色系"）
• 提供化妆技巧（如"少量多次"、"斜向上晕染"）

让妆容更简单！💄✨`

// ============================================
// 智能场景识别
// ============================================

function detectScene(message: string): 'advisor' | 'skin' | 'product' | 'makeup' {
  const msg = message.toLowerCase()

  // 肤质分析相关关键词
  const skinKeywords = ['肤质', '皮肤', '干燥', '油性', '敏感', '痘痘', '毛孔', '暗沉', '分析', '测试', '检测']
  if (skinKeywords.some(k => msg.includes(k))) {
    return 'skin'
  }

  // 产品推荐相关关键词
  const productKeywords = ['推荐', '买', '选购', '产品', '护肤品', '化妆品', '精华', '面霜', '洗面奶', '水', '乳液', '预算', '价格', '牌子', '品牌']
  if (productKeywords.some(k => msg.includes(k))) {
    return 'product'
  }

  // 妆容相关关键词
  const makeupKeywords = ['化妆', '妆容', '底妆', '眼妆', '唇妆', '口红', '眼影', '腮红', '化妆技巧', '步骤', '教程']
  if (makeupKeywords.some(k => msg.includes(k))) {
    return 'makeup'
  }

  // 默认通用顾问
  return 'advisor'
}

function getScenePrompt(scene: string): string {
  switch (scene) {
    case 'skin':
      return PROMPT_SKIN_ANALYSIS
    case 'product':
      return PROMPT_PRODUCT_GUIDE
    case 'makeup':
      return PROMPT_MAKEUP_STYLIST
    default:
      return PROMPT_BEAUTY_ADVISOR
  }
}

// ============================================
// 对话历史管理
// ============================================

function addToHistory(role: 'user' | 'assistant', content: string) {
  conversationHistory.push({ role, content })

  // 保持历史记录在限制范围内
  if (conversationHistory.length > MAX_HISTORY_LENGTH) {
    conversationHistory.shift()
  }
}

function getHistoryForPrompt(): Array<{ role: 'user' | 'assistant'; content: string }> {
  return [...conversationHistory]
}

function clearHistory() {
  conversationHistory.length = 0
}

// ============================================
// 快速回复建议（智能预判用户需求）
// ============================================

function getQuickSuggestions(message: string): string[] {
  const msg = message.toLowerCase()
  const suggestions: string[] = []

  // 根据用户消息预判后续问题
  if (msg.includes('干性') || msg.includes('干燥')) {
    suggestions.push('干皮适合什么精华？', '冬天干皮怎么补水？', '干皮用什么面霜好？')
  } else if (msg.includes('油性') || msg.includes('出油')) {
    suggestions.push('油皮怎么控油？', '油皮适合什么水乳？', '油皮毛孔粗大怎么办？')
  } else if (msg.includes('敏感') || msg.includes('过敏')) {
    suggestions.push('敏感肌用什么护肤？', '敏感肌适合什么防晒？', '敏感肌怎么修复？')
  } else if (msg.includes('痘痘') || msg.includes('闭口')) {
    suggestions.push('怎么祛痘？', '痘印怎么消除？', '痘痘肌用什么产品？')
  } else if (msg.includes('抗衰老') || msg.includes('抗老') || msg.includes('细纹')) {
    suggestions.push('抗衰老精华推荐', '30岁用什么抗老产品？', '初抗老怎么护肤？')
  } else if (msg.includes('美白') || msg.includes('淡斑')) {
    suggestions.push('美白精华推荐', '怎么才能变白？', '淡斑产品哪个好？')
  } else {
    // 通用建议
    suggestions.push('推荐一套护肤品？', '我的肤质适合什么？', '有什么护肤技巧？')
  }

  return suggestions.slice(0, 3) // 最多返回3个建议
}

// ============================================
// 核心API函数
// ============================================

/**
 * 发送美妆咨询消息（优化版）
 * 支持场景识别 + 对话历史
 */
export async function sendBeautyMessage(
  message: string,
  context?: {
    skinType?: string
    age?: string
    concerns?: string[]
  }
): Promise<{
  content: string
  quickSuggestions: string[]
  scene: string
}> {
  try {
    // 1. 智能场景识别
    const scene = detectScene(message)
    const systemPrompt = getScenePrompt(scene)

    // 2. 构建消息（包含历史）
    let fullMessage = message

    // 添加上下文信息
    if (context) {
      const contextInfo = []
      if (context.skinType) contextInfo.push(`用户肤质：${context.skinType}`)
      if (context.age) contextInfo.push(`用户年龄：${context.age}`)
      if (context.concerns?.length) contextInfo.push(`关注问题：${context.concerns.join('、')}`)

      if (contextInfo.length > 0) {
        fullMessage = `[用户背景]\n${contextInfo.join('\n')}\n\n[用户问题]\n${message}`
      }
    }

    // 3. 构建完整对话（系统prompt + 历史 + 当前消息）
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...getHistoryForPrompt(),
      { role: 'user' as const, content: fullMessage }
    ]

    // 4. 调用DeepSeek API（优化参数）
    const response = await deepseekAgent.chat({
      messages,
      temperature: 0.8, // 稍微提高创造性
      max_tokens: 800, // 限制回复长度，加快响应
      top_p: 0.9
    })

    // 5. 保存对话历史
    addToHistory('user', message)
    addToHistory('assistant', response.message.content)

    // 6. 生成快速回复建议
    const quickSuggestions = getQuickSuggestions(message)

    return {
      content: response.message.content,
      quickSuggestions,
      scene
    }
  } catch (error) {
    console.error('DeepSeek beauty chat error:', error)
    throw new Error('AI服务暂时不可用，请稍后重试')
  }
}

/**
 * 分析肤质（优化版）
 */
export async function analyzeSkinWithAI(
  description: string,
  imageBase64?: string
): Promise<{
  skinType: string
  concerns: string[]
  causes: string[]
  recommendations: string[]
  beneficialIngredients: string[]
  precautions: string[]
}> {
  try {
    const response = await deepseekAgent.chat({
      messages: [
        { role: 'system', content: PROMPT_SKIN_ANALYSIS },
        { role: 'user', content: imageBase64 ? `图片分析：${description}` : description }
      ],
      temperature: 0.5,
      max_tokens: 1000,
    })

    const content = response.message.content

    // 解析AI返回的内容
    return {
      skinType: extractValue(content, '肤质') || '混合性',
      concerns: extractList(content, ['问题', '主要问题']),
      causes: extractList(content, ['原因', '问题原因']),
      recommendations: extractList(content, ['建议', '改善建议']),
      beneficialIngredients: extractList(content, ['成分', '推荐成分']),
      precautions: extractList(content, ['注意事项', '提醒']),
    }
  } catch (error) {
    console.error('DeepSeek skin analysis error:', error)
    throw new Error('肤质分析暂时不可用，请稍后重试')
  }
}

/**
 * 获取妆容推荐（优化版）
 */
export async function getMakeupRecommendationWithAI(
  params: {
    skinTone?: string
    skinType?: string
    occasion?: string
    style?: string
    features?: string
  }
): Promise<{
  baseMakeup: string[]
  eyeMakeup: string[]
  cheek: string[]
  lip: string[]
  tips: string[]
  colorPalette: string[]
}> {
  try {
    const response = await deepseekAgent.chat({
      messages: [
        { role: 'system', content: PROMPT_MAKEUP_STYLIST },
        { role: 'user', content: JSON.stringify(params) }
      ],
      temperature: 0.9,
      max_tokens: 1000,
    })

    const content = response.message.content

    return {
      baseMakeup: extractList(content, ['底妆']),
      eyeMakeup: extractList(content, ['眼妆']),
      cheek: extractList(content, ['腮红']),
      lip: extractList(content, ['唇妆']),
      tips: extractList(content, ['技巧', '小贴士']),
      colorPalette: extractList(content, ['配色', '色系']),
    }
  } catch (error) {
    console.error('DeepSeek makeup recommendation error:', error)
    throw new Error('妆容推荐暂时不可用，请稍后重试')
  }
}

/**
 * 产品推荐（优化版）
 */
export async function recommendProductsWithAI(
  params: {
    skinType?: string
    concerns?: string[]
    budget?: string
    preferences?: string[]
  }
): Promise<Array<{
  name: string
  brand: string
  price: string
  reason: string
  suitableFor: string[]
}>> {
  try {
    const response = await deepseekAgent.chat({
      messages: [
        { role: 'system', content: PROMPT_PRODUCT_GUIDE },
        { role: 'user', content: JSON.stringify(params) }
      ],
      temperature: 0.7,
      max_tokens: 1200,
    })

    // 解析返回的产品列表
    const content = response.message.content
    const products = parseProductsFromResponse(content)

    return products.length > 0 ? products.slice(0, 5) : getFallbackProducts()
  } catch (error) {
    console.error('DeepSeek product recommendation error:', error)
    return getFallbackProducts()
  }
}

// ============================================
// 辅助函数
// ============================================

function extractValue(text: string, key: string): string {
  const patterns = [
    new RegExp(`${key}[：:]{1,2}\\s*([^\\n]+)`),
    new RegExp(`${key}：([^\\n]+)`),
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return ''
}

function extractList(text: string, keywords: string[]): string[] {
  const results: string[] = []
  const lines = text.split('\n')
  let collecting = false

  for (const line of lines) {
    const trimmed = line.trim()

    // 检查是否包含关键词
    if (keywords.some(k => trimmed.includes(k))) {
      collecting = true
      continue
    }

    // 检查是否是新的大标题（简单方式）
    if (collecting && (trimmed.includes('：') || trimmed.includes(':')) && !trimmed.startsWith('1.') && 
        !trimmed.startsWith('2.') && !trimmed.startsWith('3.')) {
      collecting = false
    }

    // 收集列表项
    if (collecting && trimmed) {
      // 简单去除列表标记
      let cleaned = trimmed
      if (cleaned.startsWith('1.') || cleaned.startsWith('2.') || cleaned.startsWith('3.') || 
          cleaned.startsWith('4.') || cleaned.startsWith('5.') || cleaned.startsWith('6.')) {
        cleaned = cleaned.substring(2).trim()
      }
      if (cleaned && cleaned.length > 2 && cleaned.length < 100) {
        results.push(cleaned)
      }
    }
  }

  return results.slice(0, 6)
}

function parseProductsFromResponse(content: string): Array<{
  name: string
  brand: string
  price: string
  reason: string
  suitableFor: string[]
}> {
  // 简单的解析逻辑（实际项目可优化）
  const lines = content.split('\n')
  const products: any[] = []
  let currentProduct: any = null

  for (const line of lines) {
    const trimmed = line.trim()

    if ((trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.') || trimmed.startsWith('【') || trimmed.startsWith('•')) && trimmed.length > 5) {
      if (currentProduct) {
        products.push(currentProduct)
      }
      currentProduct = {
        name: trimmed.replace(/^[\d]+[.、]|【|•/g, '').trim(),
        brand: '推荐',
        price: '¥200-500',
        reason: '根据你的肤质推荐',
        suitableFor: ['所有肤质']
      }
    } else if (currentProduct) {
      if (trimmed.includes('¥') || trimmed.includes('元')) {
        // 简单提取价格
        const priceMatch = trimmed.match(/\d+/)
        if (priceMatch) {
          currentProduct.price = '¥' + priceMatch[0]
        }
      } else if (trimmed.length > 5 && trimmed.length < 50) {
        currentProduct.reason = trimmed
      }
    }
  }

  if (currentProduct) {
    products.push(currentProduct)
  }

  return products
}

function getFallbackProducts(): Array<{
  name: string
  brand: string
  price: string
  reason: string
  suitableFor: string[]
}> {
  return [
    {
      name: '氨基酸洁面乳',
      brand: '护肤基础款',
      price: '¥100-200',
      reason: '温和清洁不刺激',
      suitableFor: ['敏感肌', '干性', '混合性']
    },
    {
      name: '玻尿酸精华',
      brand: '保湿必备',
      price: '¥200-400',
      reason: '深层补水保湿',
      suitableFor: ['干性', '缺水肌肤']
    },
    {
      name: '神经酰胺面霜',
      brand: '修复屏障',
      price: '¥300-600',
      reason: '修复皮肤屏障',
      suitableFor: ['敏感肌', '受损肌肤']
    }
  ]
}

export function clearConversationHistory() {
  clearHistory()
}

export default {
  sendBeautyMessage,
  analyzeSkinWithAI,
  getMakeupRecommendationWithAI,
  recommendProductsWithAI,
  clearConversationHistory
}
