// File ini jalan di SERVER (Vercel serverless function), BUKAN di browser.
// Karena itu, API key di sini AMAN — tidak pernah dikirim ke kode yang
// diunduh browser pengguna, jadi tidak akan ke-detect/ke-scrape seperti
// sebelumnya.
//
// PENTING: taruh key di environment variable bernama GEMINI_API_KEY
// (TANPA prefix VITE_) di dashboard hosting (Vercel > Settings >
// Environment Variables). Prefix VITE_ sengaja dihindari supaya Vite
// tidak ikut menanamnya ke bundle frontend.

const MODEL = "gemini-3.1-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY belum diatur di server." });
    return;
  }

  const { systemInstruction, contents } = req.body || {};
  if (!contents) {
    res.status(400).json({ error: "Field 'contents' wajib diisi." });
    return;
  }

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction,
        contents,
        generationConfig: { maxOutputTokens: 400 },
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      res.status(geminiRes.status).json({
        error: data?.error?.message || "Gagal menghubungi Gemini API.",
      });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error saat menghubungi Gemini API." });
  }
}
