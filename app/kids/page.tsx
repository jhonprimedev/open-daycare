"use client";

import { useState, useMemo, type MouseEvent } from "react";
import Link from "next/link";
import { kids } from "@/lib/mock/kids";
import KidCard from "@/components/kid-card";

const normalizeText = (text: string): string =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function KidsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim());
    if (q === "") return kids;
    return kids.filter((kid) => normalizeText(kid.name).includes(q));
  }, [query]);

  const handleInertClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <div className="mx-auto w-full max-w-[880px] px-10 py-[34px] pb-20">
      <div className="mb-[22px] flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-[#D9583C]">
            GESTIÓN
          </div>
          <h1 className="m-0 font-display text-[30px] font-semibold text-[#3F362E]">
            Niños
          </h1>
        </div>
        <Link
          href="#"
          onClick={handleInertClick}
          className="flex items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Agregar niño
        </Link>
      </div>

      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-[#ECE0D0] bg-[#FFFDF9] px-4 py-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B0A290"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Buscar niño…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-none bg-none text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#3F362E]">
          SALA SOLES
        </span>
        <span className="text-[13px] text-[#A89A8B]">{kids.length} niños</span>
        <span className="flex-1 h-px bg-[#E7DAC8]" />
      </div>

      <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
        {filtered.map((kid) => (
          <KidCard key={kid.id} kid={kid} />
        ))}
      </div>
    </div>
  );
}
