import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQS } from "../data/content";

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-3 p-4 text-left">
        <span className="text-sm font-semibold text-stone-800">{q}</span>
        <ChevronDown size={16} className={`text-rose-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed animate-fadeIn">{a}</div>
      )}
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-rose-100 pb-4">
        <HelpCircle size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Pertanyaan Umum</h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
        ))}
      </div>
    </div>
  );
}
