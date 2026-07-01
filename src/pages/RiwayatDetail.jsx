import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { computeAnalysis } from "../utils/analysis";
import ResultModal from "../components/ResultModal";

export default function RiwayatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { history } = useApp();

  const entry = history.find((h) => String(h.id) === id);
  const result = useMemo(() => {
    if (!entry) return null;
    return computeAnalysis(entry.skinType, entry.selected);
  }, [entry]);

  if (!entry || !result) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <p className="text-stone-600 mb-3">Riwayat tidak ditemukan.</p>
        <Link to="/riwayat" className="text-rose-600 text-sm font-semibold hover:underline">Kembali ke Riwayat</Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <button onClick={() => navigate("/riwayat")} className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-600 mb-5">
        <ArrowLeft size={14} /> Kembali ke Riwayat
      </button>
      <ResultModal result={result} displayScore={result.score} name={entry.name} onClose={() => navigate("/riwayat")} />
    </div>
  );
}
