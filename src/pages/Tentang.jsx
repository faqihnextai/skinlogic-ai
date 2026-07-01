import React from "react";
import { Info, FlaskConical, ShieldCheck, Sparkles } from "lucide-react";

const VALUES = [
  { Icon: FlaskConical, title: "Berbasis data", text: "Setiap rekomendasi dihitung dari pola interaksi bahan aktif yang umum dipakai." },
  { Icon: ShieldCheck, title: "Fokus barrier", text: "Kami percaya skin barrier yang sehat adalah dasar dari semua hasil skincare." },
  { Icon: Sparkles, title: "Edukatif", text: "Tujuan kami bukan menggantikan dokter kulit, tapi membantu kamu lebih paham kulitmu sendiri." },
];

export default function Tentang() {
  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-rose-100 pb-4">
        <Info size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Tentang SkinLogic.AI</h2>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed mb-8">
        SkinLogic.AI adalah proyek edukasi yang dibuat untuk membantu pengguna memahami
        kompatibilitas bahan aktif skincare secara sederhana namun berbasis logika yang jelas.
        Proyek ini dikembangkan sebagai tugas akhir dengan fokus pada analisis skin barrier,
        deteksi konflik bahan aktif, dan penyusunan rutinitas yang lebih aman.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {VALUES.map((v) => (
          <div key={v.title} className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 text-center flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 text-white flex items-center justify-center">
              <v.Icon size={18} />
            </div>
            <h3 className="text-sm font-bold text-stone-800">{v.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
