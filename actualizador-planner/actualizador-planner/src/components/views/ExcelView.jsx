import React from "react";
import { useAppState } from "../../context/AppState";
import { useFilteredTasks } from "../../hooks/useFilters";

export default function ExcelView() {
  const { planner, filters } = useAppState();
  const data = useFilteredTasks(planner, filters);
  if (!data.length) return <div className="muted">Sin datos para mostrar.</div>;

  const cols = Object.keys(data[0]._raw);
  return (
    <div style={{ overflow: "auto" }}>
      <table className="excel-grid">
        <thead>
          <tr><th>#</th>{cols.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={t._key}>
              <td>{i + 1}</td>
              {cols.map((c) => <td key={c}>{String(t._raw[c] ?? "")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
