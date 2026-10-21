# SPEC 01 — Home: feed de la guardería

> **Estado:** Implementado
> **Depende de:** ninguna (primera spec del repo)
> **Fecha:** 2026-10-20
> **Objetivo:** Implementar el mockup `references/pantallas/feed.dc.html` como home `/`, sin autenticación ni base de datos, con datos mock y estilo idéntico al proporcionado (desktop y móvil con drawer).

## Alcance

**In:**

- Reescritura de `app/layout.tsx`, `app/globals.css` y `app/page.tsx` (se elimina el scaffold de create-next-app).
- Sidebar compartido montado desde `app/layout.tsx`: logo OpenDayCare · Sala Soles, botón «Nueva publicación», nav Feed/Niños/Avisos/Mi cuenta (Feed en estado activo), tarjeta «Caro Giménez · Maestra · Soles».
- Contenido del feed: header de saludo («GUARDERÍA · SALA SOLES», «Buenas, Caro», «12 niños · martes 17 jun»), tarjeta «Compartí un momento…», divisor «PUBLICADO HOY» y los 3 posts del mockup (logro, actividad con placeholder de foto, anuncio general).
- Datos mock tipados en `lib/mock/feed.ts` (usuario, sala, publicaciones).
- Fuentes Fredoka y Nunito con `next/font/google`.
- Responsive: por debajo de 768px el sidebar se oculta y un botón hamburguesa abre un drawer superpuesto con la misma navegación.
- Componentes nuevos: `components/sidebar.tsx` y `components/post-card.tsx`.

**Out of scope (futuras specs):**

- Autenticación (login, activar cuenta) y cualquier lógica de sesión.
- Rutas reales de crear publicación, detalle, foto, Niños, Avisos y Mi cuenta.
- Base de datos o persistencia de cualquier tipo.
- Interactividad del feed: likes, comentarios y composer funcionales.
- Feed del padre y pantallas de familia (índice 11–15 del mockup).
- Dark mode.

## Modelo de datos

`lib/mock/feed.ts`:

```ts
export type PostType = "achievement" | "activity" | "announcement";

export type Post = {
  id: string;
  type: PostType;
  title: string;         // "Mateo" | "Anuncio general"
  time: string;          // "14:20"
  publishedBy: string;   // "publicado por vos"
  audience: string;      // "Para: familia de Mateo" | "Para: toda la sala"
  text: string;
  photo?: string;        // placeholder caption — only "activity" carries it
  hearts: number;
  comments: number;
  avatar: { bg: string; color: string; initial?: string; icon?: "megaphone" };
};

export const currentUser = { name: "Caro Giménez", role: "Maestra · Soles", initial: "C" };
export const room = { name: "Sala Soles", kidsCount: 12, date: "martes 17 jun" };
export const posts: Post[] = [/* los 3 del mockup, en el mismo orden */];
```

Convenciones:

- Colores de avatar y badge viajan en el dato, no hardcodeados en el JSX: `achievement` `#CFEBD8`/`#3E9B6C`, `activity` `#C7E7F1`/`#2E89A6`, `announcement` `#CCD8F4`/`#4E72C8`, avatar de niño `#A9D9E8`/`#1F7A93`, avatar de anuncio `#CCD8F4`/`#4E72C8`.
- Las etiquetas del badge (LOGRO, ACTIVIDAD, ANUNCIO) y todo el copy visible quedan en español, mapeadas por `PostType`.
- Fecha («martes 17 jun») y divisor («PUBLICADO HOY») son texto fijo del mock.

## Plan de implementación

