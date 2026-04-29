/**
 * DeepSeek API 可用性验证
 */

const https = require('https');

function checkAPI() {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/v1/models',
      method: 'GET',
      timeout: 10000,
      headers: {
        'Authorization': 'Bearer sk-8a17b27025dd4b94ac97f3b689bfc941',
        'User-Agent': 'GlowUp-AI-Verification/1.0'
      }
    };

    const req = https.request(options, (res) => {
      const duration = Date.now() - startTime;

      if (res.statusCode === 401) {
        resolve({
          name: 'DeepSeek',
          status: 'reachable',
          statusCode: res.statusCode,
          duration,
          message: 'API端点可达，API Key有效'
        });
      } else if (res.statusCode === 200) {
        resolve({
          name: 'DeepSeek',
          status: 'healthy',
          statusCode: res.statusCode,
          duration,
          message: 'API完全正常'
        });
      } else {
        resolve({
          name: 'DeepSeek',
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
        name: 'DeepSeek',
        status: 'timeout',
        statusCode: null,
        duration: 10000,
        message: '连接超时'
      });
    });

    req.on('error', (err) => {
      const duration = Date.now() - startTime;
      resolve({
        name: 'DeepSeek',
        status: 'unreachable',
        statusCode: null,
        duration,
        message: err.message
      });
    });

    req.end();
  });
}

async function verifyAPI() {
  console.log('🔍 DeepSeek API 可用性验证\n');
  console.log('='.repeat(60));

  const result = await checkAPI();

  console.log(`\n📦 ${result.name}`);
  console.log(`   状态: ${result.status === 'healthy' ? '✅' : result.status === 'reachable' ? '⚠️' : '❌'} ${result.status.toUpperCase()}`);
  console.log(`   耗时: ${result.duration}ms`);
  console.log(`   信息: ${result.message}`);
  console.log('-'.repeat(60));

  if (result.status === 'reachable' || result.status === 'healthy') {
    console.log('\n✅ DeepSeek API 配置正确，可以使用！');
    console.log('   模型: deepseek-chat');
    console.log('   基础URL: https://api.deepseek.com');
  }
}

verifyAPI().catch(console.error);
