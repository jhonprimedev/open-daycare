# SPEC 02 — Niños: lista y perfil

> **Estado:** Aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-21
> **Objetivo:** Implementar los mockups `ninos.dc.html` y `perfil-nino.dc.html` como las rutas `/kids` y `/kids/[id]` con datos mock, buscador con filtro client-side y estilo idéntico (desktop y móvil).

## Alcance

**In:**

- `lib/mock/kids.ts`: tipos `Kid`/`Parent` y los 8 niños del mockup (Mateo idéntico al mockup; los otros 7 inventados siguiendo el patrón).
- `app/kids/page.tsx` (client): header «GESTIÓN/Niños», botón «Agregar niño» inerte, buscador funcional, divisor «SALA SOLES · 8 niños», grid de 2 columnas (1 en móvil).
- `components/kid-card.tsx`: avatar, nombre, resumen de padres, badge de alergía o «VINCULAR» o chevron, hover del mockup (borde `#F2A78E` + `translateY(-2px)`).
- `app/kids/[id]/page.tsx`: «Volver a Niños», avatar 84px + nombre + «3 años · Sala Soles», «Editar» inerte, alerta de alergias (solo si tiene), tabla fecha de nacimiento/sala/ingreso, botón «Resumen del día» inerte, padres vinculados con badges ACTIVA/PENDIENTE y «Vincular otro padre» inerte; `notFound()` para ids desconocidos.
- Modificación de `components/sidebar.tsx`: enlaces reales Feed → `/` y Niños → `/kids`, estado activo según la ruta (`usePathname`; `/kids` y `/kids/*` → Niños); Avisos, Mi cuenta, «Nueva publicación», logo y logout siguen inertes; el drawer cierra al navegar.
- Responsive <768px: grilla de 1 columna y perfil apilado (el drawer ya existe vía layout de SPEC 01).

**Out of scope (futuras specs):**

- Pantallas agregar/editar niño, resumen del día y vincular padre (sus botones quedan inertes).
- Base de datos, persistencia, autenticación.
- Otras salas y conteo de 12 niños del feed (la lista sigue su propio mockup: 8).
- Avisos, Mi cuenta y feed del padre.

## Modelo de datos

`lib/mock/kids.ts`:

```ts
export type ParentStatus = "active" | "pending";

export type Parent = {
  name: string;        // "Lucía Fernández"
  relation: string;    // "Mamá" | "Papá"
  statusNote: string;  // "activa" | "invitación enviada"
  status: ParentStatus;   // badge ACTIVA | PENDIENTE
  avatar: { bg: string; color: string; initial: string };
};

export type Kid = {
  id: string;              // "mateo" — segmento de /kids/[id]
  name: string;            // "Mateo Fernández"
  ageYears: number;        // 3
  room: string;            // "Soles"
  birthDate: string;       // "12 mar 2022"
  enrolledOn: string;      // "feb 2025"
  avatar: { bg: string; color: string; initial: string };
  allergy?: { tag: string; note: string };  // tag "MANÍ" (badge de lista), nota larga del perfil
  parents: Parent[];
};

export const kids: Kid[] = [/* los 8 del mockup, en el mismo orden */];
```

Convenciones:

- Colores de avatar y badges viajan en el dato, no en el JSX (mismos hex del mockup).
- Derivados, no campos: `parentsSummary` → «2 padres vinculados» / «1 padre vinculado» / «sin padres vinculados» según `parents.length`; badge de lista → `allergy.tag` si hay alergia, si no «VINCULAR» si `parents.length === 0`, si no chevron.
- Consistencia de los inventados: Sofía/Emma/Lucas/Olivia 1 padre sin alergia, Benjamín 2 padres sin alergia, Valentina sin padres, Tomás alergia LACTOSA con 1 padre.
- Edades y fechas son texto literal (nunca calculado con la fecha real) — determinista, como SPEC 01.

## Plan de implementación

