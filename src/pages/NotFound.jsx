import React from "react";
import { Link } from "react-router-dom";
import { Droplet, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fadeIn">
      <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-400 to-amber-400 text-white shadow-md mb-5">
        <Droplet size={28} strokeWidth={2} />
      </div>
      <h1 className="text-3xl font-bold text-stone-800 mb-2" style={{ fontFamily: "Fraunces, serif" }}>404</h1>
      <p className="text-stone-600 text-sm mb-6">Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-400 to-amber-400 text-white rounded-2xl text-sm font-semibold shadow-md hover:opacity-95">
        <Home size={16} /> Kembali ke Beranda
      </Link>
    </div>
  );
}
