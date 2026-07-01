import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, FlaskConical, Layers, User, Beaker, Lock, Database, Stethoscope } from "lucide-react";
import { INGREDIENTS } from "../data/ingredients";
import heroModelImg from "../images/hero-model.jpg";

const PREVIEW_ROWS = [
  { label: "Niacinamide", status: "Aman", tone: "good" },
  { label: "Vitamin C", status: "Optimal di pagi hari", tone: "good" },
  { label: "Retinol + AHA", status: "Risiko iritasi", tone: "bad" },
];

const STATS = [
  { value: `${INGREDIENTS.length}+`, label: "Bahan aktif dianalisis" },
  { value: "7", label: "Kombinasi konflik terdeteksi" },
  { value: "24/7", label: "Cek barrier kapan saja" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: User,
    title: "Isi Profil Kulit",
    desc: "Masukkan nama dan tipe kulitmu sebagai dasar perhitungan analisis.",
    accent: "rose",
  },
  {
    step: "02",
    icon: Beaker,
    title: "Pilih Bahan Aktif",
    desc: "Tandai bahan aktif yang sedang atau akan kamu pakai dari daftar yang tersedia.",
    accent: "rose",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "AI Hitung Skor Barrier",
    desc: "Sistem mengecek kombinasi bahan lalu menampilkan skor barrier beserta rekomendasinya.",
    accent: "ai",
  },
];

const TRUST_POINTS = [
  {
    icon: Database,
    title: `${INGREDIENTS.length}+ Bahan Terpetakan`,
    desc: "Database bahan aktif dan kombinasi konfliknya disusun untuk basis analisis.",
  },
  {
    icon: Lock,
    title: "Privasi Terjaga",
    desc: "Riwayat analisis disimpan lokal di perangkatmu, tidak dikirim ke server manapun.",
  },
  {
    icon: Stethoscope,
    title: "Bukan Pengganti Dokter",
    desc: "Hasil analisis bersifat edukatif, bukan diagnosis medis untuk kondisi kulit serius.",
  },
];

function PreviewRow({ label, status, tone, delay }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="rounded-2xl bg-white/70 border border-white/60 p-4 flex items-center justify-between transition-all duration-500"
      style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(8px)" }}
    >
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + (tone === "good" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600")}>
        {status}
      </span>
    </div>
  );
}

