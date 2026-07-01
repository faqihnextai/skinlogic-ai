import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import ChatWidget from "../components/ChatWidget";

export default function Layout() {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-[#fbeee6] via-[#fcdad7] to-[#f5b7b1] text-stone-800 flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12 w-full">
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <ChatWidget />
    </div>
  );
}
