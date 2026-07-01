import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Droplet, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("Terima kasih sudah subscribe! Tips skincare akan rutin dikirim.");
    setEmail("");
  };

  return (
    <footer className="mt-16 border-t border-white/40 bg-white/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-rose-400 to-amber-400 text-white">
              <Droplet size={14} strokeWidth={2.5} />
            </div>
            <span className="text-base font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>
              SkinLogic.AI
            </span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            Analisis kompatibilitas skincare berbasis AI untuk skin barrier yang lebih sehat.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Jelajahi</h4>
          <ul className="space-y-2 text-xs text-stone-600">
            <li><Link to="/cek-barrier" className="hover:text-rose-600">Cek Skin Barrier</Link></li>
            <li><Link to="/kamus" className="hover:text-rose-600">Kamus Bahan</Link></li>
            <li><Link to="/panduan-kulit" className="hover:text-rose-600">Panduan Tipe Kulit</Link></li>
            <li><Link to="/artikel" className="hover:text-rose-600">Artikel</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Bantuan</h4>
          <ul className="space-y-2 text-xs text-stone-600">
            <li><Link to="/faq" className="hover:text-rose-600">FAQ</Link></li>
            <li><Link to="/kontak" className="hover:text-rose-600">Kontak</Link></li>
            <li><Link to="/tentang" className="hover:text-rose-600">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email kamu"
              className="flex-1 min-w-0 rounded-lg border border-white/60 bg-white/60 px-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
            <button type="submit" className="shrink-0 rounded-lg bg-gradient-to-r from-rose-400 to-amber-400 text-white px-2.5 py-2" aria-label="Subscribe">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/40 py-4 text-center text-[11px] text-stone-400">
        © 2026 SkinLogic.AI — Final project edukasi skincare.
      </div>
    </footer>
  );
}
