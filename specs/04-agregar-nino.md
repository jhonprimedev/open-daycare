# SPEC 04 — Agregar niño (modal)

> **Estado:** Aprobado
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-22
> **Objetivo:** Implementar el mockup `agregar-nino.dc.html` como un modal/dialog en `/kids` con validación client-side de campos obligatorios (nombre, fecha de nacimiento, sala) y agregado al mock en memoria.

## Alcance

**In:**

- Modal/dialog que se abre al hacer clic en «Agregar niño» en `/kids`.
- Formulario con campos: nombre completo, fecha de nacimiento, sala (dropdown custom), alergias (etiquetas), notas médicas.
- Validación client-side: nombre, fecha de nacimiento y sala son obligatorios; botón «Guardar» deshabilitado hasta completar los campos requeridos.
- Al guardar con datos válidos: el niño nuevo se agrega al array `kids` en memoria, el modal se cierra y la lista se actualiza automáticamente.
- Al cancelar (botón «Cancelar» o clic fuera del modal): el modal se cierra sin cambios.
- Selector de sala custom (no `<select>` nativo) con datos mock: «Soles», «Luna», «Estrellas».
- Estilos idénticos al mockup: card centrada con header (Cancelar/título/Guardar), inputs redondeados, paleta clara (#FBF4EC), fuentes Fredoka y Nunito.
- Responsive: modal adaptado a móvil (<768px).

**Out of scope (futuras specs):**

- Persistencia real (backend, base de datos).
- Validación de formato de fecha (solo campo requerido, no se valida formato dd/mm/aaaa).
- Edición de niño existente.
- Upload de foto/avatar del niño.
- Asignación de padres desde el modal.

## Modelo de datos

Extensión de `lib/mock/kids.ts`:

```ts
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
```

Convenciones:
- `id` derivado del nombre (slug kebab-case, sin acentos).
- `ageYears: 0` y `enrolledOn: "oct 2026"` como valores por defecto (la edad real se calcularía con la fecha actual, pero se mantiene determinismo).
- Avatar generado automáticamente desde la inicial del nombre (usa `makeAvatar` existente).
- Alergia: si el campo tiene valor, se crea el objeto `allergy` con `tag` en mayúsculas y `note` desde notas médicas.

## Plan de implementación

1. Extender `lib/mock/kids.ts`: agregar array `rooms` y función `createKid()`. Manual: verificar que `rooms` se exporta y `createKid` genera un `Kid` válido.
2. Crear `components/add-kid-modal.tsx`: modal con formulario, validación client-side, dropdown custom de salas, manejo de estado (abierto/cerrado, campos, errores). Manual: `npm run dev`, abrir modal desde `/kids`.
3. Integrar modal en `app/(dashboard)/kids/page.tsx`: botón «Agregar niño» abre el modal; al guardar, el niño nuevo se agrega al estado local y la lista se actualiza. Manual: agregar un niño y verificar que aparece en la lista.
4. Verificación visual con Playwright: screenshots del modal abierto a 1280px y 375px en `.playwright-mcp/`.
5. `npm run lint` y `npm run build`.

## Criterios de aceptación

- [x] Botón «Agregar niño» en `/kids` abre el modal.
- [x] Modal muestra header con «Cancelar», título «Agregar niño» y «Guardar».
- [x] Modal muestra campos: nombre completo, fecha de nacimiento, sala, alergias, notas médicas.
- [x] Campos nombre, fecha y sala son obligatorios; botón «Guardar» deshabilitado si faltan.
- [x] Dropdown de sala muestra «Soles», «Luna», «Estrellas» y permite seleccionar.
- [x] Al guardar con datos válidos: niño se agrega a la lista y modal se cierra.
- [x] Al cancelar (botón o clic fuera): modal se cierra sin cambios.
- [x] Estilos del modal coinciden con el mockup (card centrada, bordes redondeados, shadow).
- [x] Responsive a 375px (modal adaptado a pantalla móvil).
- [x] `npm run lint` no reporta problemas fuera de `references/` y `npm run build` pasa.

## Decisiones

- **Sí:** modal/dialog en lugar de página standalone — decisión del usuario; mejor UX para formularios de alta frecuencia.
- **Sí:** validación client-side de campos obligatorios — decisión del usuario; el botón «Guardar» se deshabilita hasta completar nombre, fecha y sala.
- **Sí:** agregado al mock en memoria — consistente con el enfoque de SPEC 02 (datos mock reemplazables).
- **Sí:** dropdown custom (no `<select>` nativo) — para replicar el mockup exactamente.
- **Sí:** salas mock «Soles», «Luna», «Estrellas» — decisión del usuario; el selector tiene sentido visual con múltiples opciones.
- **Sí:** clic fuera cierra el modal — patrón estándar de dialogs.
- **No:** persistencia real — spec propia cuando se implemente backend.
- **No:** validación de formato de fecha — solo campo requerido, no se valida dd/mm/aaaa.
- **No:** edición de niño existente — spec propia.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| El modal puede tener problemas de foco/accesibilidad | Usar `focus-trap` o manejar foco manualmente; verificar con Playwright |
| El dropdown custom puede no cerrar al hacer clic fuera | Manejar evento de clic en el overlay para cerrar dropdowns abiertos |
| ID generado del niño puede colisionar con existentes | Agregar sufijo numérico si el slug ya existe (p. ej. `mateo-2`) |

## Lo que **no** está en esta spec

- Persistencia real (backend, base de datos).
- Validación de formato de fecha.
- Edición de niño existente.
- Upload de foto/avatar.
- Asignación de padres desde el modal.

Cada una de esas, si llega, va en su propia spec.
