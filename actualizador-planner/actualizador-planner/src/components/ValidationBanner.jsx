import React from "react";
import { useAppState } from "../context/AppState";
import { validateProjects } from "../lib/validate";

export default function ValidationBanner() {
  const { plannerMeta, maestroMeta, planner, maestro } = useAppState();
  if (!planner.length || !maestro.length) return null;
  const r = validateProjects(plannerMeta.project, maestroMeta.project);
  return <div className={`banner ${r.level}`}>{r.message}</div>;
}
