import React from "react";
import { useAppState } from "../context/AppState";
import { DATE_STATUS_LABEL } from "../lib/dateStatus";

export default function FiltersPanel() {
  const { filters, setFilters } = useAppState();
  return (
    <div className="row" style={{ marginBottom: 16 }}>
      <input
        className="input"
        placeholder="Filtrar por nombre..."
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        className="input"
        placeholder="Responsable individual..."
        value={filters.owner}
        onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
      />
      <select
        className="select"
        value={filters.dateStatus}
        onChange={(e) => setFilters({ ...filters, dateStatus: e.target.value })}
      >
        <option value="">Estado de fechas (todos)</option>
        {Object.entries(DATE_STATUS_LABEL).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
      <button
        className="btn secondary"
        onClick={() => setFilters({ name: "", owner: "", dateStatus: "" })}
      >
        Limpiar
      </button>
    </div>
  );
}
