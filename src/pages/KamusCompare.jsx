import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GitCompare, AlertTriangle } from "lucide-react";
import { INGREDIENTS, findIngredient, CONFLICTS } from "../data/ingredients";

function isConflicting(idA, idB) {
  return CONFLICTS.some(([a, b]) => (a === idA && b === idB) || (a === idB && b === idA));
}

function IngredientPicker({ value, onChange, excludeId }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
    >
      <option value="">Pilih bahan</option>
      {INGREDIENTS.filter((i) => i.id !== excludeId).map((i) => (
        <option key={i.id} value={i.id}>{i.label}</option>
      ))}
    </select>
  );
}

function CompareCard({ ing }) {
  if (!ing) {
    return (
      <div className="rounded-2xl bg-white/30 border border-dashed border-white/60 p-6 flex items-center justify-center text-stone-400 text-sm min-h-[220px]">
        Pilih bahan di atas
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-white/50 border border-white/50 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-stone-800">{ing.label}</h3>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">{ing.tag}</span>
      </div>
      <p className="text-xs text-stone-600 leading-relaxed mb-3">{ing.desc}</p>
      <p className="text-[11px] text-stone-500"><span className="font-semibold">Cara pakai:</span> {ing.cara_pakai}</p>
    </div>
  );
}

export default function KamusCompare() {
  const [idA, setIdA] = useState("retinol");
  const [idB, setIdB] = useState("vitaminc");

  const ingA = findIngredient(idA);
  const ingB = findIngredient(idB);
  const conflict = idA && idB && isConflicting(idA, idB);

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <Link to="/kamus" className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-600 mb-5 w-fit">
        <ArrowLeft size={14} /> Kembali ke Kamus
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <GitCompare size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Bandingkan Dua Bahan</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <IngredientPicker value={idA} onChange={setIdA} excludeId={idB} />
        <IngredientPicker value={idB} onChange={setIdB} excludeId={idA} />
      </div>

      {conflict && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-2xl p-4 mb-4">
          <AlertTriangle size={16} /> Kombinasi ini berisiko iritasi — sebaiknya dipisah ke waktu pakai yang berbeda.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CompareCard ing={ingA} />
        <CompareCard ing={ingB} />
      </div>
    </div>
  );
}
