import React, { useState, useEffect } from "react";
import { User, RefreshCw, Beaker, AlertTriangle } from "lucide-react";
import { INGREDIENTS, SKIN_TYPES } from "../data/ingredients";
import { computeAnalysis } from "../utils/analysis";
import { IngredientItem } from "../components/Shared";
import ResultModal from "../components/ResultModal";
import { useApp } from "../context/AppContext";

export default function CekBarrier() {
  const { addHistoryEntry, showToast } = useApp();
  const [name, setName] = useState("");
  const [skinType, setSkinType] = useState("");
  const [selected, setSelected] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleIngredient = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const canAnalyze = name.trim().length > 0 && skinType.length > 0;

  const handleAnalyze = () => {
    if (!canAnalyze) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const r = computeAnalysis(skinType, selected);
      setResult(r);
      setAnalyzing(false);
      setShowModal(true);
      addHistoryEntry({ name, skinType, selected, score: r.score, zoneLabel: r.zone.label });
      showToast("Hasil analisis tersimpan ke riwayat.");
    }, 900);
  };

  const confirmReset = () => {
    setName("");
    setSkinType("");
    setSelected([]);
    setResult(null);
    setDisplayScore(0);
    setShowResetConfirm(false);
  };

  useEffect(() => {
    if (!result) return;
    const target = result.score;
    const duration = 700;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const progress = Math.min(1, (t - start) / duration);
      setDisplayScore(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    setDisplayScore(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 shadow-md shadow-rose-100/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <User size={16} className="text-rose-400" />
            <h2 className="text-sm font-semibold tracking-wider uppercase text-rose-900/40">Kuesioner Kulit</h2>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RefreshCw size={12} /> Reset Form
          </button>
        </div>

        <label className="block mb-5">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">Nama</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama kamu"
            className="w-full rounded-xl border border-white/60 bg-white/60 backdrop-blur-xs px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">Tipe Kulit</span>
          <select
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
            className="w-full rounded-xl border border-white/60 bg-white/60 backdrop-blur-xs px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
          >
            <option value="">Pilih tipe kulit</option>
            {SKIN_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Beaker size={15} className="text-rose-400" />
            <span className="text-sm font-medium text-stone-700">Bahan Aktif yang Dipakai</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
            {INGREDIENTS.map((ing) => (
              <IngredientItem key={ing.id} ing={ing} checked={selected.includes(ing.id)} onToggle={toggleIngredient} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!canAnalyze || analyzing}
          className="animate-shimmer w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-gradient-to-r from-rose-400 via-[#e0a96d] to-amber-400 hover:opacity-95 shadow-md shadow-rose-300/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-98"
        >
          {analyzing ? "Menganalisis Kondisi Kulit..." : "Mulai Analisis"}
        </button>
        {!canAnalyze && (
          <p className="text-xs text-stone-400 mt-2 text-center">Lengkapi nama &amp; tipe kulit untuk memulai analisis</p>
        )}

        {result && !analyzing && (
          <button onClick={() => setShowModal(true)} className="w-full mt-3 text-center text-xs font-semibold text-rose-600 hover:underline block">
            Lihat Kembali Hasil Analisis Terakhir
          </button>
        )}
      </div>

      {showModal && result && (
        <ResultModal result={result} displayScore={displayScore} name={name} onClose={() => setShowModal(false)} />
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-md animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-xl w-full max-w-sm rounded-3xl border border-white/60 p-6 shadow-2xl text-center animate-scaleUp">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h3 className="text-base font-bold text-stone-800 mb-1">Reset form ini?</h3>
            <p className="text-xs text-stone-500 mb-5">Semua isian kuesioner dan hasil analisis saat ini akan terhapus.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-semibold">
                Batal
              </button>
              <button onClick={confirmReset} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm font-semibold">
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
