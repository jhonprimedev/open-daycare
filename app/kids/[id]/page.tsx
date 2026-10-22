"use client";

import { use, type MouseEvent } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { kids } from "@/lib/mock/kids";
import type { Parent, ParentStatus } from "@/lib/mock/kids";

type Props = {
  params: Promise<{ id: string }>;
};

const parentBadge: Record<ParentStatus, { label: string; bg: string; color: string }> = {
  active: { label: "ACTIVA", bg: "#CFEBD8", color: "#3E9B6C" },
  pending: { label: "PENDIENTE", bg: "#F7E7A6", color: "#9A7B1E" },
};

function ParentRow({ parent }: { parent: Parent }) {
  const badge = parentBadge[parent.status];
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-[16px] font-semibold text-white"
        style={{ backgroundColor: parent.avatar.bg, color: parent.avatar.color }}
      >
        {parent.avatar.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-extrabold text-[#3F362E]">{parent.name}</div>
        <div className="text-[12.5px] text-[#A89A8B]">
          {parent.relation} · {parent.statusNote}
        </div>
      </div>
      <span
        className="flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold"
        style={{ backgroundColor: badge.bg, color: badge.color }}
      >
        {badge.label}
      </span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[#F0E6D8] px-[18px] py-[15px] last:border-b-0">
      <span className="text-[14.5px] text-[#94887B]">{label}</span>
      <span className="text-[14.5px] font-extrabold text-[#3F362E]">{value}</span>
    </div>
  );
}

export default function KidProfilePage({ params }: Props) {
  const { id } = use(params);
  const kid = kids.find((k) => k.id === id);
  if (!kid) return notFound();

  const handleInertClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <div className="mx-auto w-full max-w-[820px] px-10 py-[34px] pb-20">
      <Link
        href="/kids"
        className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-[#94887B]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver a Niños
      </Link>

      <div className="flex flex-col items-start gap-[18px] md:flex-row md:items-start md:gap-[26px]">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-[18px]">
          <div className="flex flex-wrap items-center gap-[18px]">
            <div
              className="flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full font-display text-[34px] font-semibold"
              style={{ backgroundColor: kid.avatar.bg, color: kid.avatar.color }}
            >
              {kid.avatar.initial}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="m-0 font-display text-[28px] font-semibold text-[#3F362E]">
                {kid.name}
              </h1>
              <p className="mt-[3px] text-[15px] text-[#94887B]">
                {kid.ageYears} años · Sala {kid.room}
              </p>
            </div>
            <a
              href="#"
              onClick={handleInertClick}
              className="rounded-xl border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] px-4 py-[9px] text-[14px] font-bold text-[#6E6359]"
            >
              Editar
            </a>
          </div>

          {kid.allergy && (
            <div className="flex gap-[14px] rounded-2xl bg-[#FBDAD6] p-[16px_18px]">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-[#F4A8A0]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <div>
                <div className="mb-[2px] text-[15px] font-extrabold text-[#C5413A]">
                  Alergias y notas
                </div>
                <div className="text-[14.5px] leading-[1.5] text-[#B25249]">
                  {kid.allergy.note}
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-[#ECE0D0] bg-[#FFFDF9]">
            <InfoRow label="Fecha de nacimiento" value={kid.birthDate} />
            <InfoRow label="Sala" value={kid.room} />
            <InfoRow label="Ingreso" value={kid.enrolledOn} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-[14px] md:w-[300px] md:flex-none">
          <a
            href="#"
            onClick={handleInertClick}
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-[#3F362E] p-[13px] text-[15px] font-extrabold text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            Resumen del día
          </a>

          <div className="rounded-2xl border border-[#ECE0D0] bg-[#FFFDF9] p-[16px_18px]">
            <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
              PADRES VINCULADOS
            </div>
            <div className="flex flex-col gap-[14px]">
              {kid.parents.map((parent) => (
                <ParentRow key={parent.name} parent={parent} />
              ))}
              <a
                href="#"
                onClick={handleInertClick}
                className="flex items-center gap-3 pt-2"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span className="text-[14.5px] font-extrabold text-[#C5503A]">
                  Vincular otro padre
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
