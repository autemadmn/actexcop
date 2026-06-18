import React from "react";
import { useAppState } from "../context/AppState";
import { downloadMaestroCopy } from "../lib/excel";
import { mergeForExport } from "../lib/merge";
import { validateProjects } from "../lib/validate";

export default function TopBar() {
  const { planner, maestro, plannerMeta, maestroMeta } = useAppState();
  const valid = validateProjects(plannerMeta.project, maestroMeta.project);
  const canExport = planner.length > 0 && maestro.length > 0 && valid.ok;

  const handleExport = () => {
    const rows = mergeForExport(planner, maestro);
    downloadMaestroCopy(rows, maestroMeta.fileName || "maestro");
  };

  return (
    <header className="topbar">
      <h1>Actualizador Planner</h1>
      <div className="row">
        <button
          className="btn"
          onClick={handleExport}
          disabled={!canExport}
          title={canExport ? "" : "Carga ambos Excels y valida el proyecto"}
        >
          Crea Excel Maestro Actualizado
        </button>
      </div>
    </header>
  );
}
