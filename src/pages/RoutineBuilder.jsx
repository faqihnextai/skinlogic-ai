import React, { useState } from "react";
import { Wand2, Sun, Moon, X } from "lucide-react";
import { INGREDIENTS, findIngredient } from "../data/ingredients";

function SlotList({ ids, onRemove }) {
  if (ids.length === 0) {
    return <p className="text-xs text-stone-400 text-center py-6">Belum ada bahan di sini</p>;
  }
  return (
    <div className="space-y-2">
      {ids.map((id, idx) => {
        const ing = findIngredient(id);
        return (
          <div key={id + idx} className="flex items-center justify-between bg-white/70 rounded-xl px-3 py-2 border border-white/60">
            <span className="text-sm text-stone-700 font-medium">{ing.label}</span>
            <button onClick={() => onRemove(idx)} className="text-stone-400 hover:text-red-500" aria-label={`Hapus ${ing.label}`}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function RoutineBuilder() {
  const [am, setAm] = useState([]);
  const [pm, setPm] = useState([]);
  const [pickId, setPickId] = useState("");
  const [targetSlot, setTargetSlot] = useState("AM");

  const handleAdd = () => {
    if (!pickId) return;
    if (targetSlot === "AM") setAm((prev) => [...prev, pickId]);
    else setPm((prev) => [...prev, pickId]);
    setPickId("");
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-rose-100 pb-4">
        <Wand2 size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Susun Rutinitas Sendiri</h2>
      </div>

      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 mb-6 flex flex-wrap gap-3 items-end">
        <label className="flex-1 min-w-[160px]">
          <span className="block text-xs font-medium text-stone-600 mb-1">Bahan</span>
          <select value={pickId} onChange={(e) => setPickId(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-sm text-stone-800">
            <option value="">Pilih bahan</option>
            {INGREDIENTS.map((i) => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </label>
        <label className="min-w-[120px]">
          <span className="block text-xs font-medium text-stone-600 mb-1">Waktu</span>
          <select value={targetSlot} onChange={(e) => setTargetSlot(e.target.value)} className="w-full rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-sm text-stone-800">
            <option value="AM">Pagi</option>
            <option value="PM">Malam</option>
          </select>
        </label>
        <button onClick={handleAdd} className="px-5 py-2.5 bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm font-semibold rounded-xl shadow-md">
          Tambah
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sun size={16} className="text-amber-500" />
            <h3 className="text-sm font-semibold text-stone-700">Rutinitas Pagi</h3>
          </div>
          <SlotList ids={am} onRemove={(idx) => setAm((prev) => prev.filter((_, i) => i !== idx))} />
        </div>
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Moon size={16} className="text-rose-500" />
            <h3 className="text-sm font-semibold text-stone-700">Rutinitas Malam</h3>
          </div>
          <SlotList ids={pm} onRemove={(idx) => setPm((prev) => prev.filter((_, i) => i !== idx))} />
        </div>
      </div>

      <p className="text-xs text-stone-400 text-center mt-5">
        Tips: gunakan halaman Cek Skin Barrier untuk analisis otomatis berbasis skor dan deteksi konflik.
      </p>
    </div>
  );
}
