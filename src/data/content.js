export const SKIN_TYPE_GUIDE = [
  {
    id: "kering",
    label: "Kering",
    ciri: "Terasa ketat setelah cuci muka, kadang mengelupas, jarang berminyak.",
    fokus: "Prioritaskan hidrasi (Hyaluronic Acid) dan perbaikan barrier (Ceramide).",
    hindari: "Bahan aktif kuat dengan frekuensi tinggi, alkohol denat dalam toner.",
  },
  {
    id: "berminyak",
    label: "Berminyak",
    ciri: "Wajah terlihat mengilap di area T-zone, pori-pori besar, rentan komedo.",
    fokus: "Niacinamide untuk kontrol minyak, Salicylic Acid untuk pori tersumbat.",
    hindari: "Pelembap terlalu berat, skip sunscreen karena takut lengket.",
  },
  {
    id: "kombinasi",
    label: "Kombinasi",
    ciri: "Berminyak di T-zone, normal atau kering di area pipi.",
    fokus: "Pendekatan zona — produk ringan di T-zone, lebih melembapkan di pipi.",
    hindari: "Menyamakan treatment di seluruh wajah tanpa membedakan zona.",
  },
  {
    id: "sensitif",
    label: "Sensitif",
    ciri: "Mudah merah, perih, atau gatal saat coba produk baru.",
    fokus: "Bahan menenangkan seperti Ceramide dan Niacinamide, patch test selalu.",
    hindari: "Mencoba banyak bahan aktif kuat sekaligus, fragrance tinggi.",
  },
  {
    id: "normal",
    label: "Normal",
    ciri: "Minim masalah, tidak terlalu kering atau berminyak, tekstur halus.",
    fokus: "Maintenance — fokus pada pencegahan dengan antioksidan dan SPF.",
    hindari: "Over-treatment dengan terlalu banyak bahan aktif tanpa kebutuhan jelas.",
  },
];

export const ARTICLES = [
  {
    id: "barrier-101",
    title: "Skin Barrier 101: Kenapa Lapisan Ini Penentu Segalanya",
    excerpt: "Skin barrier adalah garis pertahanan pertama kulitmu. Begini cara kerjanya dan tanda-tanda saat ia rusak.",
    readTime: "4 menit",
    body: [
      "Skin barrier adalah lapisan terluar kulit yang berfungsi menahan kelembapan masuk dan mencegah zat berbahaya masuk ke kulit.",
      "Tanda barrier rusak: kulit mudah merah, perih saat pakai skincare biasa, terasa kering meski sudah pakai pelembap, dan breakout tidak biasa.",
      "Cara memperbaiki: kurangi bahan aktif sementara, fokus pada ceramide dan hyaluronic acid, serta beri waktu kulit untuk regenerasi alami.",
    ],
  },
  {
    id: "layering-aktif",
    title: "Urutan Layering Skincare yang Benar",
    excerpt: "Salah urutan pakai skincare bisa mengurangi efektivitas bahkan menyebabkan iritasi. Ini urutan yang disarankan.",
    readTime: "3 menit",
    body: [
      "Urutan umum: pembersih, toner, serum (dari tekstur paling cair), pelembap, lalu sunscreen di pagi hari.",
      "Bahan aktif dengan pH rendah seperti AHA/BHA sebaiknya diberi jarak waktu dengan bahan lain agar tidak saling menetralkan.",
      "Selalu akhiri rutinitas pagi dengan SPF, apa pun kombinasi aktif yang dipakai sebelumnya.",
    ],
  },
  {
    id: "retinol-pemula",
    title: "Panduan Retinol untuk Pemula",
    excerpt: "Retinol powerful tapi mudah disalahgunakan. Begini cara mulai tanpa membuat kulit purging berlebihan.",
    readTime: "5 menit",
    body: [
      "Mulai dengan frekuensi rendah, misalnya 2 kali seminggu, sebelum naik ke pemakaian harian.",
      "Purging ringan di awal pemakaian adalah hal umum, namun jika disertai kemerahan parah sebaiknya hentikan sementara.",
      "Retinol meningkatkan sensitivitas kulit terhadap matahari, sehingga SPF di pagi hari menjadi wajib tanpa kecuali.",
    ],
  },
  {
    id: "myth-busting",
    title: "Mitos vs Fakta: Skincare Natural Selalu Lebih Aman?",
    excerpt: "Label natural bukan jaminan bebas risiko. Ini yang perlu dipahami soal konsentrasi dan formulasi.",
    readTime: "4 menit",
    body: [
      "Bahan natural tetap bisa menyebabkan iritasi atau alergi, tergantung formulasi dan konsentrasinya.",
      "Yang menentukan keamanan bukan asal bahan, melainkan konsentrasi, pH, dan kecocokan dengan kondisi kulit individu.",
      "Patch test tetap diperlukan baik untuk produk berbahan natural maupun sintetis.",
    ],
  },
];

export const FAQS = [
  {
    q: "Apakah hasil analisis SkinLogic.AI menggantikan konsultasi dokter kulit?",
    a: "Tidak. Analisis ini bersifat edukatif untuk membantu memahami kompatibilitas bahan aktif secara umum, bukan diagnosis medis.",
  },
  {
    q: "Kenapa skor barrier saya rendah padahal cuma pakai 2 bahan?",
    a: "Skor dipengaruhi kombinasi, bukan jumlah. Dua bahan yang saling konflik bisa menurunkan skor lebih banyak dibanding lima bahan yang saling mendukung.",
  },
  {
    q: "Apakah data yang saya masukkan disimpan?",
    a: "Riwayat analisis disimpan secara lokal di perangkat kamu melalui browser, tidak dikirim ke server manapun.",
  },
  {
    q: "Saya tipe kulit sensitif, amankah pakai bahan aktif kuat?",
    a: "Bisa, tetapi mulai dari frekuensi rendah dan selalu lakukan patch test. Pertimbangkan konsultasi dengan dokter kulit untuk kasus sensitif yang parah.",
  },
];
