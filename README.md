# SkinLogic.AI

Web analisis kompatibilitas bahan aktif skincare & skor skin barrier — final project.

## Cara menjalankan

1. Pastikan Node.js sudah terinstall (cek dengan `node -v`).
2. Buka terminal di folder project ini, lalu jalankan:

```bash
npm install
npm run dev
```

3. Buka link yang muncul di terminal (biasanya `http://localhost:5173`) di browser.

## Build untuk production

```bash
npm run build
```

Hasil build akan ada di folder `dist/`.

## Struktur halaman

- `/` — Beranda
- `/cek-barrier` — Kuesioner & analisis skin barrier
- `/kamus` — Kamus bahan aktif (search + filter)
- `/kamus/:id` — Detail bahan
- `/kamus/bandingkan` — Bandingkan 2 bahan
- `/riwayat` — Riwayat hasil analisis (tersimpan di localStorage browser)
- `/riwayat/:id` — Detail riwayat
- `/artikel` — Artikel edukasi skincare
- `/artikel/:id` — Detail artikel
- `/panduan-kulit` — Panduan 5 tipe kulit
- `/rutinitas` — Susun rutinitas AM/PM manual
- `/faq` — Pertanyaan umum
- `/tentang` — Tentang SkinLogic.AI
- `/kontak` — Form kontak

## Asisten AI (Chatbot)

Ada widget chat mengambang di pojok kanan bawah, di semua halaman. Bot ini terhubung langsung ke Claude API (Anthropic) dan dikasih konteks dari data bahan aktif di `src/data/ingredients.js`, jadi jawabannya konsisten sama logika analisis di aplikasi ini.

**Setup:**

1. Bikin API key di https://console.anthropic.com
2. Copy `.env.example` jadi `.env` di root project
3. Isi `VITE_ANTHROPIC_API_KEY` dengan key kamu
4. Restart `npm run dev` (env var cuma terbaca saat server start)

**⚠️ Penting soal keamanan:** karena project ini frontend-only (tanpa backend), API key-nya ditanam langsung di kode yang jalan di browser pengguna. Siapa pun yang buka DevTools → Network bisa lihat key itu dan ikut memakai kuotanya. Ini **aman buat dijalankan sendiri secara lokal** (mis. untuk demo presentasi tugas), tapi **jangan deploy ke hosting publik** dengan key asli tertanam — kalau mau publish online, key-nya harus dipindah ke backend/serverless function yang nggak ikut terkirim ke browser.



React 18 + Vite + React Router + Tailwind CSS + lucide-react (icon).

## Catatan teknis

- Logic analisis (scoring, insight, scheduling) dipisah per fungsi di `src/utils/analysis.js` agar mudah dibaca dan ditest, bukan satu fungsi besar.
- Data bahan aktif & artikel ada di `src/data/` — gampang ditambah/diedit tanpa menyentuh komponen.
- Riwayat analisis memakai `localStorage`, jadi data tetap ada walau browser ditutup, tapi spesifik per browser/device.
