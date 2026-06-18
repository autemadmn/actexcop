import React from "react";
import { useAppState } from "../../context/AppState";
import { useFilteredTasks } from "../../hooks/useFilters";
import Badge from "../Badge";

const fmt = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "-");

export default function GridView() {
  const { planner, filters } = useAppState();
  const data = useFilteredTasks(planner, filters);
  if (!data.length) return <div className="muted">Sin datos.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Tarea</th><th>Cubo</th><th>Responsable</th>
          <th>Inicio</th><th>Vencimiento</th><th>Progreso</th><th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t._key}>
            <td>{t.name}</td>
            <td>{t.bucket}</td>
            <td>{t.ownerLabel || "-"}</td>
            <td>{fmt(t.startDate)}</td>
            <td>{fmt(t.dueDate)}</td>
            <td>{t.progress}</td>
            <td><Badge task={t} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