1. Crear `lib/mock/feed.ts` con los tipos y los datos (usuario, sala, 3 posts).
2. Reescribir `app/globals.css`: import de Tailwind, paleta clara del mockup (fondo `#F6ECDF`, texto `#3F362E`), sin dark mode, conexión de variables de fuente.
3. Reescribir `app/layout.tsx`: Fredoka y Nunito vía `next/font/google` (`--font-fredoka` / `--font-nunito`), `lang="es"`, metadata «OpenDayCare — Sala Soles», y montar el shell con `components/sidebar.tsx` + `<main>`.
4. Crear `components/sidebar.tsx`: sidebar fijo de 248px (logo, CTA, nav, tarjeta de usuario), Feed activo, enlaces inertes; en <768px oculto con hamburguesa que abre drawer con backdrop. Manual: `npm run dev`, probar drawer.
5. Crear `components/post-card.tsx`: cabecera (avatar, título, hora, badge por tipo), destinatarios, texto, placeholder de foto si `photo` existe, pie con corazones/comentarios/«Editar» inertes.
6. Reescribir `app/page.tsx`: header de saludo, tarjeta «Compartí un momento…», divisor «PUBLICADO HOY», mapeo de `posts`.
7. Verificación visual con Playwright: screenshots desktop (1280px) y móvil (375px) en `.playwright-mcp/`, comparación contra `references/screenshots/feed.png`.
8. `npm run lint` (sin problemas fuera de `references/`) y `npm run build`.

## Criterios de aceptación

- [x] `/` muestra header de saludo, tarjeta «Compartí un momento…», divisor «PUBLICADO HOY» y los 3 posts con los textos exactos del mockup.
- [x] El sidebar muestra logo, «Nueva publicación», nav con Feed activo y la tarjeta «Caro Giménez · Maestra · Soles».
- [x] Ningún clic desde el home lleva a una ruta inexistente (cero 404).
- [x] Fredoka y Nunito cargan vía `next/font` (sin `<link>` a fonts.googleapis.com en el HTML servido).
- [x] A 1280px la comparación visual contra `references/screenshots/feed.png` coincide en estructura, colores y tipografías.
- [x] A 375px el sidebar está oculto, la hamburguesa es visible y el drawer abre y cierra.
- [x] Corazones, comentarios y «Editar» no cambian al clic.
- [x] `npm run lint` no reporta problemas fuera de `references/`.
- [x] `npm run build` pasa sin errores de TypeScript.

## Decisiones

- **Sí:** sidebar compartido desde `app/layout.tsx` — Niños, Avisos y Mi cuenta lo heredan sin reescribirlo.
- **Sí:** datos mock tipados en `lib/mock/feed.ts` — el futuro swap a base de datos es trivial.
- **Sí:** enlaces visibles pero inertes — el estilo debe ser idéntico; cada ruta llega con su spec.
- **Sí:** todo estático (contadores, «Editar», composer) — el pedido fue «solo el estilo».
- **Sí:** `next/font/google` — self-hosted, sin CDN en runtime, mismo aspecto.
- **Sí:** responsive en esta spec con hamburguesa + drawer <768px — elegido por el usuario; el mockup solo define desktop.
- **Sí:** fecha y divisor como texto fijo del mock — determinista para la comparación visual.
- **Sí:** componentes en `components/` y datos en `lib/mock/` (raíz) — el alias `@/*` apunta a la raíz del repo.
- **Sí:** identificadores y discriminadores del código en inglés (`PostType`, `currentUser`, `room`, `photo`) — regla del repo (código en inglés); el copy visible y los datos de ejemplo siguen en español.
- **No:** `<link>` a Google Fonts — request externo en cada carga; `next/font` lo evita.
- **No:** stubs «próximamente» por enlace — archivos sin valor; las pantallas llegan con sus specs.
- **No:** fecha real con `Intl` — mezcla real/mock y rompe la comparación 1:1.
- **No:** dark mode — el mockup define solo tema claro.
- **No:** likes/comentarios funcionales — sin BD no hay dónde persistir; van con la spec del detalle.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Deriva visual al traducir los estilos inline del mockup a componentes | Usar los hex y medidas literales del mockup; verificación por screenshot contra `references/screenshots/feed.png` (paso 7) |
| El drawer móvil no existe en el mockup (diseño nuevo) | Reutilizar el mismo contenido y estilos del sidebar; overlay simple con backdrop y cierre |
| `next/font` descarga las fuentes la primera vez que compila | Se cachea localmente tras el primer `npm run dev`/`build`; runtime sin dependencia de red |

## Lo que **no** está en esta spec

- Autenticación (login / activar cuenta).
- Rutas de crear publicación, detalle, foto, Niños, Avisos y Mi cuenta.
- Base de datos, persistencia, likes y comentarios reales.
- Feed del padre y pantallas de familia.
- Dark mode.

Cada una de esas, si llega, va en su propia spec.
