import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import WelcomeModal from "./components/WelcomeModal";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home";
import CekBarrier from "./pages/CekBarrier";
import Kamus from "./pages/Kamus";
import KamusDetail from "./pages/KamusDetail";
import KamusCompare from "./pages/KamusCompare";
import Riwayat from "./pages/Riwayat";
import RiwayatDetail from "./pages/RiwayatDetail";
import Artikel from "./pages/Artikel";
import ArtikelDetail from "./pages/ArtikelDetail";
import PanduanKulit from "./pages/PanduanKulit";
import RoutineBuilder from "./pages/RoutineBuilder";
import Faq from "./pages/Faq";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <AppProvider>
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cek-barrier" element={<CekBarrier />} />
          <Route path="/kamus" element={<Kamus />} />
          <Route path="/kamus/bandingkan" element={<KamusCompare />} />
          <Route path="/kamus/:id" element={<KamusDetail />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/riwayat/:id" element={<RiwayatDetail />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
          <Route path="/panduan-kulit" element={<PanduanKulit />} />
          <Route path="/rutinitas" element={<RoutineBuilder />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
