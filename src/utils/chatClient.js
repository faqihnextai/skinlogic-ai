import { INGREDIENTS, CONFLICTS, findIngredient } from "../data/ingredients";

// NOTE ON SECURITY:
// API key sekarang langsung ditempel di sini. Cocok untuk demo lokal,
// tapi jangan di-deploy public ya agar tidak dicuri orang lain.

const MODEL = "gemini-3.1-flash-lite"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = "AQ.Ab8RN6J0i07SsTS6t-J96ZhDvdE2doEAhT0JdEb268PiIxUNhQ";

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
  return Boolean(API_KEY);
}

/**
 * @param {{role: "user"|"assistant", content: string}[]} messages
 * @returns {Promise<string>}
 */
export async function askAssistant(messages) {
  // Langsung menggunakan variable API_KEY yang di-hardcode di atas
  if (!API_KEY) {
    throw new Error("API key belum diatur.");
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
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
      throw new Error("API key tidak valid. Cek kembali kode Anda.");
    }
    if (response.status === 403) {
      throw new Error("API key tidak valid atau tidak punya akses.");
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
