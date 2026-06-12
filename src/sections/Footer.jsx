import React from "react";

export function Footer() {
  return (
    <footer 
      className="relative w-full py-10 bg-bg border-t border-[rgba(242,235,217,0.02)] select-none"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* 
        Red Thread Termination Node
        Aligns with the left-[40px] vertical thread line, ending it 
        with a small vermillion dot.
      */}
      <div className="absolute left-[40px] top-0 -translate-y-1 w-[2px] h-4 bg-[var(--vermillion)] opacity-30 hidden md:block"></div>
      <div className="absolute left-[38.5px] top-3.5 w-1.5 h-1.5 rounded-full bg-[var(--vermillion)] shadow-[0_0_6px_var(--vermillion)] opacity-80 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between text-[10px] font-ui tracking-widest text-[var(--text-3)] uppercase font-bold">
        {/* Footnote signature */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
          <span>© 2025 ATHARVA GHULE</span>
          <span className="hidden md:inline">·</span>
          <span>@athen-g</span>
          <span className="hidden md:inline">·</span>
          <span>CRAFTED WITH OBSESSION</span>
        </div>
      </div>
    </footer>
  );
}
