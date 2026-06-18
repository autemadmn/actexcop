import { differenceInCalendarDays } from "date-fns";

export function getDateStatus(task, today = new Date()) {
  if (task.progress === "Completado" || task.completedAt) return "completed";
  if (!task.dueDate) return "no_date";
  const diff = differenceInCalendarDays(task.dueDate, today);
  if (diff < 0) return "overdue";
  if (diff <= 3) return "due_soon";
  return "on_time";
}

export const DATE_STATUS_LABEL = {
  on_time: "A tiempo",
  due_soon: "Proximo a vencer",
  overdue: "Retrasado",
  completed: "Completado",
  no_date: "Sin fecha"
};

export const DATE_STATUS_COLOR = {
  on_time: "#16a34a",
  due_soon: "#f59e0b",
  overdue: "#dc2626",
  completed: "#0ea5e9",
  no_date: "#64748b"
};
