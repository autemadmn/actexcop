export function validateProjects(plannerProject, maestroProject) {
  if (!plannerProject && !maestroProject) {
    return { ok: false, level: "warning", message: "No se detecto proyecto en ninguno de los archivos." };
  }
  if (!plannerProject) {
    return { ok: false, level: "warning", message: "No se detecto proyecto en el Planner." };
  }
  if (!maestroProject) {
    return { ok: false, level: "warning", message: "No se detecto proyecto en el Maestro." };
  }
  const norm = (s) => String(s).trim().toLowerCase();
  if (norm(plannerProject) === norm(maestroProject)) {
    return { ok: true, level: "success", message: `Proyecto coincide: ${plannerProject}` };
  }
  return {
    ok: false,
    level: "error",
    message: `Proyecto no coincide. Planner: "${plannerProject}" - Maestro: "${maestroProject}"`
  };
}
