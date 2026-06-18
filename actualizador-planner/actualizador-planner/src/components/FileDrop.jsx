import React, { useRef, useState } from "react";
import { readExcelFile } from "../lib/excel";
import { normalizeRows, detectProject } from "../lib/normalize";

export default function FileDrop({ label, onLoaded, fileName }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    setError(null);
    try {
      const { rows, fileName } = await readExcelFile(file);
      const normalized = normalizeRows(rows);
      const project = detectProject(normalized);
      onLoaded({ rows: normalized, fileName, project });
    } catch (e) {
      setError("No se pudo leer el Excel. Comprueba el formato.");
    }
  };

  return (
    <div
      className={`filedrop ${drag ? "drag" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
      }}
    >
      <div>{label}</div>
      <div className="muted">Arrastra o haz clic para seleccionar</div>
      {fileName && <div className="name">{fileName}</div>}
      {error && <div style={{ color: "var(--err)", marginTop: 6 }}>{error}</div>}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
