import React from "react";
import { Check, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { findIngredient } from "../data/ingredients";

export function IngredientItem({ ing, checked, onToggle }) {
  return (
    <div className="w-full flex flex-col gap-1 transition-all duration-300">
      <button
        type="button"
        onClick={() => onToggle(ing.id)}
        className={
          "w-full flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 " +
          (checked ? "bg-gradient-to-r from-rose-50 to-amber-50 border-rose-300 shadow-xs scale-[1.01]" : "border-stone-200 hover:border-rose-300 hover:bg-white")
        }
      >
        <span
          className={
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors " +
            (checked ? "bg-gradient-to-r from-rose-400 to-amber-400 border-transparent" : "border-stone-300")
          }
        >
          {checked && <Check size={13} className="text-white" strokeWidth={3} />}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium text-stone-800">{ing.label}</span>
          <span className="block text-xs text-stone-400">{ing.tag}</span>
        </span>
      </button>

      {checked && (
        <div className="px-3.5 py-2 bg-rose-50/50 border border-dashed border-rose-200/60 rounded-xl text-[11px] text-stone-600 leading-relaxed animate-fadeIn">
          {ing.desc}
        </div>
      )}
    </div>
  );
}

export function InsightCard({ type, text }) {
  const cfg = {
    warning: { Icon: AlertTriangle, colors: "bg-amber-50/60 border-amber-200 text-amber-800 font-medium" },
    success: { Icon: CheckCircle2, colors: "bg-gradient-to-r from-rose-50 to-amber-50 border-rose-200 text-rose-900" },
    info: { Icon: Info, colors: "bg-stone-50 border-stone-200 text-stone-700" },
  }[type];
  const { Icon, colors } = cfg;
  return (
    <div className={`flex gap-3 rounded-2xl border p-3.5 shadow-xs ${colors}`}>
      <Icon size={18} className="shrink-0 mt-0.5 opacity-90" />
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}

export function Chip({ id }) {
  const ing = findIngredient(id);
  if (!ing) return null;
  return (
    <div className="text-[10px] leading-tight px-1.5 py-1 rounded-md border text-center font-semibold bg-gradient-to-r from-rose-100 to-amber-100 border-rose-200 text-rose-800 shadow-2xs">
      {ing.label}
    </div>
  );
}

export function SubMeter({ label, value, gradientClasses, textHex }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-stone-500">{label}</span>
        <span className="text-xs font-bold" style={{ color: textHex }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${gradientClasses}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
