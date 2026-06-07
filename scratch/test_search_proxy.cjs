async function testFetch() {
  const targetUrl = "https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=" + encodeURIComponent("데미안");

  const runProxy = async (name, proxyUrl, parser = async (res) => await res.text()) => {
    const start = Date.now();
    try {
      console.log(`Starting ${name}...`);
      const res = await fetch(proxyUrl);
      const duration = Date.now() - start;
      if (res.ok) {
        const text = await parser(res);
        console.log(`[SUCCESS] ${name} resolved in ${duration}ms (length: ${text.length})`);
        return text;
      } else {
        console.log(`[FAIL] ${name} failed in ${duration}ms with status ${res.status}`);
      }
    } catch (e) {
      const duration = Date.now() - start;
      console.log(`[ERROR] ${name} failed in ${duration}ms:`, e.message);
    }
    return null;
  };

  await Promise.all([
    runProxy("corsproxy.io", `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`),
    runProxy("allorigins", `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`, async (res) => {
      const data = await res.json();
      return data.contents || "";
    }),
    runProxy("codetabs", `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`)
  ]);
}

testFetch();
