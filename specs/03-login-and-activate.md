# SPEC 03 — Login y activar cuenta

> **Estado:** Aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-22
> **Objetivo:** Implementar los mockups `login.dc.html` y `activar-cuenta.dc.html` como las rutas `/login` y `/activate` con formularios inertes, estilo idéntico y redirección a `/` tras el envío.

## Alcance

**In:**

- `app/login/page.tsx`: pantalla de login con logo OpenDayCare, título «Iniciar sesión», subtítulo, campos de email y contraseña, botón «Iniciar sesión», link «¿Olvidaste tu contraseña?» y link «Activá tu cuenta» que navega a `/activate`.
- `app/activate/page.tsx`: pantalla de activación con icono de logo, título «Bienvenida a OpenDayCare», subtítulo, tarjeta de invitación (avatar de niño + «Mateo · Sala Soles»), campos de código de invitación, email y crear contraseña, checkbox de autorización, botón «Activar mi cuenta» y link «Iniciar sesión» que navega a `/login`.
- Layout standalone sin sidebar (pantallas de auth independientes).
- Estilos idénticos a los mockups: paleta clara (#FBF4EC), fuentes Fredoka y Nunito, gradientes naranjas, inputs redondeados, botones con gradiente.
- Formularios completamente inertes (sin validación, sin lógica de autenticación).
- Ambos formularios redirigen a `/` al hacer submit.
- Responsive: en móvil (<768px) login sin panel izquierdo, activación centrada.

**Out of scope (futuras specs):**

- Autenticación real (backend, sesiones, tokens, cookies).
- Validación de formularios.
- Selección de rol (Personal/Familia) en login.
- Lógica de activación de cuenta real.
- Sidebar compartido o navegación global.
- Dark mode.

## Modelo de datos

Esta spec no introduce nuevas estructuras de datos.

## Plan de implementación

1. Crear `app/login/page.tsx` replicando el mockup `login.dc.html` sin los botones «Personal»/«Familia». Manual: `npm run dev`, navegar a `/login`.
2. Crear `app/activate/page.tsx` replicando el mockup `activar-cuenta.dc.html`. Manual: navegar a `/activate`.
3. Verificación visual con Playwright: screenshots de `/login` y `/activate` a 1280px y 375px.
4. `npm run lint` y `npm run build`.

## Criterios de aceptación

- [ ] `/login` muestra panel izquierdo con gradiente naranja, logo, título, subtítulo y texto de sala.
- [ ] `/login` muestra panel derecho con email, contraseña, links y botón «Iniciar sesión».
- [ ] `/login` NO muestra los botones «Personal»/«Familia».
- [ ] `/activate` muestra icono, título, subtítulo, tarjeta de invitación, campos y botón.
- [ ] Link «Activá tu cuenta» en `/login` navega a `/activate`.
- [ ] Link «Iniciar sesión» en `/activate` navega a `/login`.
- [ ] Formularios inertes, sin validación.
- [ ] Comparación visual contra mockups coincide a 1280px.
- [ ] Responsive a 375px.
- [ ] Fredoka y Nunito vía `next/font`.
- [ ] `npm run lint` y `npm run build` pasan.

## Decisiones

- **Sí:** rutas `/login` y `/activate`.
- **Sí:** standalone sin sidebar.
- **Sí:** formularios inertes.
- **Sí:** ambos redirigen a `/` al submit.
- **Sí:** exclusión de selección de rol (Personal/Familia).
- **No:** autenticación real, validación, lógica de activación real.

## Lo que **no** está en esta spec

- Autenticación real (backend, sesiones, tokens, cookies).
- Validación de formularios.
- Selección de rol (Personal/Familia) en login.
- Lógica de activación de cuenta real.
- Sidebar compartido o navegación global.
- Dark mode.

Cada una de esas, si llega, va en su propia spec.
