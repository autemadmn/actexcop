export function mergeForExport(planner, maestro) {
  const keyOf = (t) => (t.id ? `id:${t.id}` : `name:${(t.name || "").trim().toLowerCase()}`);
  const map = new Map();

  for (const t of maestro) map.set(keyOf(t), t);
  for (const t of planner) map.set(keyOf(t), { ...map.get(keyOf(t)), ...t });

  return Array.from(map.values()).map((t) => ({
    "Identificador de tarea": t.id ?? "",
    "Nombre de la tarea": t.name ?? "",
    "Cubo": t.bucket ?? "",
    "Progreso": t.progress ?? "",
    "Prioridad": t.priority ?? "",
    "Asignado a": t.ownerLabel ?? "",
    "Creado por": t.createdBy ?? "",
    "Fecha de creacion": fmt(t.createdAt),
    "Fecha de inicio": fmt(t.startDate),
    "Fecha de vencimiento": fmt(t.dueDate),
    "Fecha de finalizacion": fmt(t.completedAt),
    "Completado por": t.completedBy ?? "",
    "Etiquetas": t.labels ?? "",
    "Descripcion": t.notes ?? "",
    "Plan": t.project ?? ""
  }));
}

function fmt(d) {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  if (isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
}
