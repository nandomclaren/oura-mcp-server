#!/usr/bin/env node
import https from 'https';

const TOKEN = '1d91dd1934cf4f51f1ddba7047686abed1aef3bdf3d9d087d4334192c7a231cb';
const HOST = 'web-production-8ca97.up.railway.app';
const DATE = new Date(Date.now() - 86400000).toISOString().split('T')[0]; // ontem

const body = JSON.stringify({
  jsonrpc: '2.0', id: 1, method: 'tools/call',
  params: { name: 'get_readiness_score', arguments: { start_date: DATE } }
});

const req = https.request({
  hostname: HOST, port: 443, path: '/sse', method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const r = JSON.parse(data);
      if (r.error) {
        console.log('❌ Erro do servidor:', r.error.message);
        return;
      }
      const parsed = JSON.parse(r.result.content[0].text);
      const item = parsed.data[0];

      console.log('\n📊 Resultado para', DATE);
      console.log('================================');

      if (item?.resting_heart_rate_score !== undefined) {
        console.log('✅ FIX APLICADO! Novos campos encontrados:');
        console.log('   resting_heart_rate_bpm:', item.resting_heart_rate_bpm, '← BPM real');
        console.log('   resting_heart_rate_score:', item.resting_heart_rate_score, '← score 0-100');
        console.log('   hrv_average_ms:', item.hrv_average_ms, '← HRV real em ms');
        console.log('   hrv_balance_score:', item.hrv_balance_score, '← score 0-100');
      } else if (item?.resting_heart_rate !== undefined) {
        console.log('❌ FIX NÃO APLICADO. Campo antigo encontrado:');
        console.log('   resting_heart_rate:', item.resting_heart_rate, '← era score sendo tratado como BPM!');
      } else {
        console.log('⚠️  Sem dados para', DATE);
        console.log('   Campos disponíveis:', Object.keys(item || {}).join(', '));
      }
    } catch (e) {
      console.log('❌ Erro ao parsear resposta:', e.message);
      console.log('Resposta raw:', data.substring(0, 300));
    }
  });
});

req.on('error', e => console.error('❌ Erro de rede:', e.message));
req.write(body);
req.end();
