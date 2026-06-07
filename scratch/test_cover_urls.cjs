const https = require('https');

const urls = [
  'https://image.aladin.co.kr/product/25399/72/cover500/8983928204_2.jpg',
  'https://image.aladin.co.kr/product/31424/4/cover500/k482832219_1.jpg',
  'https://image.aladin.co.kr/product/37944/74/cover500/k672033454_3.jpg',
  'https://image.aladin.co.kr/product/36946/25/cover500/k222030516_2.jpg',
  'https://image.aladin.co.kr/product/11561/49/cover500/8937434482_1.jpg'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers['content-type'], res.headers['content-length']);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`URL: ${url} error:`, err.message);
      resolve(null);
    });
  });
}

async function run() {
  for (const url of urls) {
    await checkUrl(url);
    console.log('---');
  }
}

run();