1. Crear `lib/mock/kids.ts` con tipos, los 8 niños y la consistencia de la lista (chevron/VINCULAR/MANÍ/LACTOSA).
2. Actualizar `components/sidebar.tsx`: enlaces reales `/` y `/kids` con activo por `usePathname`, resto inerte, drawer cierra al navegar. Manual: `npm run dev`, navegar Feed ↔ Niños y verificar estado activo.
3. Crear `components/kid-card.tsx` según el mockup.
4. Crear `app/kids/page.tsx` (client) con header, buscador que filtra por nombre (case-insensitive y sin acentos), divisor y grid de tarjetas filtradas; sin coincidencias, grilla vacía. Manual: «sofia» → 1 tarjeta; «zz» → grilla vacía.
5. Crear `app/kids/[id]/page.tsx`: perfil completo según mockup y `notFound()` para id desconocido. Manual: `/kids/mateo` reproduce el mockup.
6. Verificación con Playwright: `/kids` contra `ninos.dc.html` y `/kids/mateo` contra `perfil-nino.dc.html`; screenshots 1280px y 375px en `.playwright-mcp/`.
7. `npm run lint` (sin problemas fuera de `references/`) y `npm run build`.

## Criterios de aceptación

- [ ] `/kids` muestra «GESTIÓN/Niños», botón «Agregar niño», buscador, divisor «SALA SOLES · 8 niños» y las 8 tarjetas con los textos exactos del mockup.
- [ ] Cada tarjeta navega al perfil de su niño y `/kids/mateo` reproduce `perfil-nino.dc.html` (alerta con la nota exacta, tabla de 3 filas, Lucía ACTIVA, Diego PENDIENTE, «Vincular otro padre»).
- [ ] Un id inexistente (p. ej. `/kids/zz`) muestra la página 404 de Next.
- [ ] El buscador filtra por nombre case-insensitive y sin acentos («sofia» encuentra a Sofía) y una búsqueda sin coincidencias deja la grilla vacía.
- [ ] El sidebar navega de verdad a Feed y Niños, marca el ítem activo según la ruta en `/`, `/kids` y `/kids/*`, y Avisos/Mi cuenta siguen inertes sin 404.
- [ ] «Agregar niño», «Editar», «Resumen del día» y «Vincular otro padre» no navegan.
- [ ] A 375px la lista muestra 1 columna, el perfil se apila y el drawer funciona igual que en SPEC 01.
- [ ] `npm run lint` no reporta problemas fuera de `references/` y `npm run build` pasa sin errores de TypeScript.

## Decisiones

- **Sí:** rutas en inglés `/kids` y `/kids/[id]` — decisión del usuario; código en inglés, copy visible en español.
- **Sí:** perfiles completos para los 8 (datos inventados para 7, Mateo idéntico) — decisión del usuario; la ruta dinámica queda lista para el swap a BD.
- **Sí:** buscador con filtro client-side solo por nombre, grilla vacía sin coincidencias — decisión del usuario (sin mensaje «No se encontró»).
- **Sí:** sidebar con enlaces reales y activo por ruta; Avisos/Mi cuenta inertes hasta sus specs.
- **Sí:** adaptación móvil (grilla 1 columna, perfil apilado) — hereda el criterio responsive de SPEC 01.
- **Sí:** 404 intencional vía `notFound()` para ids desconocidos.
- **Sí:** verificación visual del perfil contra el `.dc.html` renderizado (no hay screenshot en `references/screenshots/`).
- **No:** persistencia, autenticación y pantallas agregar/resumen/vincular — specs propias.
- **No:** fechas o edades calculadas con la fecha real — rompe el determinismo del mock.
- **No:** sincronizar el «12 niños» del feed con el «8 niños» de la lista — cada pantalla sigue su mockup literal.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| El perfil no tiene screenshot de referencia | Comparación directa contra `perfil-nino.dc.html` en Playwright (paso 6) |
| Inconsistencias internas del mockup (feed: 12 niños; edad de Mateo vs. fecha real) | Fechas y edades como texto literal; cada pantalla replica su propio mockup |
| Datos inventados para 7 niños pueden chocar con mocks futuros | Es mock reemplazable; documentado en `lib/mock/kids.ts` |

## Lo que **no** está en esta spec

- Agregar/editar niño, resumen del día, vincular padre.
- Base de datos, persistencia, autenticación.
- Avisos, Mi cuenta, feed del padre, otras salas.

Cada una de esas, si llega, va en su propia spec.
