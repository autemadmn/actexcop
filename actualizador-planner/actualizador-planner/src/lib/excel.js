import * as XLSX from "xlsx";

export function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: "array", cellDates: true });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: null, raw: false });
        resolve({ rows: json, sheetName, fileName: file.name });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Genera una COPIA NUEVA del maestro (nunca sobrescribe el original).
 * Anade timestamp al nombre para garantizar nuevo archivo.
 */
export function downloadMaestroCopy(rows, baseName = "maestro") {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Maestro");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const cleanBase = baseName.replace(/\.xlsx?$/i, "");
  XLSX.writeFile(wb, `${cleanBase}_actualizado_${stamp}.xlsx`);
}
