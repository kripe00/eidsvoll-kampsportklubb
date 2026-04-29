"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    window.location.href = "/admin/index.html";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Laster TinaCMS...</p>
      </div>
    </div>
  );
}
