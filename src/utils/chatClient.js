import { INGREDIENTS, CONFLICTS, findIngredient } from "../data/ingredients";

// NOTE ON SECURITY:
// Panggilan ke Gemini sekarang lewat backend serverless function di
// /api/chat.js, jadi API key TIDAK ikut tertanam di kode yang dikirim ke
// browser pengguna. Key-nya disimpan sebagai env var di server (lihat
// api/chat.js untuk detail).
const API_URL = "/api/chat";

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

// Sekarang tidak perlu cek API key di frontend sama sekali — key-nya
// hidup di server, bukan di browser.
export function hasApiKey() {
  return true;
}

/**
 * @param {{role: "user"|"assistant", content: string}[]} messages
 * @returns {Promise<string>}
 */
export async function askAssistant(messages) {
  // Gemini tidak punya role "assistant", harus "model".
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data?.error;
    if (response.status === 429) {
      throw new Error("Terlalu banyak permintaan sekaligus, coba beberapa saat lagi.");
    }
    throw new Error(detail || "Gagal menghubungi asisten AI. Coba lagi.");
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text?.trim() || "Maaf, aku belum bisa jawab itu sekarang.";
}    throw new Error(detail || "Gagal menghubungi asisten AI. Coba lagi.");
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text?.trim() || "Maaf, aku belum bisa jawab itu sekarang.";
                                         }
