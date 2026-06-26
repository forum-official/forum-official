// Vercel serverless function to search books from Aladin API without CORS issues
export default async function handler(req, res) {
  const { query, start = 1, maxResults = 30 } = req.query;
  
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const ttbkey = "ttbforum.official.dev0549002";
  const targetUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbkey}&Query=${encodeURIComponent(query)}&QueryType=Keyword&MaxResults=${maxResults}&start=${start}&SearchTarget=Book&output=js&Version=20131101`;

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch from Aladin API" });
    }
    
    const text = await response.text();
    
    // Aladin output=js usually returns a JSON object. If there is a trailing semicolon, remove it.
    let data;
    try {
      const cleanedText = text.trim().replace(/;$/, "");
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error from Aladin:", parseError);
      return res.status(500).json({ error: "Invalid response format from Aladin API" });
    }

    if (!data.item || !Array.isArray(data.item)) {
      return res.status(200).json({ items: [] });
    }

    // Map Aladin items to our Book UI structure
    const mappedItems = data.item.map((item, index) => {
      // Normalize Cover Image to cover500 (larger)
      let coverUrl = item.cover || "";
      if (coverUrl.includes("cover200")) {
        coverUrl = coverUrl.replace("cover200", "cover500");
      } else if (coverUrl.includes("cover150")) {
        coverUrl = coverUrl.replace("cover150", "cover500");
      } else if (coverUrl.includes("cover.jpg") && !coverUrl.includes("cover500")) {
        coverUrl = coverUrl.replace("cover", "cover500");
      }

      // Cleanup author name
      let author = item.author || "저자 미상";
      author = author.replace(/\s*\([^)]+\)/g, "").trim();

      const publisherName = item.publisher || "출판사 미상";
      const itemId = String(item.itemId || `aladin_${Date.now()}_${index}`);

      return {
        id: itemId,
        title: item.title || "제목 없음",
        author: author,
        description: item.description || "",
        coverUrl: coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200",
        rating: 0.0,
        likes: 0,
        reviews: 0,
        publishers: [{ name: publisherName, votes: 0 }],
        year: item.pubDate ? new Date(item.pubDate).getFullYear() : 2024,
        genre: ["도서"],
        salesPoint: item.salesPoint || 0,
        isbn13: item.isbn13 || item.isbn || "",
      };
    });

    return res.status(200).json({ items: mappedItems });
  } catch (error) {
    console.error("Aladin API proxy handler error:", error);
    return res.status(500).json({ error: error.message });
  }
}
