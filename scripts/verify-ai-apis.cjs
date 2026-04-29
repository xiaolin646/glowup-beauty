/**
 * AI API 可用性验证脚本
 * 运行方式: node scripts/verify-ai-apis.js
 */

const https = require('https');
const http = require('http');

const APIs = [
  {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1/models',
    description: 'OpenAI GPT系列模型'
  },
  {
    name: 'Claude (Anthropic)',
    url: 'https://api.anthropic.com/v1/messages',
    description: 'Claude 3系列模型'
  },
  {
    name: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models',
    description: 'Gemini Pro/Flash模型'
  }
];

function checkAPI(api) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const urlObj = new URL(api.url);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 10000,
      headers: {
        'User-Agent': 'GlowUp-AI-Verification/1.0'
      }
    };

    const req = https.request(options, (res) => {
      const duration = Date.now() - startTime;
      
      // 401/403 表示API端点可达但需要认证（这是正常的）
      // 200 表示完全正常
      if (res.statusCode === 401 || res.statusCode === 403) {
        resolve({
          name: api.name,
          description: api.description,
          status: 'reachable',
          statusCode: res.statusCode,
          duration,
          message: 'API端点可达，需要有效的API Key'
        });
      } else if (res.statusCode === 200) {
        resolve({
          name: api.name,
          description: api.description,
          status: 'healthy',
          statusCode: res.statusCode,
          duration,
          message: 'API完全正常'
        });
      } else {
        resolve({
          name: api.name,
          description: api.description,
          status: 'error',
          statusCode: res.statusCode,
          duration,
          message: `API返回状态码: ${res.statusCode}`
        });
      }
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: api.name,
        description: api.description,
        status: 'timeout',
        statusCode: null,
        duration: 10000,
        message: '连接超时'
      });
    });

    req.on('error', (err) => {
      const duration = Date.now() - startTime;
      resolve({
        name: api.name,
        description: api.description,
        status: 'unreachable',
        statusCode: null,
        duration,
        message: err.message
      });
    });

    req.end();
  });
}

async function verifyAPIs() {
  console.log('🔍 GlowUp AI API 可用性验证\n');
  console.log('='.repeat(60));
  
  const results = await Promise.all(APIs.map(checkAPI));
  
  for (const result of results) {
    console.log(`\n📦 ${result.name}`);
    console.log(`   描述: ${result.description}`);
    console.log(`   状态: ${getStatusEmoji(result.status)} ${result.status.toUpperCase()}`);
    console.log(`   耗时: ${result.duration}ms`);
    console.log(`   信息: ${result.message}`);
    console.log('-'.repeat(60));
  }
  
  console.log('\n📊 汇总:');
  const reachable = results.filter(r => r.status === 'reachable' || r.status === 'healthy').length;
  console.log(`   可用: ${reachable}/${results.length}`);
  
  console.log('\n💡 说明:');
  console.log('   - "reachable": API端点可达，需要配置有效的API Key才能使用');
  console.log('   - "unreachable": 网络无法访问，可能需要代理或VPN');
  console.log('   - "timeout": 连接超时');
  
  console.log('\n🔑 配置API Key:');
  console.log('   1. 复制 .env.example 为 .env');
  console.log('   2. 填写对应的API Key');
  console.log('   3. 重启开发服务器');
}

function getStatusEmoji(status) {
  const emojis = {
    healthy: '✅',
    reachable: '⚠️',
    error: '❌',
    timeout: '⏱️',
    unreachable: '🚫'
  };
  return emojis[status] || '❓';
}

verifyAPIs().catch(console.error);
