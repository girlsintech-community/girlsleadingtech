import React, { useEffect, useMemo, useState } from "react";

const API_ENDPOINT = "/api/chat";
const RESULTS_PER_PAGE = 5;

function ChatMessage({ message }) {
  return (
    <div className={`mb-4 rounded-3xl px-4 py-3 ${message.role === "user" ? "bg-white/90 text-slate-900 self-end" : "bg-violet-950/95 text-white self-start"}`}>
      <p className="text-sm leading-6 whitespace-pre-line">{message.text}</p>
      {message.results?.length ? (
        <div className="mt-4 space-y-3">
          {message.results.map((result, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-pink-200">{`${index + 1}. ${result.title || result.name || result.event || result.scholarship || "Result"}`}</span>
                {result.link ? (
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium uppercase tracking-[0.12em] text-violet-200 hover:text-white"
                  >
                    Visit
                  </a>
                ) : null}
              </div>
              {result.description ? <p className="mt-2 text-sm text-slate-100">{result.description}</p> : null}
              {result.fields?.length ? (
                <div className="mt-3 space-y-1 text-xs text-slate-300">
                  {result.fields.slice(0, 4).map((field, fieldIndex) => (
                    <div key={fieldIndex} className="flex items-start gap-2">
                      <span className="font-semibold text-violet-100">{field.key.replace(/_/g, " ")}:</span>
                      <span className="break-words">{field.value}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {result.category ? <p className="mt-2 text-xs text-slate-300">Category: {result.category}</p> : null}
            </div>
          ))}
        </div>
      ) : null}
      {message.meta ? <p className="mt-3 text-xs text-slate-300">{message.meta}</p> : null}
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! Ask me about Scholarships, Events, or Mentorship and I’ll search our Sheets for the best matches.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState("");
  const [paginationState, setPaginationState] = useState({ totalPages: 0, totalResults: 0 });

  const lastAssistantMessage = useMemo(() => {
    return [...messages].reverse().find((message) => message.role === "assistant");
  }, [messages]);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || loading) {
      return;
    }

    setLoading(true);
    const userMessage = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLastQuery(trimmed);
    setPage(1);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: trimmed, page: 1, pageSize: RESULTS_PER_PAGE }),
      });
      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        text: data.fallback || `Here are ${data.totalResults} result${data.totalResults === 1 ? "" : "s"} from our sheets.`,
        results: data.results || [],
        meta:
          data.totalResults > 0
            ? `Page ${data.page} of ${data.totalPages} · ${data.totalResults} total matches`
            : data.fallback
            ? "No spreadsheet matches found. Showing OpenAI fallback answer."
            : "No results found.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setPaginationState({ totalPages: data.totalPages || 0, totalResults: data.totalResults || 0 });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong while searching. Please try again.",
          meta: error?.message || "Unexpected fetch error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (loading || !lastQuery || newPage < 1 || newPage > paginationState.totalPages) {
      return;
    }

    setLoading(true);
    setPage(newPage);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: lastQuery, page: newPage, pageSize: RESULTS_PER_PAGE }),
      });
      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        text: data.fallback || `Showing page ${data.page} of ${data.totalPages}.`,
        results: data.results || [],
        meta: `Page ${data.page} of ${data.totalPages} · ${data.totalResults} total matches`,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setPaginationState({ totalPages: data.totalPages || 0, totalResults: data.totalResults || 0 });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong while changing pages. Please try again.",
          meta: error?.message || "Unexpected fetch error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-2xl shadow-fuchsia-500/30 transition hover:scale-105"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? "×" : "Chat"}
      </button>

      {open ? (
        <div className="mt-4 w-[96vw] max-w-md rounded-[32px] border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between rounded-3xl bg-violet-950 px-4 py-3 text-white shadow-inner">
            <div>
              <p className="text-sm font-semibold">Girls Leading Tech Chat</p>
              <p className="text-xs text-violet-200">Ask about scholarships, events or mentorship.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="max-h-[430px] space-y-4 overflow-y-auto pr-1 pb-2">
            {messages.map((message, index) => (
              <ChatMessage key={`${message.role}-${index}`} message={message} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
            <label htmlFor="chatbot-query" className="sr-only">
              Ask about scholarships, events, or mentorship
            </label>
            <input
              id="chatbot-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search scholarships, events, mentorship..."
              className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex shrink-0 items-center justify-center rounded-3xl bg-gradient-to-r from-pink-500 to-violet-500 px-5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Send"}
            </button>
          </form>

          {paginationState.totalPages > 1 ? (
            <div className="mt-4 flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200">
              <button
                type="button"
                aria-label="Previous page"
                disabled={loading || page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-xs font-semibold transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {paginationState.totalPages}
              </span>
              <button
                type="button"
                aria-label="Next page"
                disabled={loading || page >= paginationState.totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-xs font-semibold transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Chatbot;
