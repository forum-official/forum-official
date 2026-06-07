const https = require('https');
const fs = require('fs');

const urls = {
  harry: 'https://image.aladin.co.kr/product/25399/72/cover500/8983928204_2.jpg',
  sapiens: 'https://image.aladin.co.kr/product/31424/4/cover500/k482832219_1.jpg',
  habits: 'https://image.aladin.co.kr/product/37944/74/cover500/k672033454_3.jpg',
  threebody: 'https://image.aladin.co.kr/product/36946/25/cover500/k222030516_2.jpg',
  norwegian: 'https://image.aladin.co.kr/product/11561/49/cover500/8937434482_1.jpg'
};

function download(name, url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`${name} failed: status ${res.statusCode}`);
        resolve(false);
        return;
      }
      const file = fs.createWriteStream(`scratch/test_${name}.jpg`);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(`scratch/test_${name}.jpg`);
        console.log(`${name} downloaded: ${stats.size} bytes`);
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`${name} error:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const [name, url] of Object.entries(urls)) {
    await download(name, url);
  }
}

run();
