import React from "react";
import { useAppState } from "../context/AppState";

const VIEWS = [
  { id: "excel", label: "Vista Excel" },
  { id: "planner", label: "Vista Planner" },
  { id: "grid", label: "Vista Grid" },
  { id: "calendar", label: "Vista Calendario" },
  { id: "maestro", label: "Vista Maestro" }
];

export default function Sidebar() {
  const { view, setView } = useAppState();
  return (
    <nav className="sidebar">
      {VIEWS.map((v) => (
        <button
          key={v.id}
          className={view === v.id ? "active" : ""}
          onClick={() => setView(v.id)}
        >
          {v.label}
        </button>
      ))}
    </nav>
  );
}
