import React from "react";
import { X, ShieldCheck, Sparkles, Calendar } from "lucide-react";
import Gauge from "./Gauge";
import { InsightCard, Chip, SubMeter } from "./Shared";
import { DAYS } from "../data/ingredients";

export default function ResultModal({ result, displayScore, name, onClose }) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/60 backdrop-blur-xl w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/60 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        <div className="px-6 py-4 border-b border-white/40 flex items-center justify-between bg-white/40 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-rose-500" />
            <h3 className="text-base font-bold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>
              Hasil Analisis Eksklusif {name ? `untuk ${name}` : ""}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/50 text-stone-400 hover:text-rose-600 transition-colors" aria-label="Tutup modal hasil">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white/50 border border-white/40 p-6 rounded-2xl">
            <div>
              <Gauge score={displayScore} />
              <div className="text-center mt-2">
                <span className="inline-block text-xs font-semibold px-4 py-1 rounded-full bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 text-rose-700">
                  Kondisi: {result.zone.label}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Dimensi Kesehatan Sel</h4>
              <SubMeter label="Hidrasi" value={result.hydration} gradientClasses="from-rose-300 to-rose-400" textHex="#e11d48" />
              <SubMeter label="Proteksi UV" value={result.protection} gradientClasses="from-amber-300 to-amber-400" textHex="#b45309" />
              <SubMeter label="Keseimbangan" value={result.balance} gradientClasses="from-rose-400 to-amber-400" textHex="#be123c" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-rose-400" />
              <span className="text-sm font-semibold text-stone-700">Rekomendasi Formula AI</span>
            </div>
            <div className="space-y-2.5">
              {result.insights.map((insight, idx) => (
                <InsightCard key={idx} type={insight.type} text={insight.text} />
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-white/40 pt-4">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-rose-400" />
              <span className="text-sm font-semibold text-stone-700">Smart Calendar — Jadwal Pemakaian Aman</span>
            </div>
            <div className="grid grid-cols-8 gap-2 overflow-x-auto min-w-[600px] p-1">
              <div></div>
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-bold text-rose-900/60 pb-1">{d}</div>
              ))}
              {[{ key: "AM", label: "Pagi" }, { key: "PM", label: "Malam" }].map((slot) => (
                <React.Fragment key={slot.key}>
                  <div className="text-xs font-semibold text-stone-500 flex items-center">{slot.label}</div>
                  {DAYS.map((d) => {
                    const items = result.schedule[d][slot.key];
                    return (
                      <div key={d + slot.key} className="rounded-xl border border-white/60 bg-white/80 min-h-12 p-1 flex flex-col gap-1 justify-center shadow-2xs">
                        {items.length === 0 ? (
                          <span className="text-center text-stone-300 text-xs">—</span>
                        ) : (
                          items.map((id, idx) => <Chip key={id + idx} id={id} />)
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white/40 border-t border-white/40 text-center">
          <button onClick={onClose} className="animate-shimmer px-6 py-2 bg-gradient-to-r from-rose-400 to-amber-400 text-white text-xs font-bold rounded-xl shadow-xs hover:opacity-95 active:scale-95 transition-all">
            Selesai & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
