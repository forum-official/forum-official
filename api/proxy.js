// Vercel serverless function to act as a dedicated CORS proxy for bookstore scraping
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  const targetUrl = decodeURIComponent(url);
  
  // Security restriction: limit proxying to target hosts we need
  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
    const allowedHosts = [
      "www.aladin.co.kr", 
      "search.kyobobook.co.kr", 
      "www.kyobobook.co.kr", 
      "image.aladin.co.kr", 
      "image.yes24.com",
      "yes24.com",
      "image.yes24.com"
    ];
    const isAllowed = allowedHosts.some(host => parsedUrl.host.includes(host));
    if (!isAllowed) {
      return res.status(403).json({ error: "Forbidden target host" });
    }
  } catch (e) {
    return res.status(400).json({ error: "Invalid target URL" });
  }

  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    };

    if (parsedUrl.host.includes("aladin.co.kr")) {
      headers["Referer"] = "https://www.aladin.co.kr/";
    } else if (parsedUrl.host.includes("kyobobook.co.kr")) {
      headers["Referer"] = "https://www.kyobobook.co.kr/";
    } else if (parsedUrl.host.includes("yes24.com")) {
      headers["Referer"] = "https://www.yes24.com/";
    }

    const response = await fetch(targetUrl, { headers });

    const contentType = response.headers.get("content-type") || "text/html; charset=utf-8";
    const buffer = await response.arrayBuffer();

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", contentType);

    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: error.message });
  }
}
