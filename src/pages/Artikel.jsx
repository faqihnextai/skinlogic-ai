import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, Clock } from "lucide-react";
import { ARTICLES } from "../data/content";

export default function Artikel() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-rose-100 pb-4">
        <Newspaper size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Artikel & Edukasi</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ARTICLES.map((a) => (
          <Link
            key={a.id}
            to={`/artikel/${a.id}`}
            className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-2xs flex flex-col gap-2 hover:border-rose-200 hover:bg-white/60 transition-all"
          >
            <h3 className="text-base font-bold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>{a.title}</h3>
            <p className="text-stone-600 text-xs md:text-sm leading-relaxed">{a.excerpt}</p>
            <span className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
              <Clock size={11} /> {a.readTime} membaca
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
