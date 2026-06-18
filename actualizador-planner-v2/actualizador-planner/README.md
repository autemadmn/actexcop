# Actualizador Planner

![Deploy](https://github.com/USERNAME/actualizador-planner/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)

> Aplicacion web local para trabajar con un Excel exportado de Planner y un Excel maestro. Permite revisar datos, filtrar tareas, validar el proyecto y crear una copia actualizada del Excel maestro sin backend ni subida de archivos.

## Demo

Live demo: **https://USERNAME.github.io/actualizador-planner/**

> Sustituye `USERNAME` por tu usuario de GitHub.

---

## Caracteristicas

- 5 vistas: Excel, Planner (kanban), Grid, Calendario, Maestro
- Carga local de Excel via drag & drop (sin backend)
- Filtros por nombre, responsable individual y estado de fechas
- Validacion automatica del proyecto (Planner vs Maestro)
- Generacion de copia actualizada del Maestro (nunca sobrescribe el original)
- Datos de ejemplo integrados para probar sin archivos reales
- Normalizacion ES/EN de columnas
- UI oscura y responsive

---

## Instalacion

```bash
npm install
```

## Ejecucion en desarrollo

```bash
npm run dev
```

Abre la URL local que indique Vite.

## Compilacion

```bash
npm run build
```

Genera la carpeta `dist/` lista para servir.

---

## Deploy en GitHub Pages

Este repositorio ya incluye un workflow de GitHub Actions que publica automaticamente la app en GitHub Pages en cada push a `main`.

### Pasos para activarlo

1. Sube el codigo al repositorio (manteniendo la estructura de carpetas).
2. Ve a **Settings -> Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. Haz un push a `main` (o re-ejecuta el workflow desde la pestana Actions).
5. Espera ~1 minuto. La app estara disponible en:

   ```
   https://USERNAME.github.io/actualizador-planner/
   ```

> Si renombras el repo, actualiza `base` en `vite.config.js` para que coincida con el nuevo nombre.

---

## Uso

- Carga el Excel de Planner (actual).
- Carga el Excel maestro.
- Revisa la planificacion en Vista Excel, Planner, Grid, Calendario o Maestro.
- Filtra por nombre, responsable individual y estado de fechas.
- Valida que el proyecto detectado desde Planner coincide con el Excel maestro.
- Usa **Crea Excel Maestro Actualizado** para descargar una copia nueva del maestro con los cambios validados.
- La aplicacion nunca sobrescribe el archivo original del usuario.
- Tambien puedes usar **Probar con datos de ejemplo** para validar la interfaz sin archivos reales.

---

## Stack

- React 18
- Vite 5
- xlsx (SheetJS)
- date-fns

## Licencia

MIT (c) 2026 Alejandro Lopez Donate
