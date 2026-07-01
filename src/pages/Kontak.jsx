import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Kontak() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    showToast("Pesan terkirim! Tim kami akan membalas secepatnya.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-rose-100 pb-4">
        <Mail size={20} className="text-rose-500" />
        <h2 className="text-xl font-semibold text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>Kontak Kami</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 space-y-5">
        <label className="block">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">Nama</span>
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Nama kamu"
            className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="email@kamu.com"
            className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">Pesan</span>
          <textarea
            value={form.message}
            onChange={handleChange("message")}
            placeholder="Tulis pertanyaan atau masukan kamu"
            rows={4}
            className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none"
          />
        </label>
        <button type="submit" className="animate-shimmer w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm font-semibold rounded-xl shadow-md hover:opacity-95">
          <Send size={15} /> Kirim Pesan
        </button>
      </form>
    </div>
  );
}
