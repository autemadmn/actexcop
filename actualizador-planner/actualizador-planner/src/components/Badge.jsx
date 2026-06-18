import React from "react";
import { DATE_STATUS_COLOR, DATE_STATUS_LABEL, getDateStatus } from "../lib/dateStatus";

export default function Badge({ task }) {
  const status = getDateStatus(task);
  return (
    <span className="badge" style={{ background: DATE_STATUS_COLOR[status] }}>
      {DATE_STATUS_LABEL[status]}
    </span>
  );
}
