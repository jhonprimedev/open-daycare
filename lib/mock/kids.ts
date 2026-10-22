export type ParentStatus = "active" | "pending";

export type Parent = {
  name: string;
  relation: string;
  statusNote: string;
  status: ParentStatus;
  avatar: { bg: string; color: string; initial: string };
};

export type Kid = {
  id: string;
  name: string;
  ageYears: number;
  room: string;
  birthDate: string;
  enrolledOn: string;
  avatar: { bg: string; color: string; initial: string };
  allergy?: { tag: string; note: string };
  parents: Parent[];
};

const avatarByInitial = (initial: string): { bg: string; color: string } => {
  const palette: Record<string, { bg: string; color: string }> = {
    M: { bg: "#A9D9E8", color: "#1F7A93" },
    S: { bg: "#F4B8CC", color: "#C44A7A" },
    B: { bg: "#B9DEC4", color: "#3E8B62" },
    V: { bg: "#F4DC8E", color: "#9A7B1E" },
    T: { bg: "#C9B6E8", color: "#7B5FC0" },
    E: { bg: "#F4B8CC", color: "#C44A7A" },
    L: { bg: "#A9D9E8", color: "#1F7A93" },
    O: { bg: "#B9DEC4", color: "#3E8B62" },
    A: { bg: "#C9B6E8", color: "#7B5FC0" },
    C: { bg: "#F4DC8E", color: "#9A7B1E" },
    R: { bg: "#A9D9E8", color: "#1F7A93" },
    P: { bg: "#F4B8CC", color: "#C44A7A" },
  };
  return palette[initial] ?? { bg: "#E4D6C4", color: "#8A7C6D" };
};

export const makeAvatar = (initial: string) => {
  const c = avatarByInitial(initial);
  return { bg: c.bg, color: c.color, initial };
};

export const makeParent = (
  name: string,
  relation: string,
  status: ParentStatus,
  statusNote: string,
  initial: string,
): Parent => ({
  name,
  relation,
  statusNote,
  status,
  avatar: makeAvatar(initial),
});

export const parentsSummary = (kid: Kid): string => {
  const n = kid.parents.length;
  if (n === 0) return "sin padres vinculados";
  if (n === 1) return "1 padre vinculado";
  return `${n} padres vinculados`;
};

type ListBadge =
  | { kind: "allergy"; text: string; bg: string; color: string }
  | { kind: "link"; text: string; bg: string; color: string }
  | { kind: "none" };

export const listBadge = (kid: Kid): ListBadge => {
  if (kid.allergy) {
    return { kind: "allergy", text: kid.allergy.tag, bg: "#FBD8CC", color: "#D9684A" };
  }
  if (kid.parents.length === 0) {
    return { kind: "link", text: "VINCULAR", bg: "#F9D2DE", color: "#C56486" };
  }
  return { kind: "none" };
};

export const rooms: string[] = ["Soles", "Luna", "Estrellas"];

export const createKid = (data: {
  name: string;
  birthDate: string;
  room: string;
  allergy?: string;
  medicalNotes?: string;
}): Kid => {
  const initial = data.name.trim().charAt(0).toUpperCase();
  const id = data.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id,
    name: data.name,
    ageYears: 0,
    room: data.room,
    birthDate: data.birthDate,
    enrolledOn: "oct 2026",
    avatar: makeAvatar(initial),
    allergy: data.allergy ? { tag: data.allergy.toUpperCase(), note: data.medicalNotes ?? "" } : undefined,
    parents: [],
  };
};

export const kids: Kid[] = [
  {
    id: "mateo",
    name: "Mateo Fernández",
    ageYears: 3,
    room: "Soles",
    birthDate: "12 mar 2022",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("M"),
    allergy: {
      tag: "MANÍ",
      note: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    },
    parents: [
      makeParent("Lucía Fernández", "Mamá", "active", "activa", "L"),
      makeParent("Diego Fernández", "Papá", "pending", "invitación enviada", "D"),
    ],
  },
  {
    id: "sofia",
    name: "Sofía Méndez",
    ageYears: 2,
    room: "Soles",
    birthDate: "08 may 2023",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("S"),
    parents: [makeParent("María Méndez", "Mamá", "active", "activa", "M")],
  },
  {
    id: "benjamin",
    name: "Benjamín Ruiz",
    ageYears: 3,
    room: "Soles",
    birthDate: "20 sep 2022",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("B"),
    parents: [
      makeParent("Ana Ruiz", "Mamá", "active", "activa", "A"),
      makeParent("Carlos Ruiz", "Papá", "active", "activo", "C"),
    ],
  },
  {
    id: "valentina",
    name: "Valentina Soto",
    ageYears: 2,
    room: "Soles",
    birthDate: "15 jul 2023",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("V"),
    parents: [],
  },
  {
    id: "tomas",
    name: "Tomás Díaz",
    ageYears: 3,
    room: "Soles",
    birthDate: "03 ene 2022",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("T"),
    allergy: {
      tag: "LACTOSA",
      note: "Tiene alergia a la lactosa. Seguir la dieta especial enviada por la familia.",
    },
    parents: [makeParent("Elena Díaz", "Mamá", "active", "activa", "E")],
  },
  {
    id: "emma",
    name: "Emma Castro",
    ageYears: 2,
    room: "Soles",
    birthDate: "22 oct 2023",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("E"),
    parents: [makeParent("Paula Castro", "Mamá", "active", "activa", "P")],
  },
  {
    id: "lucas",
    name: "Lucas Romero",
    ageYears: 3,
    room: "Soles",
    birthDate: "11 feb 2022",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("L"),
    parents: [makeParent("Julia Romero", "Mamá", "active", "activa", "J")],
  },
  {
    id: "olivia",
    name: "Olivia Vega",
    ageYears: 2,
    room: "Soles",
    birthDate: "30 jun 2023",
    enrolledOn: "feb 2025",
    avatar: makeAvatar("O"),
    parents: [makeParent("Laura Vega", "Mamá", "active", "activa", "L")],
  },
];
