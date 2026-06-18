import React, { useMemo } from "react";
import { useAppState } from "../../context/AppState";
import { useFilteredTasks } from "../../hooks/useFilters";
import Badge from "../Badge";

export default function PlannerView() {
  const { planner, filters } = useAppState();
  const data = useFilteredTasks(planner, filters);

  const buckets = useMemo(() => {
    const m = new Map();
    for (const t of data) {
      if (!m.has(t.bucket)) m.set(t.bucket, []);
      m.get(t.bucket).push(t);
    }
    return Array.from(m.entries());
  }, [data]);

  if (!data.length) return <div className="muted">Sin tareas en Planner.</div>;

  return (
    <div className="kanban">
      {buckets.map(([bucket, tasks]) => (
        <div className="col" key={bucket}>
          <h3>{bucket} <span className="muted">({tasks.length})</span></h3>
          {tasks.map((t) => (
            <div className="card-task" key={t._key}>
              <div style={{ fontWeight: 600 }}>{t.name}</div>
              <div className="muted" style={{ margin: "4px 0" }}>{t.ownerLabel || "Sin responsable"}</div>
              <Badge task={t} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
