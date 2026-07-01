import { INGREDIENTS, CONFLICTS, STRONG, FRIENDLY, DAYS, findIngredient } from "../data/ingredients";

const BASE_SCORE_BY_SKIN_TYPE = { Kering: 65, Berminyak: 72, Kombinasi: 70, Sensitif: 52, Normal: 80 };

// Bobot tiap faktor skoring. Dipisah jadi konstanta bernama (bukan magic number)
// supaya gampang dijelaskan: bahan pendukung barrier menaikkan skor sedikit-sedikit,
// kombinasi konflik menjatuhkan skor lebih signifikan karena risikonya ke kulit.
const WEIGHTS = {
  FRIENDLY_BONUS: 4,       // tiap bahan pendukung barrier (niacinamide, ceramide, dst)
  STRONG_OVERUSE_PENALTY: 6, // tiap bahan aktif kuat di atas batas aman (2)
  CONFLICT_PENALTY: 9,      // tiap pasangan bahan yang saling konflik
  SPF_BONUS: 8,
  NO_SPF_PENALTY: 12,
  SENSITIVE_STRONG_PENALTY: 6, // tambahan jika kulit sensitif pakai >1 aktif kuat
  STRONG_LIMIT: 2,
};

export function getConflicts(selected) {
  return CONFLICTS.filter(([a, b]) => selected.includes(a) && selected.includes(b));
}

export function getZone(score) {
  if (score <= 40) return { label: "Sensitif", family: "rose" };
  if (score <= 70) return { label: "Seimbang", family: "amber" };
  return { label: "Kuat & Sehat", family: "rose" };
}

export function computeScore(skinType, selected) {
  let score = BASE_SCORE_BY_SKIN_TYPE[skinType] ?? 60;

  const friendlyCount = selected.filter((i) => FRIENDLY.includes(i)).length;
  score += friendlyCount * WEIGHTS.FRIENDLY_BONUS;

  const strongCount = selected.filter((i) => STRONG.includes(i)).length;
  if (strongCount > WEIGHTS.STRONG_LIMIT) {
    score -= (strongCount - WEIGHTS.STRONG_LIMIT) * WEIGHTS.STRONG_OVERUSE_PENALTY;
  }

  const conflicts = getConflicts(selected);
  score -= conflicts.length * WEIGHTS.CONFLICT_PENALTY;

  if (selected.includes("spf")) score += WEIGHTS.SPF_BONUS;
  else score -= WEIGHTS.NO_SPF_PENALTY;

  if (skinType === "Sensitif" && strongCount > 1) score -= WEIGHTS.SENSITIVE_STRONG_PENALTY;

  return Math.max(4, Math.min(98, Math.round(score)));
}

export function generateInsights(skinType, selected, score) {
  const conflicts = getConflicts(selected);
  const strongCount = selected.filter((i) => STRONG.includes(i)).length;
  const friendlyCount = selected.filter((i) => FRIENDLY.includes(i)).length;
  const insights = [];

  conflicts.forEach(([a, b]) => {
    insights.push({
      type: "warning",
      text: `${findIngredient(a).label} & ${findIngredient(b).label} terdeteksi dipakai bersamaan — risiko iritasi barrier meningkat. Pisahkan ke malam yang berbeda.`,
    });
  });

  if (!selected.includes("spf")) {
    insights.push({ type: "warning", text: "SPF belum dipilih. Pakai sunscreen setiap pagi tanpa kecuali untuk melindungi barrier dari sinar UV." });
  }
  if (strongCount > WEIGHTS.STRONG_LIMIT) {
    insights.push({ type: "warning", text: `${strongCount} bahan aktif kuat terdeteksi sekaligus. Lakukan rotasi pemakaian, jangan dipakai di malam yang sama.` });
  }
  if (skinType === "Sensitif" && strongCount > 0) {
    insights.push({ type: "warning", text: "Tipe kulit sensitif lebih rentan terhadap bahan aktif kuat. Mulai dari frekuensi rendah & selalu lakukan patch test." });
  }
  if (friendlyCount >= 2) {
    insights.push({ type: "success", text: "Bahan pendukung barrier (niacinamide/ceramide/hyaluronic/peptide) sudah cukup lengkap. Pertahankan kombinasi ini." });
  }
  if (score > 70) {
    insights.push({ type: "success", text: "Skor barrier berada di zona Kuat & Sehat. Rutinitas saat ini sudah cukup seimbang." });
  } else if (score <= 40) {
    insights.push({ type: "info", text: "Fokuskan rutinitas pada bahan menenangkan (ceramide, hyaluronic) dulu sebelum menambah aktif baru." });
  }

  return insights;
}

export function computeSubMetrics(selected, score) {
  const conflicts = getConflicts(selected);
  const strongCount = selected.filter((i) => STRONG.includes(i)).length;

  const hydration = (selected.includes("hyaluronic") ? 50 : 0) + (selected.includes("ceramide") ? 50 : 0);
  const protection = selected.includes("spf") ? 100 : 20;
  const balance = Math.max(0, 100 - conflicts.length * 25 - Math.max(0, strongCount - WEIGHTS.STRONG_LIMIT) * 20);

  return { hydration, protection, balance };
}

export function buildSchedule(selected) {
  const schedule = {};
  DAYS.forEach((d) => (schedule[d] = { AM: [], PM: [] }));

  const addDaily = (id, slots) => {
    if (!selected.includes(id)) return;
    DAYS.forEach((d) => slots.forEach((s) => schedule[d][s].push(id)));
  };

  addDaily("spf", ["AM"]);
  addDaily("vitaminc", ["AM"]);
  addDaily("niacinamide", ["AM", "PM"]);
  addDaily("hyaluronic", ["AM", "PM"]);
  addDaily("ceramide", ["PM"]);
  addDaily("peptide", ["PM"]);

  if (selected.includes("retinol")) ["Sen", "Rab", "Jum"].forEach((d) => schedule[d].PM.push("retinol"));
  if (selected.includes("ahabha")) ["Sel", "Sab"].forEach((d) => schedule[d].PM.push("ahabha"));
  if (selected.includes("salicylic")) ["Kam"].forEach((d) => schedule[d].PM.push("salicylic"));
  if (selected.includes("benzoyl")) ["Min"].forEach((d) => schedule[d].PM.push("benzoyl"));

  return schedule;
}

export function computeAnalysis(skinType, selected) {
  const score = computeScore(skinType, selected);
  const zone = getZone(score);
  const insights = generateInsights(skinType, selected, score);
  const { hydration, protection, balance } = computeSubMetrics(selected, score);
  const schedule = buildSchedule(selected);

  return { score, zone, insights, hydration, protection, balance, schedule };
}
