/**
 * AI API 测试脚本
 * 用于验证所有AI模型是否正常工作
 */

import { AIAgent, AIProvider, AIModel } from './ai'

// 测试配置
const TEST_MESSAGE = '你好，介绍一下自己'
const TIMEOUT = 30000

// 模型配置映射
const modelConfigs: Array<{ provider: AIProvider; model: AIModel; name: string }> = [
  { provider: 'deepseek', model: 'deepseek-chat', name: 'DeepSeek' },
  { provider: 'kimi', model: 'moonshot-v1-8k', name: 'Kimi' },
  { provider: 'qianwen', model: 'qwen-turbo', name: '通义千问' },
  { provider: 'zhipu', model: 'glm-4-flash', name: '智谱AI' },
  { provider: 'xiaomi', model: 'xiaomi-ai', name: '小米AI' },
]

async function testAIProvider(provider: AIProvider, model: AIModel, name: string): Promise<{
  success: boolean
  message?: string
  error?: string
  responseTime?: number
}> {
  try {
    const agent = new AIAgent(provider)
    
    // 检查是否已配置
    if (!agent.isConfigured()) {
      return { success: false, message: `${name} 未配置API Key` }
    }

    console.log(`\n=== 测试 ${name} (${model}) ===`)
    
    const startTime = Date.now()
    
    const response = await agent.chat({
      messages: [{ role: 'user', content: TEST_MESSAGE }],
      model,
      max_tokens: 100,
      temperature: 0.7
    })
    
    const responseTime = Date.now() - startTime
    
    console.log(`✅ ${name} 成功! (${responseTime}ms)`)
    console.log(`回复: ${response.message.content.slice(0, 100)}...`)
    
    return {
      success: true,
      message: response.message.content,
      responseTime
    }
  } catch (error) {
    const err = error as Error
    console.log(`❌ ${name} 失败: ${err.message}`)
    return {
      success: false,
      error: err.message
    }
  }
}

async function runAllTests() {
  console.log('🚀 开始测试AI模型...')
  console.log(`测试消息: "${TEST_MESSAGE}"`)
  console.log('='.repeat(50))

  const results: Array<{
    name: string
    provider: AIProvider
    model: AIModel
    success: boolean
    message?: string
    error?: string
    responseTime?: number
  }> = []

  for (const config of modelConfigs) {
    const result = await testAIProvider(config.provider, config.model, config.name)
    results.push({ ...config, ...result })
  }

  // 输出总结
  console.log('\n' + '='.repeat(50))
  console.log('📊 测试结果总结')
  console.log('='.repeat(50))

  const successCount = results.filter(r => r.success).length
  const totalCount = results.length

  console.log(`\n🎉 成功: ${successCount}/${totalCount}`)
  console.log(`❌ 失败: ${totalCount - successCount}/${totalCount}`)

  // 详细结果
  console.log('\n📋 详细结果:')
  results.forEach(result => {
    const status = result.success ? '✅' : '❌'
    const time = result.responseTime ? ` (${result.responseTime}ms)` : ''
    console.log(`  ${status} ${result.name}: ${result.success ? '正常' : result.error}`)
  })

  return results
}

// 如果是直接运行此文件，执行测试
if (require.main === module) {
  runAllTests().then(() => process.exit(0))
}

export { runAllTests, testAIProvider }
