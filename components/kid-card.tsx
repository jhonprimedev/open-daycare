import Link from "next/link";
import type { Kid } from "@/lib/mock/kids";
import { listBadge, parentsSummary } from "@/lib/mock/kids";

type KidCardProps = {
  kid: Kid;
};

export default function KidCard({ kid }: KidCardProps) {
  const badge = listBadge(kid);

  return (
    <Link
      href={`/kids/${kid.id}`}
      className="group flex items-center gap-[14px] border border-[#ECE0D0] bg-[#FFFDF9] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#F2A78E] min-w-0 rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)]"
    >
      <div
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full font-display text-[19px] font-semibold"
        style={{ backgroundColor: kid.avatar.bg, color: kid.avatar.color }}
      >
        {kid.avatar.initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px] font-semibold text-[#3F362E]">
          {kid.name}
        </div>
        <div className="text-[13px] text-[#A89A8B]">
          {kid.ageYears} años · {parentsSummary(kid)}
        </div>
      </div>

      <div className="flex-none">
        {badge.kind === "none" ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CBB89F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        ) : (
          <span
            className="rounded-full px-[9px] py-[5px] text-[11px] font-extrabold"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.text}
          </span>
        )}
      </div>
    </Link>
  );
}
