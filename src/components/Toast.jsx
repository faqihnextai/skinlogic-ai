import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className="fixed bottom-6 left-1/2 z-50 animate-toastIn flex items-center gap-2 bg-stone-800 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl max-w-[90vw]"
    >
      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
      <span>{toast.message}</span>
    </div>
  );
}
