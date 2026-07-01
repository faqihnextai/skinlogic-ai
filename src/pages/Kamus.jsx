import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, GitCompare } from "lucide-react";
import { INGREDIENTS } from "../data/ingredients";

const TAGS = ["Semua", "Aktif Kuat", "Aktif", "Pendukung Barrier", "Wajib"];

export default function Kamus() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("Semua");

  const filtered = useMemo(() => {
    return INGREDIENTS.filter((ing) => {
      const matchTag = activeTag === "Semua" || ing.tag === activeTag;
      const matchQuery = ing.label.toLowerCase().includes(query.trim().toLowerCase());
      return matchTag && matchQuery;
    });
  }, [query, activeTag]);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between gap-2 mb-6 border-b border-rose-100 pb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-rose-500" />
          <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>
            Skincare Ingredient Dictionary
          </h2>
        </div>
        <Link to="/kamus/bandingkan" className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-white/50 border border-white/60 px-3 py-1.5 rounded-xl hover:bg-white/70 transition-colors">
          <GitCompare size={14} /> Bandingkan Bahan
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari bahan, misal: niacinamide"
            className="w-full rounded-xl border border-white/60 bg-white/60 backdrop-blur-xs pl-10 pr-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                activeTag === tag ? "bg-rose-500 text-white border-rose-500" : "bg-white/50 text-stone-600 border-white/60 hover:bg-white/70"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-white/50">
          <p className="text-stone-500 text-sm mb-1">Bahan tidak ditemukan</p>
          <p className="text-stone-400 text-xs">Coba kata kunci lain atau ubah filter tag.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ing) => (
            <Link
              key={ing.id}
              to={`/kamus/${ing.id}`}
              className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-2xs flex flex-col gap-2 hover:border-rose-200 hover:bg-white/60 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-stone-800">{ing.label}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700">{ing.tag}</span>
              </div>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed">{ing.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