function AnalysisCard() {
  return (
    <div className="rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/60 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-stone-500 flex items-center gap-1.5">
          <Layers size={14} className="text-ai-500" />
          Preview Analisis
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-3">
        {PREVIEW_ROWS.map((row, i) => (
          <PreviewRow key={row.label} {...row} delay={i * 250} />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/50 flex items-center gap-2 text-xs text-stone-500">
        <ShieldCheck size={14} className="text-rose-400" />
        Skor barrier kamu dihitung otomatis dari kombinasi di atas
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-7xl mx-auto py-4 md:py-12">
      {/* HERO with full background model photo (Lactacyd-style) */}
      <div className="relative">
        {/* Photo layer: z-0, sits behind everything inside this hero box only */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[40px]">
          <img
            src={heroModelImg}
            alt=""
            className="w-full h-full object-cover object-[center_20%]"
          />

          {/* AI face-scan overlay: grid + landmark dots + animated scan line */}
          <svg
            className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="scanFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb7185" stopOpacity="0" />
                <stop offset="50%" stopColor="#fb7185" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g stroke="#fda4af" strokeWidth="0.08" opacity="0.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={"v" + i} x1={50 + i * 3.5} y1="0" x2={50 + i * 3.5} y2="100" />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={"h" + i} x1="50" y1={i * 7} x2="100" y2={i * 7} />
              ))}
            </g>

            <g fill="#f43f5e">
              {[
                [68, 28], [76, 26], [84, 29], [90, 35], [92, 45],
                [90, 56], [85, 65], [78, 72], [70, 75], [63, 70],
                [60, 60], [60, 48], [63, 38], [72, 40], [80, 42],
                [73, 50], [78, 52], [70, 58], [76, 60],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.2;1;0.2"
                    dur="2.4s"
                    begin={`${i * 0.08}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              <g stroke="#fb7185" strokeWidth="0.15" opacity="0.5">
                <line x1="68" y1="28" x2="76" y2="26" />
                <line x1="76" y1="26" x2="84" y2="29" />
                <line x1="60" y1="48" x2="63" y2="38" />
                <line x1="63" y1="38" x2="72" y2="40" />
                <line x1="72" y1="40" x2="80" y2="42" />
                <line x1="73" y1="50" x2="78" y2="52" />
                <line x1="70" y1="58" x2="76" y2="60" />
                <line x1="63" y1="70" x2="70" y2="75" />
                <line x1="70" y1="75" x2="78" y2="72" />
              </g>
            </g>

            <rect x="55" y="0" width="40" height="1.2" fill="url(#scanFade)">
              <animate attributeName="y" values="15;85;15" dur="3.5s" repeatCount="indefinite" />
            </rect>
          </svg>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(255,241,235,0.95) 0%, rgba(255,241,235,0.6) 22%, rgba(255,241,235,0.15) 42%, rgba(255,241,235,0) 58%)",
            }}
          />
        </div>

        {/* Content layer: z-10, always above the photo layer */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-[560px] py-10">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/50 backdrop-blur-xs border border-white/60 text-rose-600 shadow-2xs mx-auto lg:mx-0">
              <FlaskConical size={12} />
              Dianalisis dari {INGREDIENTS.length}+ bahan aktif populer
            </span>

            <h1 className="text-4xl md:text-6xl text-stone-800 leading-tight" style={{ fontFamily: "Fraunces, serif" }}>
              Pahami Lapisan Kulitmu Demi Kunci{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-rose-500 via-[#d99b59] to-amber-600 bg-clip-text text-transparent font-bold">
                  Kecantikan Abadi
                </span>
                <svg className="absolute left-0 -bottom-1 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,4 Q50,0 100,4 T200,4" stroke="#f5b7b1" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Jangan asal campur bahan aktif. SkinLogic.AI membantu menganalisis
              kompatibilitas skincare, memahami kondisi skin barrier, dan
              menyusun rutinitas perawatan yang lebih aman.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/cek-barrier")}
                className="animate-shimmer flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-rose-400 via-[#e0a96d] to-amber-400 text-white rounded-2xl text-sm font-semibold hover:opacity-95 transition-all shadow-md"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Mulai Cek Skin Barrier
                  <ArrowRight size={16} />
                </span>
              </button>
              <button
                onClick={() => navigate("/kamus")}
                className="px-6 py-3.5 bg-white/40 backdrop-blur-xs text-stone-700 border border-white/50 rounded-2xl text-sm font-semibold hover:bg-white/60 transition-all"
              >
                Pelajari Bahan Aktif
              </button>
            </div>

            <div className="flex gap-6 justify-center lg:justify-start pt-2">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-lg font-bold text-rose-600" style={{ fontFamily: "Fraunces, serif" }}>{s.value}</div>
                  <div className="text-[11px] text-stone-500 leading-tight max-w-[90px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: transparent so the model photo shows through;
              the analysis card floats over the lower-right edge of the photo */}
          <div className="relative hidden lg:block h-full">
            <div className="absolute bottom-0 right-0 w-[88%]">
              <AnalysisCard />
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md border border-ai-100 rounded-2xl px-3 py-2 shadow-md flex items-center gap-1.5 rotate-3">
                <Sparkles size={14} className="text-ai-500" />
                <span className="text-xs font-semibold text-ai-700">AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Mobile: card stacks normally below the text */}
          <div className="relative lg:hidden">
            <AnalysisCard />
          </div>
        </div>
      </div>

      <div className="relative mt-20 md:mt-28">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-ai-50 border border-ai-100 text-ai-600 mb-3">
            <Sparkles size={12} />
            Cara Kerja
          </span>
          <h2 className="text-2xl md:text-3xl text-stone-800" style={{ fontFamily: "Fraunces, serif" }}>
            Tiga Langkah Sebelum Kamu Mencampur Skincare
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc, accent }, i) => (
            <div key={step} className="relative rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 p-6">
              <div
                className={
                  "h-11 w-11 rounded-2xl flex items-center justify-center mb-4 " +
                  (accent === "ai" ? "bg-ai-100 text-ai-600" : "bg-rose-100 text-rose-500")
                }
              >
                <Icon size={20} />
              </div>
              <span className="text-xs font-bold text-stone-400 tracking-widest">{step}</span>
              <h3 className="text-base font-bold text-stone-800 mt-1 mb-1.5">{title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              {i < HOW_IT_WORKS.length - 1 && (
                <ArrowRight size={16} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-stone-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 md:mt-20 rounded-[28px] bg-white/40 backdrop-blur-sm border border-white/60 p-6 md:p-8">
        <div className="grid sm:grid-cols-3 gap-6">
          {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center">
                <Icon size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-0.5">{title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}