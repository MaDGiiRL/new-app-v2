import React, { useMemo, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Search,
  Download,
  MapPin,
  FileText,
  BellRing,
  CalendarClock,
  Users,
  Zap,
  Radio,
} from "lucide-react";
import * as XLSX from "xlsx";

/* ------------------------------ UI primitives ------------------------------ */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
        className
      )}
      {...p}
    />
  );
}

function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        "disabled:opacity-60 disabled:pointer-events-none",
        "h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        className
      )}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-xl border px-3 text-sm",
        "border-slate-300 bg-white/90 placeholder:text-slate-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
        props.className
      )}
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 rounded-xl border px-3 text-sm",
        "border-slate-300 bg-white/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",
        props.className
      )}
    />
  );
}

/* -------------------------------- Mock data ------------------------------- */
const ROWS = [
  {
    comune: "Comune di Valdobbiadene",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "23/09/2025 ore 19:12",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "gran parte del territorio (50-80%)",
    telecom: "N.D.",
  },
  {
    comune: "Comune di Valdobbiadene",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "23/09/2025 ore 21:42",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "N.D.",
    telecom: "N.D.",
  },
  {
    comune: "Comune di Valdobbiadene",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "24/09/2025 ore 02:09",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "N.D.",
    telecom: "N.D.",
  },
  {
    comune: "Comune di Valdobbiadene",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "24/09/2025 ore 01:27",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "N.D.",
    telecom: "N.D.",
  },
  {
    comune: "Comune di Valdobbiadene",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "23/09/2025 ore 19:12",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "gran parte del territorio (50-80%)",
    telecom: "N.D.",
  },
  {
    comune: "Comune di Bussolengo",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "23/09/2025 ore 21:42",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "N.D.",
    telecom: "N.D.",
  },
  {
    comune: "Comune di Negrar",
    descrizione: "Allagamento",
    necessita: "",
    aggiornamento: "23/09/2025 ore 21:42",
    evacuati: "N.D.",
    isolati: "N.D.",
    energia: "N.D.",
    telecom: "N.D.",
  },
];

/* --------------------------------- Helpers -------------------------------- */
function exportXLS(rows) {
  // AOA (Array of Arrays) -> Sheet
  const header = [
    "Comune",
    "Descrizione",
    "Necessità",
    "Aggiornamento",
    "Evacuati",
    "Isolati",
    "Energia",
    "Telecom",
  ];
  const body = rows.map((r) => [
    r.comune || "",
    r.descrizione || "",
    r.necessita || "",
    r.aggiornamento || "",
    r.evacuati || "",
    r.isolati || "",
    r.energia || "",
    r.telecom || "",
  ]);
  const ws = XLSX.utils.aoa_to_sheet([header, ...body]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Eventi_in_atto");
  XLSX.writeFile(wb, "eventi_in_atto.xlsx");
}

/* --------------------------------- Page ----------------------------------- */
export default function EventiInAtto() {
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? ROWS.filter((r) =>
          [
            r.comune,
            r.descrizione,
            r.necessita,
            r.aggiornamento,
            r.evacuati,
            r.isolati,
            r.energia,
            r.telecom,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)
        )
      : ROWS;
    return base;
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageRows = filtered.slice(startIdx, endIdx);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <PageShell title="Eventi in atto">
      <Card className="mb-4 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Show</span>
            <Select
              value={String(pageSize)}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Select>
            <span className="text-sm text-slate-600 dark:text-slate-300">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="pl-9"
                placeholder="Search…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <Button onClick={() => exportXLS(filtered)}>
              <Download className="mr-1.5 h-4 w-4" />
              Scarica XLS
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left dark:bg-slate-800/40">
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> Comune
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4" /> Descrizione
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <BellRing className="h-4 w-4" /> Necessità
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> Aggiornamento
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> Evacuati
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> Isolati
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="h-4 w-4" /> Energia
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="h-4 w-4" /> Telecom
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-200 dark:border-slate-800"
                >
                  <td className="px-3 py-2">{r.comune || "—"}</td>
                  <td className="px-3 py-2">{r.descrizione || "—"}</td>
                  <td className="px-3 py-2">{r.necessita || "—"}</td>
                  <td className="px-3 py-2">{r.aggiornamento || "—"}</td>
                  <td className="px-3 py-2">{r.evacuati || "—"}</td>
                  <td className="px-3 py-2">{r.isolati || "—"}</td>
                  <td className="px-3 py-2">{r.energia || "—"}</td>
                  <td className="px-3 py-2">{r.telecom || "—"}</td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    Nessun evento trovato.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer paging */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Showing <strong>{total === 0 ? 0 : startIdx + 1}</strong> to{" "}
            <strong>{Math.min(endIdx, total)}</strong> of <strong>{total}</strong>{" "}
            entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              className="bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              onClick={prev}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm tabular-nums text-slate-700 dark:text-slate-200">
              {currentPage}/{totalPages}
            </span>
            <Button
              className="bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              onClick={next}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
