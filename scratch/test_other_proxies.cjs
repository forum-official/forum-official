async function testProxy(name, url, isJson = false) {
  const start = Date.now();
  try {
    console.log(`Testing ${name}...`);
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    const duration = Date.now() - start;
    if (res.ok) {
      let html = "";
      if (isJson) {
        const data = await res.json();
        html = data.contents || "";
      } else {
        html = await res.text();
      }
      const hasBookBox = html.includes("ss_book_box") || html.includes("browse_list_box");
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : "No Title";
      console.log(`[${name}] SUCCESS: ${duration}ms, length: ${html.length}, contains ss_book_box: ${hasBookBox}, Page Title: "${title.trim()}"`);
    } else {
      console.log(`[${name}] FAIL: ${duration}ms, status: ${res.status}`);
    }
  } catch (e) {
    console.log(`[${name}] ERROR: ${Date.now() - start}ms, error: ${e.message}`);
  }
}

async function runTests() {
  const targetUrl = "https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=" + encodeURIComponent("데미안");

  await testProxy("corsproxy.io", `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
  await testProxy("allorigins-get", `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`, true);
  await testProxy("codetabs", `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`);
  await testProxy("thingproxy", `https://thingproxy.freeboard.io/fetch/${targetUrl}`);
}

runTests();
