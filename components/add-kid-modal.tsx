"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
import { rooms } from "@/lib/mock/kids";

type AddKidModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    birthDate: string;
    room: string;
    allergy?: string;
    medicalNotes?: string;
  }) => void;
};

export default function AddKidModal({ open, onClose, onSave }: AddKidModalProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [allergy, setAllergy] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setBirthDate("");
      setSelectedRoom("");
      setAllergy("");
      setMedicalNotes("");
      setRoomDropdownOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (!roomDropdownOpen) return;
    const handleClick = (e: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoomDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [roomDropdownOpen]);

  const isValid =
    name.trim() !== "" && birthDate.trim() !== "" && selectedRoom !== "";

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (!isValid) return;
    onSave({
      name: name.trim(),
      birthDate: birthDate.trim(),
      room: selectedRoom,
      allergy: allergy.trim() || undefined,
      medicalNotes: medicalNotes.trim() || undefined,
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Agregar niño"
    >
      <div className="w-full max-w-[520px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECE0D0] px-[26px] py-5">
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] font-bold text-[#94887B]"
          >
            Cancelar
          </button>
          <span className="font-display text-[18px] font-semibold text-[#3F362E]">
            Agregar niño
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className={`text-[15px] font-extrabold ${
              isValid ? "text-[#D9583C]" : "cursor-not-allowed text-[#CBB89F]"
            }`}
          >
            Guardar
          </button>
        </div>

        {/* Form */}
        <div className="px-[26px] py-6">
          {/* Nombre completo */}
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              placeholder="Ej. Martina López"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
            />
          </div>

          {/* Fecha de nacimiento + Sala */}
          <div className="mb-[18px] flex gap-[14px]">
            <div className="flex-1">
              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                FECHA DE NACIMIENTO
              </label>
              <input
                type="text"
                placeholder="dd/mm/aaaa"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                SALA
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setRoomDropdownOpen(!roomDropdownOpen)}
                  className="flex w-full items-center gap-2 rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-left text-[15px] text-[#3F362E] focus:outline-none"
                >
                  <span
                    className={
                      selectedRoom
                        ? "font-bold"
                        : "font-normal text-[#B6A99B]"
                    }
                  >
                    {selectedRoom || "Seleccionar"}
                  </span>
                  <span className="flex-1" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B0A290"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {roomDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white shadow-lg">
                    {rooms.map((room) => (
                      <button
                        key={room}
                        type="button"
                        onClick={() => {
                          setSelectedRoom(room);
                          setRoomDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-[10px] text-left text-[15px] font-bold ${
                          selectedRoom === room
                            ? "bg-[#FBF4EC] text-[#D9583C]"
                            : "text-[#3F362E] hover:bg-[#FBF4EC]"
                        }`}
                      >
                        {room}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alergias */}
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              ALERGIAS (ETIQUETAS)
            </label>
            <input
              type="text"
              placeholder="Ej. Maní, Lactosa"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
              className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
            />
          </div>

          {/* Notas médicas */}
          <div>
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOTAS MÉDICAS
            </label>
            <textarea
              placeholder="Indicaciones, medicación, contactos…"
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              rows={3}
              className="w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
