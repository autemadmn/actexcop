import React from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import FileDrop from "./components/FileDrop";
import FiltersPanel from "./components/FiltersPanel";
import ValidationBanner from "./components/ValidationBanner";
import EmptyState from "./components/EmptyState";

import ExcelView from "./components/views/ExcelView";
import PlannerView from "./components/views/PlannerView";
import GridView from "./components/views/GridView";
import CalendarView from "./components/views/CalendarView";
import MaestroView from "./components/views/MaestroView";

import { useAppState } from "./context/AppState";
import { normalizeRows, detectProject } from "./lib/normalize";
import { mockPlanner, mockMaestro } from "./data/mockData";

export default function App() {
  const {
    planner, maestro,
    setPlanner, setMaestro,
    plannerMeta, maestroMeta,
    setPlannerMeta, setMaestroMeta,
    view
  } = useAppState();

  const loadMock = () => {
    const p = normalizeRows(mockPlanner);
    const m = normalizeRows(mockMaestro);
    setPlanner(p);
    setMaestro(m);
    setPlannerMeta({ project: detectProject(p), fileName: "mock_planner.xlsx" });
    setMaestroMeta({ project: detectProject(m), fileName: "mock_maestro.xlsx" });
  };

  const renderView = () => {
    if (!planner.length && !maestro.length) {
      return (
        <EmptyState>
          <h2>Empieza cargando tus archivos</h2>
          <p>Carga el Excel de Planner y el Maestro, o prueba con datos de ejemplo.</p>
          <button className="btn" onClick={loadMock}>Probar con datos de ejemplo</button>
        </EmptyState>
      );
    }
    switch (view) {
      case "excel": return <ExcelView />;
      case "planner": return <PlannerView />;
      case "grid": return <GridView />;
      case "calendar": return <CalendarView />;
      case "maestro": return <MaestroView />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <TopBar />
      <Sidebar />
      <main className="main">
        <div className="row" style={{ marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <FileDrop
              label="Excel Planner"
              fileName={plannerMeta.fileName}
              onLoaded={({ rows, fileName, project }) => {
                setPlanner(rows);
                setPlannerMeta({ fileName, project });
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <FileDrop
              label="Excel Maestro"
              fileName={maestroMeta.fileName}
              onLoaded={({ rows, fileName, project }) => {
                setMaestro(rows);
                setMaestroMeta({ fileName, project });
              }}
            />
          </div>
        </div>

        <ValidationBanner />
        <FiltersPanel />
        <div className="card">{renderView()}</div>
      </main>
    </div>
  );
}
