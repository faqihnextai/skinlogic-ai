import React from "react";
import { X, Heart } from "lucide-react";

export default function WelcomeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/60 backdrop-blur-xl w-full max-w-md rounded-3xl border border-white/60 p-6 md:p-8 shadow-2xl flex flex-col items-center text-center relative animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-white/50 text-stone-400 hover:text-rose-600 transition-colors"
          aria-label="Tutup welcome modal"
        >
          <X size={16} />
        </button>
        <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-400 to-amber-400 text-white shadow-md shadow-rose-200/60 mb-5">
          <Heart size={26} strokeWidth={2} className="animate-pulse" />
        </div>
        <h2 className="text-2xl text-stone-800 font-medium tracking-wide mb-2" style={{ fontFamily: "Fraunces, serif" }}>
          <span className="bg-gradient-to-r from-rose-500 to-amber-600 bg-clip-text text-transparent font-bold">SkinLogic.AI ✨</span>
        </h2>
        <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-6">
          Halo, Glow Seekers! Yuk, cek kesehatan skin barrier-mu sekarang. Cari tahu kombinasi bahan aktif yang aman demi kulit sehat dan berkilau alami.
        </p>
        <button
          onClick={onClose}
          className="animate-shimmer w-full py-3 bg-gradient-to-r from-rose-400 via-[#e0a96d] to-amber-400 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-200/50 hover:opacity-95 active:scale-95 transition-all"
        >
          Masuk ke Beranda
        </button>
      </div>
    </div>
  );
}
