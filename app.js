const STORAGE_KEY = "actexcopest_rows_v1";

const tableBody = document.getElementById("tableBody");
const rowTemplate = document.getElementById("rowTemplate");

const addRowBtn = document.getElementById("addRowBtn");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");

const totalStat = document.getElementById("totalStat");
const okStat = document.getElementById("okStat");
const nokStat = document.getElementById("nokStat");
const okPctStat = document.getElementById("okPctStat");

const STATUS = { PENDING: "Pendiente", OK: "OK", NOK: "NOK" };

function isValidCode(code) {
  const value = String(code || "").trim();
  return /^.+\d{1,3}$/.test(value);
}

function splitCode(code) {
  const value = String(code || "").trim();
  const match = value.match(/^(.*?)(\d{1,3})$/);
  if (!match) return null;
  return { prefix: match[1], number: Number(match[2]), digits: match[2].length };
}

function incrementCode(code) {
  const parts = splitCode(code);
  if (!parts) return "TEST1";
  const nextNumber = parts.number + 1;
  if (nextNumber > 999) return parts.prefix + "999";
  const nextDigits = Math.max(parts.digits, String(nextNumber).length);
  return parts.prefix + String(nextNumber).padStart(nextDigits, "0");
}

function getDefaultCodeFromLastRow() {
  const rows = getRowsData();
  if (rows.length === 0) return "TEST1";
  const lastValid = [...rows].reverse().find(r => isValidCode(r.codigo));
  if (!lastValid) return "TEST1";
  return incrementCode(lastValid.codigo);
}

function createRow(data = {}) {
  const fragment = rowTemplate.content.cloneNode(true);
  const tr = fragment.querySelector("tr");

  const codeInput = fragment.querySelector(".code-input");
  const falloInput = fragment.querySelector('[data-field="fallo"]');
  const promptInput = fragment.querySelector('[data-field="prompt"]');
  const esperadaInput = fragment.querySelector('[data-field="esperada"]');
  const respuestaInput = fragment.querySelector('[data-field="respuesta"]');
  const statusBtn = fragment.querySelector(".status-btn");
  const deleteBtn = fragment.querySelector(".delete-btn");

  codeInput.value = data.codigo ?? getDefaultCodeFromLastRow();
  falloInput.value = data.fallo ?? getPreviousFallo() ?? "";
  promptInput.value = data.prompt ?? "";
  esperadaInput.value = data.esperada ?? "";
  respuestaInput.value = data.respuesta ?? "";

  setStatus(statusBtn, data.estado || STATUS.PENDING);
  updateCodeValidity(codeInput);

  codeInput.addEventListener("input", () => {
    updateCodeValidity(codeInput);
    saveRows();
  });

  [falloInput, promptInput, esperadaInput, respuestaInput].forEach(el => {
    el.addEventListener("input", saveRows);
  });

  statusBtn.addEventListener("click", () => {
    const current = statusBtn.dataset.status || STATUS.PENDING;
    if (current === STATUS.PENDING) setStatus(statusBtn, STATUS.OK);
    else if (current === STATUS.OK) setStatus(statusBtn, STATUS.NOK);
    else setStatus(statusBtn, STATUS.PENDING);
    saveRows();
  });

  deleteBtn.addEventListener("click", () => {
    tr.remove();
    saveRows();
  });

  tableBody.appendChild(fragment);
  saveRows();
}

function setStatus(button, status) {
  button.dataset.status = status;
  button.textContent = status;
  button.classList.remove("status-ok", "status-nok", "status-empty");
  if (status === STATUS.OK) button.classList.add("status-ok");
  else if (status === STATUS.NOK) button.classList.add("status-nok");
  else button.classList.add("status-empty");
}

function updateCodeValidity(input) {
  const valid = isValidCode(input.value);
  input.classList.toggle("invalid", !valid);
  input.title = valid ? "" : "El código debe terminar en un número de 1, 2 o 3 dígitos";
}

function getPreviousFallo() {
  const lastRow = tableBody.querySelector("tr:last-child");
  if (!lastRow) return "";
  const input = lastRow.querySelector('[data-field="fallo"]');
  return input ? input.value : "";
}

function getRowsData() {
  const rows = [...tableBody.querySelectorAll("tr")];
  return rows.map(tr => {
    const statusBtn = tr.querySelector(".status-btn");
    return {
      codigo: tr.querySelector(".code-input")?.value.trim() || "",
      fallo: tr.querySelector('[data-field="fallo"]')?.value.trim() || "",
      prompt: tr.querySelector('[data-field="prompt"]')?.value.trim() || "",
      esperada: tr.querySelector('[data-field="esperada"]')?.value.trim() || "",
      respuesta: tr.querySelector('[data-field="respuesta"]')?.value.trim() || "",
      estado: statusBtn?.dataset.status || STATUS.PENDING
    };
  });
}

function saveRows() {
  const data = getRowsData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateStats();
}

function loadRows() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    createRow({ codigo: "TEST1", estado: STATUS.PENDING });
    return;
  }
  try {
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows) || rows.length === 0) {
      createRow({ codigo: "TEST1", estado: STATUS.PENDING });
      return;
    }
    rows.forEach(row => createRow(row));
  } catch (error) {
    console.error("Error cargando localStorage:", error);
    createRow({ codigo: "TEST1", estado: STATUS.PENDING });
  }
}

function updateStats() {
  const rows = getRowsData();
  const total = rows.length;
  const ok = rows.filter(r => r.estado === STATUS.OK).length;
  const nok = rows.filter(r => r.estado === STATUS.NOK).length;
  const okPct = total > 0 ? Math.round((ok / total) * 100) : 0;
  totalStat.textContent = total;
  okStat.textContent = ok;
  nokStat.textContent = nok;
  okPctStat.textContent = okPct + "%";
}

function exportToExcel() {
  const rows = getRowsData();
  const invalidCodes = rows.filter(r => r.codigo && !isValidCode(r.codigo));
  if (invalidCodes.length > 0) {
    alert("Hay códigos inválidos. Todos los códigos deben terminar en un número de 1, 2 o 3 dígitos.");
    return;
  }
  const data = rows.map(row => ({
    "Código": row.codigo,
    "Nº fallo": row.fallo,
    "Pregunta / Prompt": row.prompt,
    "Respuesta esperada": row.esperada,
    "Respuesta del agente": row.respuesta,
    "Estado": row.estado
  }));
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pruebas");
  XLSX.writeFile(workbook, "checklist_pruebas_agente_IA.xlsx");
}

addRowBtn.addEventListener("click", () => {
  const rows = getRowsData();
  const lastRow = rows[rows.length - 1];
  let nextCode = "TEST1";
  if (lastRow && isValidCode(lastRow.codigo)) {
    nextCode = incrementCode(lastRow.codigo);
  } else {
    const lastValid = [...rows].reverse().find(r => isValidCode(r.codigo));
    nextCode = lastValid ? incrementCode(lastValid.codigo) : "TEST1";
  }
  createRow({ codigo: nextCode, fallo: getPreviousFallo(), estado: STATUS.PENDING });
});

exportBtn.addEventListener("click", exportToExcel);

resetBtn.addEventListener("click", () => {
  const confirmed = confirm("¿Seguro que quieres vaciar toda la tabla?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  tableBody.innerHTML = "";
  createRow({ codigo: "TEST1", estado: STATUS.PENDING });
});

loadRows();
updateStats();
