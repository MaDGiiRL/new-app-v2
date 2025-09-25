import React, { useMemo, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Search,
  RotateCw,
  Download,
  PhoneCall,
  Building2,
  MapPin,
  User,
  CalendarClock,
  Info,
  Hash,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

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

function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        className
      )}
      {...props}
    />
  );
}

function ButtonGhost({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
        {Icon && <Icon className="h-4 w-4" />} {label}
      </span>
      {children}
    </label>
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

/* ------------------------------ Mocked data ------------------------------- */
const MOCK = [
  {
    id: 1,
    ts: "2025-09-25T09:21",
    direzione: "U",
    ente: "Provincia di Treviso",
    comune: "N/D",
    operatore: "nicola zennaro",
    testo:
      "segnalante/punto di contatto: Mina Carlucci 0422656663 Chiamata per sapere se fossero avvenute delle grandinate nel territorio e se avessero provocato danni. Riferisce che dal territorio non ha ricevuto nessuna segnalazione in merito",
  },
  {
    id: 2,
    ts: "2025-09-25T05:59",
    direzione: "E",
    ente: "Dipartimento Protezione Civile",
    comune: "Comune di Valdobbiadene",
    operatore: "alberto favero",
    testo:
      "segnalante/punto di contatto: SSI 0066804 Chiedono informazioni riguardo il meteo nella notte. Riferiamo della grandinata a valdobbiadene.",
  },
  {
    id: 3,
    ts: "2025-09-24T23:35",
    direzione: "U",
    ente: "Comune di Valdobbiadene",
    comune: "Comune di Valdobbiadene",
    operatore: "asia degan",
    testo:
      "segnalante/punto di contatto: Sindaco – Fregonese Luciano 3403767289 ... volontari sono stati richiesti per lo svuotamento dei locali allagati e per la rimozione della grandine dalla sede stradale.",
  },
  {
    id: 4,
    ts: "2025-09-24T20:05",
    direzione: "E",
    ente: "N/D",
    comune: "N/D",
    operatore: "alberto favero",
    testo: "chiamata generica senza ulteriori dettagli",
  },
];

/* ------------------------------ Helpers ----------------------------------- */
const fmt = (ts) => new Date(ts).toLocaleString("it-IT", { hour12: false });

function toCSV(rows) {
  const headers = ["Data/Ora", "E/U", "Ente", "Comune", "Operatore", "Testo"];
  const body = rows.map((r) => [fmt(r.ts), r.direzione, r.ente, r.comune, r.operatore, r.testo]);
  const csv = [headers, ...body]
    .map((line) => line.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","))
    .join("\n");
  return new Blob([csv], { type: "text/csv;charset=utf-8;" });
}

/* --------------------------------- Page ----------------------------------- */
export default function StoricoChiamate() {
  const [from, setFrom] = useState("2025-09-18T00:00");
  const [to, setTo] = useState("2025-09-25T23:59");
  const [enti, setEnti] = useState("");
  const [comuni, setComuni] = useState("");

  const filtered = useMemo(() => {
    const start = from ? new Date(from).getTime() : -Infinity;
    const end = to ? new Date(to).getTime() : Infinity;
    return MOCK.filter((r) => {
      const ts = new Date(r.ts).getTime();
      if (ts < start || ts > end) return false;
      if (enti && !(`${r.ente}`.toLowerCase().includes(enti.toLowerCase()))) return false;
      if (comuni && !(`${r.comune}`.toLowerCase().includes(comuni.toLowerCase()))) return false;
      return true;
    }).sort((a, b) => new Date(b.ts) - new Date(a.ts));
  }, [from, to, enti, comuni]);

  const countsBy = (key) =>
    Object.entries(
      filtered.reduce((acc, r) => {
        const k = r[key] || "N/D";
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]);

  const byEnte = countsBy("ente");
  const byComune = countsBy("comune");

  const reset = () => {
    setFrom("2025-09-18T00:00");
    setTo("2025-09-25T23:59");
    setEnti("");
    setComuni("");
  };

  const exportCSV = () => {
    const blob = toCSV(filtered);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "storico_chiamate.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell title="Storico Chiamate">
      {/* AVVISO + barra ricerca */}
      <Card className="mb-6 p-4 sm:p-6">
        <p className="mb-3 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>AVVISO:</strong> I dati mostrati sono solo quelli completamente contenuti
            nell'intervallo selezionato.
          </span>
        </p>
        <div className="grid gap-4 md:grid-cols-5">
          <Field label="Data Inizio" icon={CalendarClock}>
            <Input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="Data Fine" icon={CalendarClock}>
            <Input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
          <Field label="Enti" icon={Building2}>
            <Input placeholder="Cerca enti… (es: comuni, volontari)" value={enti} onChange={(e) => setEnti(e.target.value)} />
          </Field>
          <Field label="Comuni" icon={MapPin}>
            <Input placeholder="Cerca comuni… (es: venezia, mestre)" value={comuni} onChange={(e) => setComuni(e.target.value)} />
          </Field>
          <div className="flex items-end gap-2">
            <Button className="w-full">
              <Search className="mr-1.5 h-4 w-4" /> Cerca Storico Chiamate
            </Button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600" onClick={reset}>
            <RotateCw className="mr-1.5 h-4 w-4" /> Reset
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" onClick={exportCSV}>
            <Download className="mr-1.5 h-4 w-4" /> Esporta CSV
          </Button>
        </div>
      </Card>

      {/* Statistiche riassuntive */}
      <Card className="mb-6 p-4 sm:p-6">
        <h3 className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
          <BarChart3 className="h-5 w-5" /> Statistiche Riassuntive
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {/* per Ente */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" /> Ente
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">Numero Chiamate</th>
                </tr>
              </thead>
              <tbody>
                {byEnte.map(([k, v]) => (
                  <tr key={k} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* per Comune */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> Comune
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">Numero Chiamate</th>
                </tr>
              </thead>
              <tbody>
                {byComune.map(([k, v]) => (
                  <tr key={k} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Storico chiamate */}
      <Card className="p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
            <PhoneCall className="h-5 w-5" />
            Storico Chiamate
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-normal dark:bg-slate-800">
              <Hash className="h-3.5 w-3.5" /> {filtered.length}
            </span>
          </h3>
          <div className="flex gap-2">
            <ButtonGhost title="Esporta CSV" aria-label="Esporta CSV" onClick={exportCSV}>
              <Download className="h-4 w-4" />
            </ButtonGhost>
            <ButtonGhost title="Reset filtri" aria-label="Reset" onClick={reset}>
              <RotateCw className="h-4 w-4" />
            </ButtonGhost>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[180px]" />
              <col className="w-[56px]" />
              <col className="w-[300px]" />
              <col className="w-[260px]" />
              <col className="w-[200px]" />
            </colgroup>
            <thead className="bg-slate-50 text-left dark:bg-slate-900/30">
              <tr>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> Data/Ora
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    {/* E/U */}
                    <PhoneCall className="h-4 w-4" /> E/U
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" /> Ente
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> Comune
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-4 w-4" /> Operatore
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <React.Fragment key={r.id}>
                  <tr className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-start gap-2">
                        <CalendarClock className="mt-1 h-4 w-4 shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200">{fmt(r.ts)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 h-6 px-2 rounded-full text-xs font-semibold",
                          r.direzione === "E"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                        )}
                        title={r.direzione === "E" ? "Entrata" : "Uscita"}
                      >
                        {r.direzione === "E" ? (
                          <ArrowDownLeft className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        )}
                        {r.direzione}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-start gap-2">
                        <Building2 className="mt-1 h-4 w-4 shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200">{r.ente}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-1 h-4 w-4 shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200">{r.comune}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top capitalize text-slate-800 dark:text-slate-200">
                      <div className="flex items-start gap-2">
                        <User className="mt-1 h-4 w-4 shrink-0" />
                        {r.operatore}
                      </div>
                    </td>
                  </tr>
                  {/* Riga contenuto (testo) */}
                  <tr className="border-t border-slate-200 dark:border-slate-800">
                    <td colSpan={5} className="px-3 py-3">
                      <div className="relative pl-4">
                        <span className="absolute left-0 top-0 h-full w-1 rounded bg-blue-500/60" aria-hidden />
                        <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">{r.testo}</p>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
