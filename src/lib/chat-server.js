import { csvToJson, flattenRowValues } from "./excel.js";

const RESULTS_PER_PAGE = 5;
const DEFAULT_SPREADSHEET_ID = "15S2GgrqC_eHQAxS38E-arWUVszoyvpdvAfdT24Ml9mE";
const DEFAULT_SHEET_EXPORT_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/export?format=csv`;

function parseInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function buildFallbackPrompt(query) {
  return `You are a friendly assistant for Girls Leading Tech. A user asked: "${query}". If the query is about scholarships, events, or mentorship, give useful advice even though the spreadsheet search returned no direct matches. Keep the answer concise and encouraging.`;
}

function getSheetUrls() {
  const explicitUrls = process.env.SHEET_EXPORT_URLS
    ? process.env.SHEET_EXPORT_URLS.split(",").map((entry) => entry.trim()).filter(Boolean)
    : [];

  if (explicitUrls.length) {
    return explicitUrls;
  }

  const spreadsheetId = process.env.SHEET_SPREADSHEET_ID?.trim();
  const gids = process.env.SHEET_GIDS?.split(",").map((entry) => entry.trim()).filter(Boolean) ?? [];

  if (spreadsheetId && gids.length) {
    return gids.map((gid) => `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`);
  }

  if (spreadsheetId) {
    return [`https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`];
  }

  return [DEFAULT_SHEET_EXPORT_URL];
}

async function fetchCsv(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet CSV: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function recordSheetName(url) {
  try {
    const parsed = new URL(url);
    const params = parsed.searchParams;
    if (params.has("gid")) {
      return `Sheet ${params.get("gid")}`;
    }
  } catch {
    return "Primary sheet";
  }
  return "Primary sheet";
}

async function loadDataRows() {
  const urls = getSheetUrls();
  const rows = [];

  for (const url of urls) {
    const csv = await fetchCsv(url);
    const sheetRows = csvToJson(csv);
    const sheetName = recordSheetName(url);
    sheetRows.forEach((row) => {
      rows.push({ ...row, sheetName });
    });
  }

  return rows;
}

function searchRows(rows, query) {
  const normalized = query.toLowerCase().trim();
  return rows.filter((row) => {
    const text = flattenRowValues(row);
    return text.includes(normalized);
  });
}

function normalizeResults(rows) {
  return rows.map((row) => ({
    title: row.title || row.name || row.event || row.scholarship || row.sheetName || "Result",
    description: row.description || row.summary || row.details || row.notes || "",
    category: row.category || row.type || row.sheetName,
    link: row.link || row.url || row.website || row.website_link || "",
    raw: row,
  }));
}

async function fetchOpenAIAnswer(query) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not defined.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for Girls Leading Tech." },
        { role: "user", content: buildFallbackPrompt(query) },
      ],
      max_tokens: 250,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${body}`);
  }

  const payload = await response.json();
  return payload?.choices?.[0]?.message?.content?.trim() || "I couldn't find a match right now.";
}

export async function handleChatRequest({ query, page = 1, pageSize = RESULTS_PER_PAGE }) {
  const cleanedQuery = (query || "").toString().trim();
  if (!cleanedQuery) {
    return {
      error: "Query is required.",
    };
  }

  const parsedPage = parseInteger(page, 1);
  const parsedPageSize = parseInteger(pageSize, RESULTS_PER_PAGE);

  const rows = await loadDataRows();
  const matches = searchRows(rows, cleanedQuery);

  if (!matches.length) {
    const fallback = await fetchOpenAIAnswer(cleanedQuery);
    return {
      query: cleanedQuery,
      results: [],
      totalResults: 0,
      page: 1,
      pageSize: parsedPageSize,
      totalPages: 0,
      fallback,
    };
  }

  const totalResults = matches.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / parsedPageSize));
  const safePage = Math.min(parsedPage, totalPages);
  const startIndex = (safePage - 1) * parsedPageSize;
  const pageResults = normalizeResults(matches.slice(startIndex, startIndex + parsedPageSize));

  return {
    query: cleanedQuery,
    results: pageResults,
    totalResults,
    page: safePage,
    pageSize: parsedPageSize,
    totalPages,
  };
}

export async function parseRequestBody(req) {
  if (req.body) {
    return req.body;
  }

  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}
