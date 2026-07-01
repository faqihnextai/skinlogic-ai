import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Droplet, Home, Sparkles, BookOpen, Clock, Newspaper, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Beranda", Icon: Home },
  { to: "/cek-barrier", label: "Cek Barrier", Icon: Sparkles },
  { to: "/kamus", label: "Kamus Bahan", Icon: BookOpen },
  { to: "/riwayat", label: "Riwayat", Icon: Clock },
  { to: "/artikel", label: "Artikel", Icon: Newspaper },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-white/30 backdrop-blur-md border-b border-white/40 px-5 md:px-6 py-4 shadow-2xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-400 to-amber-400 text-white shadow-xs">
            <Droplet size={16} strokeWidth={2.5} />
          </div>
          <span className="text-xl tracking-wide text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>
            SkinLogic<span className="bg-gradient-to-r from-rose-500 to-amber-600 bg-clip-text text-transparent font-bold">.AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-semibold rounded-xl transition-all ${
                  isActive ? "bg-white/80 text-rose-600 shadow-2xs" : "text-stone-600 hover:text-rose-500"
                }`
              }
            >
              <Icon size={14} /> {label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl bg-white/50 text-stone-600"
          aria-label="Buka menu navigasi"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-1 animate-fadeIn">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  isActive ? "bg-white/80 text-rose-600" : "text-stone-600"
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
