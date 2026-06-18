## Actualizador Planner

Aplicación web local para trabajar con un Excel exportado de Planner y un Excel maestro. Permite revisar datos, filtrar tareas, validar el proyecto y crear una copia actualizada del Excel maestro sin backend ni subida de archivos.

### Instalación
npm install

### Ejecución en desarrollo
npm run dev  
Abre la URL local que indique Vite.

### Compilación
npm run build

### Uso
- Carga el Excel de Planner (actual).
- Carga el Excel maestro.
- Revisa la planificación en Vista Excel, Planner, Grid, Calendario o Maestro.
- Filtra por nombre, responsable individual y estado de fechas.
- Valida que el proyecto detectado desde Planner coincide con el Excel maestro.
- Usa Crea Excel Maestro Actualizado para descargar una copia nueva del maestro con los cambios validados.  
La aplicación nunca sobrescribe el archivo original del usuario. También puedes usar Probar con datos de ejemplo para validar la interfaz sin archivos reales.
