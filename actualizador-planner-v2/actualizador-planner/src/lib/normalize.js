const MAP = {
  id:          ["Identificador de tarea", "Task ID", "ID", "Id"],
  name:        ["Nombre de la tarea", "Task Name", "Tarea", "Nombre"],
  bucket:      ["Cubo", "Bucket", "Lista"],
  progress:    ["Progreso", "Progress", "Estado"],
  priority:    ["Prioridad", "Priority"],
  owner:       ["Asignado a", "Assigned To", "Responsable"],
  createdBy:   ["Creado por", "Created By"],
  createdAt:   ["Fecha de creacion", "Fecha de creación", "Created Date"],
  startDate:   ["Fecha de inicio", "Start Date", "Inicio"],
  dueDate:     ["Fecha de vencimiento", "Due Date", "Vencimiento", "Fecha fin"],
  completedAt: ["Completado", "Completed Date", "Fecha de finalizacion", "Fecha de finalización"],
  completedBy: ["Completado por", "Completed By"],
  notes:       ["Descripcion", "Descripción", "Notes", "Notas"],
  labels:      ["Etiquetas", "Labels"],
  project:     ["Plan", "Proyecto", "Project", "Nombre del plan"]
};

function pick(row, keys) {
  for (const k of keys) if (row[k] !== undefined && row[k] !== null && row[k] !== "") return row[k];
  return null;
}

function parseDate(v) {
  if (!v) return null;
  if (v instanceof Date) return v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

function splitOwners(v) {
  if (!v) return [];
  return String(v)
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function normalizeRows(rows) {
  return rows.map((row, idx) => {
    const owners = splitOwners(pick(row, MAP.owner));
    return {
      _key: pick(row, MAP.id) || `row-${idx}`,
      id: pick(row, MAP.id),
      name: pick(row, MAP.name) || "(Sin nombre)",
      bucket: pick(row, MAP.bucket) || "Sin cubo",
      progress: pick(row, MAP.progress) || "No iniciado",
      priority: pick(row, MAP.priority) || "Media",
      owners,
      ownerLabel: owners.join(", "),
      createdBy: pick(row, MAP.createdBy),
      createdAt: parseDate(pick(row, MAP.createdAt)),
      startDate: parseDate(pick(row, MAP.startDate)),
      dueDate: parseDate(pick(row, MAP.dueDate)),
      completedAt: parseDate(pick(row, MAP.completedAt)),
      completedBy: pick(row, MAP.completedBy),
      notes: pick(row, MAP.notes),
      labels: pick(row, MAP.labels),
      project: pick(row, MAP.project),
      _raw: row
    };
  });
}

export function detectProject(rows) {
  const counts = new Map();
  for (const r of rows) {
    const p = r.project;
    if (!p) continue;
    counts.set(p, (counts.get(p) || 0) + 1);
  }
  let best = null, max = 0;
  for (const [p, c] of counts) if (c > max) { max = c; best = p; }
  return best;
}
