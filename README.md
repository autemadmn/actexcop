# Checklist Pruebas · Agente IA Troubleshooting

Aplicación web estática (HTML + CSS + JS vanilla) para registrar pruebas realizadas a un agente de IA de troubleshooting y exportarlas a Excel.

## Cambios en esta versión

- El **código** ya no está fijo a `ALE_OMx`: ahora es totalmente **editable**.
- El código debe **terminar en un número de 1, 2 o 3 dígitos** (`TEST1`, `QA_099`, `NB-7`...).
- Al añadir una nueva iteración, el **número se incrementa automáticamente en +1** conservando el prefijo y el zero-padding de la fila anterior.
- Se ha **eliminado** la columna de *Comentarios adicionales*.

## Estructura

```
.
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Uso local

Abre `index.html` con doble clic. No requiere instalación.

## Despliegue en GitHub Pages

1. Sube los archivos a la rama `main`.
2. Ve a **Settings → Pages**.
3. En **Source**, elige *Deploy from a branch*.
4. Selecciona rama `main` y carpeta `/ (root)`.
5. Guarda. Tu app estará en `https://<tu-usuario>.github.io/<nombre-repo>/`.

## Dependencias

- [SheetJS (xlsx)](https://sheetjs.com) por CDN para exportar a `.xlsx`.

## Reglas del código

- Formato: cualquier prefijo + número de 1 a 3 dígitos al final.
- Ejemplos válidos: `TEST1`, `QA_099`, `NB-7`, `ALE_OM042`.
- Ejemplos inválidos: `TEST`, `QA1234`, `ABC_`.
