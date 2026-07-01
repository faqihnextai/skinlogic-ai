import { INGREDIENTS, CONFLICTS, findIngredient } from "../data/ingredients";

// NOTE ON SECURITY:
// This calls the Gemini API directly from the browser. The API key will be
// visible to anyone who opens DevTools / Network tab on this site.
// That's fine for a local demo or a final project you run yourself, but
// you should NOT deploy this publicly with a real key attached — anyone
// could copy it and spend your quota. For a real product, the proper fix
// is to move this fetch call to a small backend/serverless function that
// holds the key instead.

const MODEL = "gemini-3.1-flash-lite"; // model aktif terbaru di free tier, cepat & kuota RPM lebih besar
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function buildSystemPrompt() {
  const ingredientSummary = INGREDIENTS.map(
    (ing) =>
      `- ${ing.label} (${ing.tag}): ${ing.desc} Cara pakai: ${ing.cara_pakai} Peringatan: ${ing.peringatan}`
  ).join("\n");

  const conflictSummary = CONFLICTS.map(([a, b]) => {
    const ingA = findIngredient(a);
    const ingB = findIngredient(b);
    return `${ingA?.label ?? a} + ${ingB?.label ?? b}`;
  }).join(", ");

  return `Kamu adalah asisten AI di website SkinLogic.AI, aplikasi edukasi yang membantu orang memahami kompatibilitas bahan aktif skincare dan kondisi skin barrier mereka.

Gaya jawaban:
- Bahasa Indonesia, santai tapi tetap jelas, maksimal 4-5 kalimat per jawaban kecuali user minta detail panjang.
- Jangan pakai format markdown berat (heading, tabel); cukup paragraf singkat atau list sederhana kalau perlu.

Basis pengetahuan utama (gunakan ini sebagai rujukan, bukan pengetahuan umum yang mungkin berbeda dari datamu):
${ingredientSummary}

Kombinasi bahan yang sebaiknya tidak dipakai bersamaan: ${conflictSummary}.

Aturan penting:
- Kalau user menyebut kondisi serius (iritasi parah, luka, alergi, kulit terbakar, dsb), sarankan konsultasi langsung ke dokter kulit.
- Selalu posisikan jawabanmu sebagai edukatif, bukan diagnosis atau resep medis.
- Kalau relevan, arahkan user untuk coba fitur "Cek Skin Barrier" di aplikasi ini untuk skor personal, bukan cuma jawaban umum dari kamu.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

export function hasApiKey() {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY);
}

/**
 * @param {{role: "user"|"assistant", content: string}[]} messages
 * @returns {Promise<string>}
 */
export async function askAssistant(messages) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key belum diatur. Tambahkan VITE_GEMINI_API_KEY di file .env, lalu restart server dev-nya."
    );
  }

  // Gemini tidak punya role "assistant", harus "model".
  // Gemini juga tidak punya field "system" terpisah seperti Anthropic,
  // jadi system prompt dikirim lewat "systemInstruction".
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 400,
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    const detail = errBody?.error?.message;
    if (response.status === 400 && detail?.toLowerCase().includes("api key")) {
      throw new Error("API key tidak valid. Cek kembali isi file .env kamu.");
    }
    if (response.status === 403) {
      throw new Error("API key tidak valid atau tidak punya akses. Cek kembali isi file .env kamu.");
    }
    if (response.status === 429) {
      throw new Error("Terlalu banyak permintaan sekaligus, coba beberapa saat lagi.");
    }
    throw new Error(detail || "Gagal menghubungi asisten AI. Coba lagi.");
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text?.trim() || "Maaf, aku belum bisa jawab itu sekarang.";
}