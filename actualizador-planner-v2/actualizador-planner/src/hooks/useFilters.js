import { useMemo } from "react";
import { getDateStatus } from "../lib/dateStatus";

export function useFilteredTasks(tasks, filters) {
  return useMemo(() => {
    const name = filters.name.trim().toLowerCase();
    const owner = filters.owner.trim().toLowerCase();
    const dateStatus = filters.dateStatus;

    return tasks.filter((t) => {
      if (name && !(t.name || "").toLowerCase().includes(name)) return false;
      if (owner) {
        const hit = (t.owners || []).some((o) => o.toLowerCase().includes(owner));
        if (!hit) return false;
      }
      if (dateStatus && getDateStatus(t) !== dateStatus) return false;
      return true;
    });
  }, [tasks, filters]);
}
