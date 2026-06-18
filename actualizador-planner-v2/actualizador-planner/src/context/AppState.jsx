import React, { createContext, useContext, useMemo, useState } from "react";

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [planner, setPlanner] = useState([]);
  const [maestro, setMaestro] = useState([]);
  const [plannerMeta, setPlannerMeta] = useState({ project: null, fileName: null });
  const [maestroMeta, setMaestroMeta] = useState({ project: null, fileName: null });
  const [view, setView] = useState("excel");
  const [filters, setFilters] = useState({
    name: "",
    owner: "",
    dateStatus: ""
  });

  const value = useMemo(
    () => ({
      planner, setPlanner,
      maestro, setMaestro,
      plannerMeta, setPlannerMeta,
      maestroMeta, setMaestroMeta,
      view, setView,
      filters, setFilters
    }),
    [planner, maestro, plannerMeta, maestroMeta, view, filters]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState fuera de AppStateProvider");
  return ctx;
}
