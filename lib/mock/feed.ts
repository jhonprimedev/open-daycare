export type PostType = "achievement" | "activity" | "announcement";

export type Post = {
  id: string;
  type: PostType;
  title: string;
  time: string;
  publishedBy: string;
  audience: string;
  text: string;
  photo?: string;
  hearts: number;
  comments: number;
  avatar: { bg: string; color: string; initial?: string; icon?: "megaphone" };
};

export const badgeByType: Record<PostType, { label: string; bg: string; color: string }> = {
  achievement: { label: "LOGRO", bg: "#CFEBD8", color: "#3E9B6C" },
  activity: { label: "ACTIVIDAD", bg: "#C7E7F1", color: "#2E89A6" },
  announcement: { label: "ANUNCIO", bg: "#CCD8F4", color: "#4E72C8" },
};

export const currentUser = { name: "Caro Giménez", role: "Maestra · Soles", initial: "C" };

export const room = { name: "Sala Soles", kidsCount: 12, date: "martes 17 jun" };

export const posts: Post[] = [
  {
    id: "post-1",
    type: "achievement",
    title: "Mateo",
    time: "14:20",
    publishedBy: "publicado por vos",
    audience: "Para: familia de Mateo",
    text: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    hearts: 3,
    comments: 1,
    avatar: { bg: "#A9D9E8", color: "#1F7A93", initial: "M" },
  },
  {
    id: "post-2",
    type: "activity",
    title: "Mateo",
    time: "09:40",
    publishedBy: "publicado por vos",
    audience: "Para: familia de Mateo",
    text: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: "Foto · pintando con témperas",
    hearts: 5,
    comments: 2,
    avatar: { bg: "#A9D9E8", color: "#1F7A93", initial: "M" },
  },
  {
    id: "post-3",
    type: "announcement",
    title: "Anuncio general",
    time: "07:50",
    publishedBy: "publicado por vos",
    audience: "Para: toda la sala",
    text: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    hearts: 8,
    comments: 0,
    avatar: { bg: "#CCD8F4", color: "#4E72C8", icon: "megaphone" },
  },
];
