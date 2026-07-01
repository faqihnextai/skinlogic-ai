import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, AlertTriangle } from "lucide-react";
import { askAssistant, hasApiKey } from "../utils/chatClient";

const GREETING = {
  role: "assistant",
  content: "Hai! Aku asisten AI SkinLogic. Tanya apa aja soal bahan aktif, urutan layering, atau skin barrier kamu 👋",
};

function Bubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={"flex " + (isUser ? "justify-end" : "justify-start")}>
      <div
        className={
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed " +
          (isUser
            ? "bg-gradient-to-r from-rose-400 to-amber-400 text-white rounded-br-sm"
            : "bg-white/80 border border-white/60 text-stone-700 rounded-bl-sm")
        }
      >
        {content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/80 border border-white/60 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ai-400 animate-bounce"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const keyMissing = !hasApiKey();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading || keyMissing) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const reply = await askAssistant(nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm h-[28rem] flex flex-col rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl animate-scaleUp overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/50 bg-white/40">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-xl bg-ai-100 text-ai-600 flex items-center justify-center">
                <Sparkles size={15} />
              </span>
              <div>
                <p className="text-sm font-bold text-stone-800 leading-tight">Asisten SkinLogic.AI</p>
                <p className="text-[11px] text-stone-500">Tanya soal skincare kamu</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 flex items-center justify-center rounded-full text-stone-500 hover:bg-white/60 transition-colors"
              aria-label="Tutup chat"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && <TypingDots />}
            {error && (
              <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-3 py-2.5 text-xs leading-relaxed">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                {error}
              </div>
            )}
            {keyMissing && (
              <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-3 py-2.5 text-xs leading-relaxed">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                Belum ada API key. Tambahkan <code className="font-mono">VITE_GEMINI_API_KEY</code> di file .env, lalu restart server dev-nya.
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/50 bg-white/40 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={keyMissing}
              placeholder={keyMissing ? "API key belum diatur" : "Tulis pertanyaan kamu..."}
              className="flex-1 rounded-xl border border-white/60 bg-white/70 px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-ai-200 focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || keyMissing || !input.trim()}
              className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-r from-ai-500 to-ai-600 text-white flex items-center justify-center disabled:opacity-40 transition-all"
              aria-label="Kirim"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 md:right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-ai-500 to-ai-600 text-white shadow-xl flex items-center justify-center hover:opacity-95 transition-all"
        aria-label={open ? "Tutup asisten AI" : "Buka asisten AI"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}