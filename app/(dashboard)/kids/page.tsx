"use client";

import { useState, useMemo, type MouseEvent } from "react";
import { kids as initialKids, createKid, type Kid } from "@/lib/mock/kids";
import KidCard from "@/components/kid-card";
import AddKidModal from "@/components/add-kid-modal";

const normalizeText = (text: string): string =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const generateUniqueId = (slug: string, existingIds: Set<string>): string => {
  if (!existingIds.has(slug)) return slug;
  let suffix = 2;
  while (existingIds.has(`${slug}-${suffix}`)) suffix++;
  return `${slug}-${suffix}`;
};

export default function KidsPage() {
  const [kidsList, setKidsList] = useState<Kid[]>(initialKids);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const existingIds = useMemo(
    () => new Set(kidsList.map((k) => k.id)),
    [kidsList],
  );

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim());
    if (q === "") return kidsList;
    return kidsList.filter((kid) => normalizeText(kid.name).includes(q));
  }, [query, kidsList]);

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalKey((k) => k + 1);
    setModalOpen(true);
  };

  const handleSave = (data: {
    name: string;
    birthDate: string;
    room: string;
    allergy?: string;
    medicalNotes?: string;
  }) => {
    const kid = createKid(data);
    kid.id = generateUniqueId(kid.id, existingIds);
    setKidsList((prev) => [...prev, kid]);
    setModalOpen(false);
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
        <button
          type="button"
          onClick={handleAddClick}
          className="cursor-pointer flex items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
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
        </button>
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
        <span className="text-[13px] text-[#A89A8B]">{kidsList.length} niños</span>
        <span className="flex-1 h-px bg-[#E7DAC8]" />
      </div>

      <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
        {filtered.map((kid) => (
          <KidCard key={kid.id} kid={kid} />
        ))}
      </div>

      <AddKidModal
        key={modalKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
