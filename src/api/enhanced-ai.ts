/**
 * Enhanced AI Service - 增强版美妆AI服务
 * 整合多模型，提供更强大的美妆功能
 */

import { AIAgent } from './ai'
import {
  selectModelForTask,
  detectTaskType,
  getAvailableModels,
  getModelStatus,
  TASK_CONFIGS,
  TaskType
} from './model-router'

// 专业美妆知识库
const BEAUTY_KNOWLEDGE = {
  // 成分字典
  ingredients: {
    '烟酰胺': { effect: '美白提亮、控油抗炎', suitableSkin: '除敏感肌外', note: '建议从低浓度2-3%开始' },
    '透明质酸': { effect: '深层补水、保湿修复', suitableSkin: '所有肤质', note: '多种分子量效果更好' },
    '视黄醇': { effect: '抗老紧致、淡化细纹', suitableSkin: '耐受肤质', note: '孕妇禁用，建议晚间使用，注意防晒' },
    '水杨酸': { effect: '祛痘控油、疏通毛孔', suitableSkin: '油性、痘肌', note: '建议浓度0.5-2%' },
    '神经酰胺': { effect: '修复屏障、保湿舒缓', suitableSkin: '敏感肌、受损肌肤', note: '皮肤屏障修复首选' },
    '熊果苷': { effect: '美白淡斑、提亮肤色', suitableSkin: '除敏感肌外', note: '建议晚间使用' },
    '维生素C': { effect: '美白抗氧化、提亮肤色', suitableSkin: '除敏感肌外', note: '注意防晒，可能会有点刺激' },
    '玻尿酸': { effect: '强力补水保湿', suitableSkin: '所有肤质', note: '搭配锁水乳液面霜更有效' }
  },
  // 肤质类型
  skinTypes: {
    '干性': '特征：紧绷、干燥、缺水、细纹；建议：温和清洁、高保湿精华、滋润面霜、敷面膜',
    '油性': '特征：出油多、毛孔粗大、易长痘；建议：控油清洁、清爽保湿、定期清洁毛孔',
    '混合性': '特征：T区油、U区干；建议：分区护理、T区控油U区保湿',
    '中性': '特征：理想肤质、水油平衡；建议：维持稳定状态、做好基础护理即可',
    '敏感性': '特征：易泛红、干燥、发痒；建议：精简护肤、使用舒缓成分为主'
  },
  // 护肤流程
  routines: {
    morning: '洁面 → 爽肤水 → 精华 → 眼霜 → 乳液/面霜 → 防晒',
    evening: '卸妆 → 洁面 → 面膜(1周2-3次) → 爽肤水 → 精华 → 眼霜 → 乳液/面霜',
    basic: '清洁、保湿、防晒三件套，是护肤基础！'
  },
  // 品牌知识库
  brands: {
    '国际大牌': ['海蓝之谜', '兰蔻', '雅诗兰黛', '资生堂', 'SK-II', 'Dior', '香奈儿', '娇兰'],
    '口碑药妆': ['理肤泉', '雅漾', '薇诺娜', '修丽可', '露得清'],
    '日系亲民': ['芙丽芳丝', '珂润', 'HABA', 'MUJI', 'Fancl', '黛珂'],
    '韩系': ['雪花秀', 'whoo后', '兰芝', '悦诗风吟', '伊思it's skin'],
    '国货精品': ['珀莱雅', '自然堂', '百雀羚', '至本', '薇诺娜', '玉泽']
  }
}

// ============================================
// 核心服务
// ============================================

export class EnhancedBeautyAI {
  private conversationHistory: Array<{ role: 'user' | 'assistant', content: string }> = []
  private currentModel: { provider: string, model: string } | null = null

  constructor() {
    this.selectBestModel()
  }

  // 自动选择最佳模型
  private selectBestModel() {
    try {
      // 默认使用日常对话模式
      this.currentModel = selectModelForTask('chat')
      console.log(`✅ 已选择模型: ${this.currentModel.model} (${this.currentModel.provider})`)
    } catch (e) {
      console.warn('⚠️ 模型选择失败，使用备用方案')
    }
  }

  // 获取当前模型状态
  getStatus() {
    return {
      availableModels: getAvailableModels(),
      modelStatus: getModelStatus(),
      currentModel: this.currentModel
    }
  }

  // 智能聊天
  async chat(message: string, options?: { useHistory?: boolean, taskType?: TaskType }) {
    const taskType = options?.taskType || detectTaskType(message)
    const model = selectModelForTask(taskType)
    this.currentModel = model

    const config = TASK_CONFIGS[taskType]
    const agent = new AIAgent(model.provider as any)

    // 构建提示词
    const systemPrompt = this.buildSystemPrompt(taskType)

    // 准备消息
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...(options?.useHistory ? this.conversationHistory.slice(-6) : []),
      { role: 'user' as const, content: message }
    ]

    try {
      const response = await agent.chat({
        model: model.model,
        messages,
        temperature: config.temperature,
        max_tokens: config.maxTokens
      })

      // 保存对话历史
      this.conversationHistory.push({ role: 'user', content: message })
      this.conversationHistory.push({ role: 'assistant', content: response.message.content })

      return {
        content: response.message.content,
        taskType,
        model: model.model,
        provider: model.provider
      }
    } catch (error) {
      console.error(`模型调用失败 (${model.model})`)
      throw error
    }
  }

  // 构建专业提示词
  private buildSystemPrompt(taskType: TaskType): string {
    const basePrompt = `你是一位专业的美妆护肤顾问"美美"，性格亲切、耐心、专业。`

    switch (taskType) {
      case 'skin-analysis':
        return `${basePrompt}
你是一位专业的皮肤科背景护肤专家。擅长分析肤质和给出针对性建议。
参考专业知识:
${Object.entries(BEAUTY_KNOWLEDGE.skinTypes).map(([type, desc]) => `• ${type}: ${desc}`).join('\n')}

输出建议清晰有结构，每条建议前加上编号，包含具体可执行的步骤。`

      case 'product-rec':
        return `${basePrompt}
你是一位专业美妆导购，对品牌和产品有深入了解。
品牌参考:
${Object.entries(BEAUTY_KNOWLEDGE.brands).map(([group, list]) => `• ${group}: ${list.join('、')}`).join('\n')}

推荐策略:
• 给出高中低档三个选择
• 说明每个推荐理由
• 适合的肤质和场景
• 注意事项
• 建议价格区间`

      case 'content-write':
        return `${basePrompt}
你是一位美妆种草文案师，擅长写作小红书风格的种草文案。
文案特点:
• 标题吸引人，使用emoji表情
• 内容真实接地气，有个人体验
• 条理清晰，要点明确
• 结尾有关键词标签
• 字数在300-500字左右
• 加上合适的话题标签`

      case 'makeup-tips':
        return `${basePrompt}
你是一位专业美妆造型师，擅长妆容搭配和技巧教学。
你的特点:
• 提供具体的操作步骤
• 分场景教学（日常/约会/派对）
• 推荐具体的产品类型
• 给出颜色搭配建议
• 实用小技巧`

      case 'complex-query':
        return `${basePrompt}
你是一位专业美妆护肤研究专家，精通化妆品成分和原理。
成分参考:
${Object.entries(BEAUTY_KNOWLEDGE.ingredients).map(([name, info]) =>
    `• ${name}: ${info.effect} | 适用: ${info.suitableSkin} | 注意: ${info.note}`
  ).join('\n')}

回答风格:
• 专业但易懂
• 有理有据
• 分析全面
• 建议具体可执行`

      default:
        return `${basePrompt}
${BEAUTY_SYSTEM_PROMPT}`
    }
  }

  // ============================================
  // 专业美妆功能
  // ============================================

  // 成分分析
  async analyzeIngredient(ingredientName: string) {
    const ingredient = BEAUTY_KNOWLEDGE.ingredients[ingredientName]

    if (ingredient) {
      return {
        name: ingredientName,
        ...ingredient,
        source: '知识库'
      }
    }

    // 知识库没有的，用AI补充
    const result = await this.chat(`帮我分析一下化妆品成分"${ingredientName}"：功效、适用肤质、注意事项`, {
      taskType: 'complex-query'
    })

    return {
      name: ingredientName,
      aiAnalysis: result.content,
      source: 'AI分析'
    }
  }

  // 产品对比
  async compareProducts(product1: string, product2: string, aspect?: string) {
    const result = await this.chat(
      `帮我对比这两款产品：${product1} vs ${product2}
${aspect ? `重点对比: ${aspect}` : '请从以下维度对比：价格、核心成分、适合肤质、优缺点、性价比'}
请用表格或者清晰的对比形式呈现`,
      { taskType: 'complex-query' }
    )

    return {
      products: [product1, product2],
      comparison: result.content
    }
  }

  // 肤质测试报告
  async generateSkinReport(answers: {
    isDry: boolean,
    isOily: boolean,
    isSensitive: boolean,
    concerns: string[],
    ageRange?: string
  }) {
    const result = await this.chat(
      `根据以下信息生成一份肤质分析报告：
- 是否干燥：${answers.isDry ? '是' : '否'}
- 是否出油：${answers.isOily ? '是' : '否'}
- 是否敏感：${answers.isSensitive ? '是' : '否'}
- 主要问题：${answers.concerns.join('、')}
${answers.ageRange ? `- 年龄段：${answers.ageRange}` : ''}

请给出：
1. 肤质判断
2. 问题分析
3. 改善方案
4. 适合的护肤成分
5. 产品推荐建议`,
      { taskType: 'skin-analysis' }
    )

    return result
  }

  // 妆容方案定制
  async generateMakeupLook(options: {
    occasion: '日常' | '约会' | '职场' | '派对',
    skinTone?: '黄一白' | '黄二白' | '黄三白' | '冷白皮',
    style?: '自然' | '精致' | '轻熟' | '甜美'
  }) {
    const result = await this.chat(
      `根据以下需求定制妆容方案：
- 场合：${options.occasion}
- 肤色：${options.skinTone || '自然肤色'}
- 风格：${options.style || '自然精致'}

请包含：
1. 整体风格定位
2. 底妆建议
3. 眼妆教程
4. 腮红/修容
5. 唇妆推荐
6. 产品类型建议
7. 技巧小贴士`,
      { taskType: 'makeup-tips' }
    )

    return result
  }

  // 护肤routine生成
  async generateRoutine(options: {
    skinType: string,
    concerns: string[],
    budgetRange?: '100-300' | '300-500' | '500-1000' | '1000+',
    timeOfDay: 'morning' | 'evening' | 'both'
  }) {
    const result = await this.chat(
      `为${options.skinType}肌肤定制护肤方案：
- 皮肤类型：${options.skinType}
- 问题：${options.concerns.join('、')}
- 预算：${options.budgetRange || '不限'}
- 时间：${options.timeOfDay === 'both' ? '早晚' : options.timeOfDay}

请包含：
1. 完整护肤步骤
2. 每个步骤推荐产品类型
3. 成分推荐
4. 注意事项
5. 每周特殊护理建议`,
      { taskType: 'complex-query' }
    )

    return result
  }

  // 智能助手：常见问题快速回答
  quickAnswer(question: string) {
    const q = question.toLowerCase()

    // 快捷知识库匹配
    if (q.includes('护肤步骤') || q.includes('护肤流程')) {
      return {
        type: 'knowledge',
        answer: `
【晨间护肤】${BEAUTY_KNOWLEDGE.routines.morning}
【晚间护肤】${BEAUTY_KNOWLEDGE.routines.evening}
【核心三件套】${BEAUTY_KNOWLEDGE.routines.basic}
        `.trim()
      }
    }

    if (q.includes('敏感肌') || q.includes('泛红')) {
      return {
        type: 'knowledge',
        answer: `
【敏感肌护理原则】
1. 精简！不要过度护肤！
2. 温和清洁（氨基酸洁面）
3. 修复屏障为主（神经酰胺、角鲨烷）
4. 抗炎舒缓
5. 严格物理防晒
6. 不要过度清洁去角质
        `.trim()
      }
    }

    if (q.includes('烟酰胺')) {
      return { type: 'ingredient', data: BEAUTY_KNOWLEDGE.ingredients['烟酰胺'] }
    }

    if (q.includes('防晒')) {
      return {
        type: 'knowledge',
        answer: `
【防晒必知】
• 一年四季365天都要防晒！
• 防晒是抗老第一步！
• 防晒指数选择：日常SPF30 PA++，户外SPF50 PA++++
• 用量：1元硬币大小，2小时补涂
• 形式：防晒乳/喷雾都可以，看场景
        `.trim()
      }
    }

    return null // 没有匹配到快速答案
  }

  // 清空历史
  clearHistory() {
    this.conversationHistory = []
    console.log('🗑️ 对话历史已清空')
  }
}

// 基础系统提示词
const BEAUTY_SYSTEM_PROMPT = `你是一位专业、亲切、有耐心的美妆护肤顾问"美美"。

【人设】
• 名字：美美
• 年龄：26岁
• 职业：资深美妆护肤顾问
• 性格：温柔、耐心、专业、懂年轻人

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

记住：不要编造不存在的产品，只推荐真实存在的知名品牌。`

// 单例导出
const aiService = new EnhancedBeautyAI()
export default aiService
