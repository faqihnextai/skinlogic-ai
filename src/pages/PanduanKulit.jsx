import React from "react";
import { Droplets, CheckCircle2, XCircle } from "lucide-react";
import { SKIN_TYPE_GUIDE } from "../data/content";

export default function PanduanKulit() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-rose-100 pb-4">
        <Droplets size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Panduan Tipe Kulit</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SKIN_TYPE_GUIDE.map((s) => (
          <div key={s.id} className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-2xs flex flex-col gap-3">
            <h3 className="text-base font-bold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>{s.label}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{s.ciri}</p>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-xs text-stone-600 leading-relaxed">{s.fokus}</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-stone-600 leading-relaxed">{s.hindari}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
