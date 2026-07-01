import React from "react";
import { Link } from "react-router-dom";
import { Clock, Trash2, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Riwayat() {
  const { history, removeHistoryEntry, clearHistory } = useApp();

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-rose-500" />
          <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Riwayat Analisis</h2>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} className="text-xs font-semibold text-stone-400 hover:text-red-500 flex items-center gap-1">
            <Trash2 size={13} /> Hapus semua
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-white/50">
          <p className="text-stone-500 text-sm mb-3">Belum ada riwayat analisis.</p>
          <Link to="/cek-barrier" className="text-rose-600 text-sm font-semibold hover:underline">Mulai Cek Skin Barrier →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((h) => (
            <div key={h.id} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-4 flex items-center gap-4">
              <Link to={`/riwayat/${h.id}`} className="flex-1 flex items-center gap-4 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {h.score}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-800 truncate">{h.name || "Tanpa nama"} · {h.skinType}</p>
                  <p className="text-xs text-stone-500">{formatDate(h.date)} · {h.zoneLabel}</p>
                </div>
              </Link>
              <button onClick={() => removeHistoryEntry(h.id)} className="p-2 text-stone-400 hover:text-red-500 shrink-0" aria-label="Hapus riwayat ini">
                <Trash2 size={15} />
              </button>
              <Link to={`/riwayat/${h.id}`} className="text-stone-300 shrink-0">
                <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
