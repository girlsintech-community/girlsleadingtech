export function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;
  let i = 0;

  while (i < csvText.length) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          value += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
      } else {
        value += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(value.trim());
        value = "";
      } else if (char === '\r') {
        row.push(value.trim());
        value = "";
        rows.push(row);
        row = [];
        if (nextChar === '\n') {
          i += 1;
        }
      } else if (char === '\n') {
        row.push(value.trim());
        value = "";
        rows.push(row);
        row = [];
      } else {
        value += char;
      }
    }

    i += 1;
  }

  if (value.length || row.length) {
    row.push(value.trim());
    rows.push(row);
  }

  return rows;
}

export function csvToJson(csvText) {
  const rows = parseCsv(csvText);
  if (!rows.length) {
    return [];
  }
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((cells) => {
    const entry = {};
    headers.forEach((header, index) => {
      const key = header || `column_${index + 1}`;
      entry[key] = cells[index] !== undefined ? cells[index].trim() : "";
    });
    return entry;
  });
}

export function flattenRowValues(row) {
  return Object.values(row)
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}
