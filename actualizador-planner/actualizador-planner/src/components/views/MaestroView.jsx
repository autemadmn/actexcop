import React, { useMemo } from "react";
import { useAppState } from "../../context/AppState";
import { useFilteredTasks } from "../../hooks/useFilters";

export default function MaestroView() {
  const { planner, maestro, filters } = useAppState();
  const plannerFiltered = useFilteredTasks(planner, filters);
  const maestroFiltered = useFilteredTasks(maestro, filters);

  const rows = useMemo(() => {
    const keyOf = (t) => t.id || (t.name || "").toLowerCase().trim();
    const pMap = new Map(plannerFiltered.map((t) => [keyOf(t), t]));
    const mMap = new Map(maestroFiltered.map((t) => [keyOf(t), t]));
    const keys = new Set([...pMap.keys(), ...mMap.keys()]);
    return Array.from(keys).map((k) => {
      const p = pMap.get(k);
      const m = mMap.get(k);
      let estado = "Sin cambios";
      if (p && !m) estado = "Nueva (solo Planner)";
      else if (!p && m) estado = "Solo Maestro";
      else if (p && m && p.progress !== m.progress) estado = "Progreso actualizado";
      return { key: k, p, m, estado };
    });
  }, [plannerFiltered, maestroFiltered]);

  if (!planner.length || !maestro.length)
    return <div className="muted">Carga ambos Excels para ver la comparacion.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Tarea</th>
          <th>Progreso Maestro</th>
          <th>Progreso Planner</th>
          <th>Responsable</th>
          <th>Estado merge</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key}>
            <td>{r.p?.name || r.m?.name}</td>
            <td>{r.m?.progress || "-"}</td>
            <td>{r.p?.progress || "-"}</td>
            <td>{r.p?.ownerLabel || r.m?.ownerLabel || "-"}</td>
            <td>{r.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
