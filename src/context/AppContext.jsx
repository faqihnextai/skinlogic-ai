import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext(null);

const STORAGE_KEY = "skinlogic_history";

export function AppProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // localStorage tidak tersedia, riwayat tetap berfungsi untuk sesi ini saja
    }
  }, [history]);

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const addHistoryEntry = useCallback((entry) => {
    setHistory((prev) => [{ ...entry, id: Date.now(), date: new Date().toISOString() }, ...prev].slice(0, 50));
  }, []);

  const removeHistoryEntry = useCallback((id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return (
    <AppContext.Provider value={{ history, addHistoryEntry, removeHistoryEntry, clearHistory, toast, showToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam AppProvider");
  return ctx;
}
