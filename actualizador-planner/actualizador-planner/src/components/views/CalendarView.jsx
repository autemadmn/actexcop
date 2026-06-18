import React, { useMemo, useState } from "react";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, format, isSameDay, isSameMonth
} from "date-fns";
import { useAppState } from "../../context/AppState";
import { useFilteredTasks } from "../../hooks/useFilters";

export default function CalendarView() {
  const { planner, filters } = useAppState();
  const data = useFilteredTasks(planner, filters);
  const [cursor, setCursor] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    const arr = [];
    let d = start;
    while (d <= end) { arr.push(d); d = addDays(d, 1); }
    return arr;
  }, [cursor]);

  const tasksByDay = useMemo(() => {
    const m = new Map();
    for (const t of data) {
      if (!t.dueDate) continue;
      const k = format(t.dueDate, "yyyy-MM-dd");
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(t);
    }
    return m;
  }, [data]);

  return (
    <div>
      <div className="row" style={{ marginBottom: 12, alignItems: "center" }}>
        <button className="btn secondary" onClick={() => setCursor(addMonths(cursor, -1))}>&lsaquo;</button>
        <strong>{format(cursor, "MMMM yyyy")}</strong>
        <button className="btn secondary" onClick={() => setCursor(addMonths(cursor, 1))}>&rsaquo;</button>
        <button className="btn secondary" onClick={() => setCursor(new Date())}>Hoy</button>
      </div>
      <div className="calendar">
        {["Lun","Mar","Mie","Jue","Vie","Sab","Dom"].map((d) => <div key={d} className="head">{d}</div>)}
        {days.map((d) => {
          const k = format(d, "yyyy-MM-dd");
          const tasks = tasksByDay.get(k) || [];
          return (
            <div key={k} className="day" style={{ opacity: isSameMonth(d, cursor) ? 1 : 0.4 }}>
              <div className="num">{format(d, "d")}{isSameDay(d, new Date()) && " *"}</div>
              {tasks.map((t) => <div key={t._key} className="task" title={t.name}>{t.name}</div>)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
