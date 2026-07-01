import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ListChecks, Sparkles } from "lucide-react";
import { findIngredient, CONFLICTS, INGREDIENTS } from "../data/ingredients";

export default function KamusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ing = findIngredient(id);

  if (!ing) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <p className="text-stone-600 mb-3">Bahan tidak ditemukan.</p>
        <Link to="/kamus" className="text-rose-600 text-sm font-semibold hover:underline">Kembali ke Kamus Bahan</Link>
      </div>
    );
  }

  const conflictIds = CONFLICTS.filter(([a, b]) => a === id || b === id).map(([a, b]) => (a === id ? b : a));
  const conflictIngredients = conflictIds.map(findIngredient).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-600 mb-5">
        <ArrowLeft size={14} /> Kembali
      </button>

      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 shadow-md shadow-rose-100/30">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>{ing.label}</h1>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700">{ing.tag}</span>
        </div>
        <p className="text-sm text-stone-600 leading-relaxed mb-6">{ing.desc}</p>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/60 border border-white/50 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <ListChecks size={15} className="text-rose-400" />
              <span className="text-sm font-semibold text-stone-700">Cara Pakai</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">{ing.cara_pakai}</p>
          </div>

          <div className="rounded-2xl bg-amber-50/50 border border-amber-200/60 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <AlertTriangle size={15} className="text-amber-500" />
              <span className="text-sm font-semibold text-stone-700">Peringatan</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">{ing.peringatan}</p>
          </div>

          <div className="rounded-2xl bg-white/60 border border-white/50 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={15} className="text-rose-400" />
              <span className="text-sm font-semibold text-stone-700">Cocok untuk tipe kulit</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {ing.cocok_untuk.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 font-medium">{t}</span>
              ))}
            </div>
          </div>

          {conflictIngredients.length > 0 && (
            <div className="rounded-2xl bg-red-50/50 border border-red-200/60 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle size={15} className="text-red-500" />
                <span className="text-sm font-semibold text-stone-700">Hindari dikombinasikan dengan</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {conflictIngredients.map((c) => (
                  <Link key={c.id} to={`/kamus/${c.id}`} className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-medium hover:bg-red-200">
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/cek-barrier" className="mt-6 w-full block text-center py-3 bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm font-semibold rounded-xl shadow-md hover:opacity-95">
          Cek Kompatibilitas di Kuesioner
        </Link>
      </div>
    </div>
  );
}
