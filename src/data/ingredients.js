export const SKIN_TYPES = ["Kering", "Berminyak", "Kombinasi", "Sensitif", "Normal"];
export const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
export const STRONG = ["retinol", "ahabha", "salicylic", "benzoyl"];
export const FRIENDLY = ["niacinamide", "hyaluronic", "ceramide", "peptide"];

export const INGREDIENTS = [
  {
    id: "retinol",
    label: "Retinol",
    tag: "Aktif Kuat",
    family: "purple",
    desc: "Emas utama untuk anti-aging dan jerawat. Mempercepat regenerasi kulit, namun wajib digunakan di malam hari saja dan harus diikuti SPF di pagi hari.",
    cara_pakai: "Mulai 2x seminggu di malam hari, naikkan frekuensi bertahap setelah kulit terbiasa.",
    peringatan: "Jangan dipakai bersamaan dengan AHA/BHA, Benzoyl Peroxide, atau Vitamin C di waktu yang sama.",
    cocok_untuk: ["Berminyak", "Kombinasi", "Normal"],
  },
  {
    id: "vitaminc",
    label: "Vitamin C",
    tag: "Aktif",
    family: "amber",
    desc: "Antioksidan tinggi untuk mencerahkan noda hitam dan merangsang kolagen. Paling optimal digunakan di pagi hari di bawah sunscreen.",
    cara_pakai: "Pakai di pagi hari sebelum moisturizer dan sunscreen.",
    peringatan: "Hindari dicampur dengan Retinol atau Benzoyl Peroxide secara langsung.",
    cocok_untuk: ["Kering", "Kombinasi", "Normal"],
  },
  {
    id: "niacinamide",
    label: "Niacinamide",
    tag: "Pendukung Barrier",
    family: "rose",
    desc: "Bahan multifungsi yang sangat aman. Membantu mengontrol minyak, mencerahkan, dan memperkuat skin barrier tanpa risiko iritasi tinggi.",
    cara_pakai: "Bisa dipakai pagi dan malam, cocok untuk hampir semua tipe kulit.",
    peringatan: "Risiko iritasi rendah, relatif aman dikombinasikan dengan bahan lain.",
    cocok_untuk: ["Kering", "Berminyak", "Kombinasi", "Sensitif", "Normal"],
  },
  {
    id: "ahabha",
    label: "AHA/BHA Exfoliant",
    tag: "Aktif Kuat",
    family: "rose",
    desc: "Mengangkat sel kulit mati di permukaan (AHA) dan membersihkan hingga ke dalam pori (BHA). Batasi pemakaian 2-3 kali seminggu.",
    cara_pakai: "Gunakan malam hari, 2-3 kali seminggu, selalu diikuti pelembap.",
    peringatan: "Jangan digabung dengan Retinol atau Benzoyl Peroxide di malam yang sama.",
    cocok_untuk: ["Berminyak", "Kombinasi", "Normal"],
  },
  {
    id: "salicylic",
    label: "Salicylic Acid",
    tag: "Aktif Kuat",
    family: "orange",
    desc: "Jenis BHA yang sangat ampuh menyembuhkan jerawat aktif dan komedo. Bisa memicu kulit kering jika dipakai berlebihan.",
    cara_pakai: "Gunakan sebagai spot treatment atau toner 2-3x seminggu di malam hari.",
    peringatan: "Hindari dikombinasikan dengan Retinol pada malam yang sama.",
    cocok_untuk: ["Berminyak", "Kombinasi"],
  },
  {
    id: "benzoyl",
    label: "Benzoyl Peroxide",
    tag: "Aktif Kuat",
    family: "red",
    desc: "Membunuh bakteri penyebab jerawat dengan cepat. Bersifat mengeringkan, disarankan untuk digunakan sebagai spot treatment.",
    cara_pakai: "Aplikasikan tipis hanya di area jerawat aktif, mulai dari konsentrasi rendah.",
    peringatan: "Tidak boleh dicampur dengan Retinol, AHA/BHA, atau Vitamin C secara bersamaan.",
    cocok_untuk: ["Berminyak"],
  },
  {
    id: "hyaluronic",
    label: "Hyaluronic Acid",
    tag: "Pendukung Barrier",
    family: "sky",
    desc: "Magnet hidrasi murni. Mengunci kelembapan di dalam jaringan kulit, sangat disarankan untuk kulit dehidrasi dan sensitif.",
    cara_pakai: "Pakai pada kulit lembap, pagi dan malam, sebelum pelembap.",
    peringatan: "Aman untuk hampir semua tipe kulit, termasuk sensitif.",
    cocok_untuk: ["Kering", "Berminyak", "Kombinasi", "Sensitif", "Normal"],
  },
  {
    id: "ceramide",
    label: "Ceramide",
    tag: "Pendukung Barrier",
    family: "rose",
    desc: "Lem pelindung sel kulit. Bahan paling krusial untuk memperbaiki dan menjaga integritas lapisan skin barrier agar tidak rapuh.",
    cara_pakai: "Gunakan di langkah akhir rutinitas, pagi dan malam.",
    peringatan: "Sangat aman, justru direkomendasikan saat barrier rusak.",
    cocok_untuk: ["Kering", "Sensitif", "Normal"],
  },
  {
    id: "peptide",
    label: "Peptide",
    tag: "Pendukung Barrier",
    family: "fuchsia",
    desc: "Rantai asam amino yang memicu produksi kolagen baru, menjaga kekenyalan kulit, dan menyamarkan garis halus.",
    cara_pakai: "Gunakan malam hari pada kulit bersih sebelum pelembap.",
    peringatan: "Aman dikombinasikan dengan hampir semua bahan lain.",
    cocok_untuk: ["Kering", "Kombinasi", "Normal"],
  },
  {
    id: "spf",
    label: "SPF / Sunscreen",
    tag: "Wajib",
    family: "amber",
    desc: "Perisai mutlak kulit dari penuaan dini dan kerusakan akibat sinar UV. Tanpa SPF, semua investasi skincare aktif lain akan sia-sia.",
    cara_pakai: "Aplikasikan setiap pagi sebagai langkah terakhir, ulangi tiap 2-3 jam jika di luar ruangan.",
    peringatan: "Wajib digunakan, terutama jika memakai bahan aktif kuat lain.",
    cocok_untuk: ["Kering", "Berminyak", "Kombinasi", "Sensitif", "Normal"],
  },
];

export const CONFLICTS = [
  ["retinol", "ahabha"],
  ["retinol", "salicylic"],
  ["retinol", "benzoyl"],
  ["retinol", "vitaminc"],
  ["ahabha", "benzoyl"],
  ["ahabha", "salicylic"],
  ["benzoyl", "vitaminc"],
];

export function findIngredient(id) {
  return INGREDIENTS.find((i) => i.id === id);
}
