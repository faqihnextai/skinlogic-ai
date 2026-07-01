import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { ARTICLES } from "../data/content";

export default function ArtikelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <p className="text-stone-600 mb-3">Artikel tidak ditemukan.</p>
        <Link to="/artikel" className="text-rose-600 text-sm font-semibold hover:underline">Kembali ke Artikel</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <button onClick={() => navigate("/artikel")} className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-600 mb-5">
        <ArrowLeft size={14} /> Kembali ke Artikel
      </button>

      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 shadow-md shadow-rose-100/30">
        <h1 className="text-2xl font-bold text-stone-800 mb-2" style={{ fontFamily: "Fraunces, serif" }}>{article.title}</h1>
        <span className="flex items-center gap-1 text-[11px] text-stone-400 mb-5">
          <Clock size={11} /> {article.readTime} membaca
        </span>
        <div className="space-y-4">
          {article.body.map((p, i) => (
            <p key={i} className="text-sm text-stone-600 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
