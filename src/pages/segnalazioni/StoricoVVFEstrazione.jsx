import React, { useMemo, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Search,
  RotateCw,
  Download,
  CalendarClock,
  Tag,
  User,
  Megaphone,
  Info,
  Hash,
  MapPin,
  BarChart3,
} from "lucide-react";

/* ---------- UI primitives (coerenti con le altre pagine) ---------- */
function cn(...c) { return c.filter(Boolean).join(" "); }

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
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " +
    "disabled:opacity-60 disabled:pointer-events-none h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 " +
    "dark:bg-blue-500 dark:hover:bg-blue-600";
  return <button className={cn(base, className)} {...props} />;
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

/* ------------------------------- Mock data ------------------------------- */
const MOCK = [
  {
    id: 1,
    ts: "2025-09-24T21:15",
    categoria: "ALLERTA TEMPORALI",
    sender: "Sala Operativa VVF Treviso",
    evento: "Temporali e grandine",
    codeL2: "TT-03",
    headline: "Forte cella temporalesca su Valdobbiadene",
    area: "TV",
  },
  {
    id: 2,
    ts: "2025-09-25T07:32",
    categoria: "ALLERTA VENTO FORTE",
    sender: "Sala Operativa VVF Venezia",
    evento: "Vento forte",
    codeL2: "VF-02",
    headline: "Raffiche 70 km/h area litorale",
    area: "VE",
  },
  {
    id: 3,
    ts: "2025-09-25T08:05",
    categoria: "ALLERTA TEMPORALI",
    sender: "Sala Operativa VVF Rovigo",
    evento: "Temporali e grandine",
    codeL2: "TT-02",
    headline: "Cellule in transito su Alto Polesine",
    area: "RO",
  },
];

/* -------------------------------- Helpers -------------------------------- */
const fmt = (ts) => new Date(ts).toLocaleString("it-IT", { hour12: false });

function toCSV(rows) {
  const headers = ["Data/Ora","Categoria","Sender","Evento","Code L2","Headline","Area"];
  const body = rows.map((r) => [fmt(r.ts), r.categoria, r.sender, r.evento, r.codeL2, r.headline, r.area]);
  const csv = [headers, ...body]
    .map((line) => line.map((v) => `"${String(v).replaceAll('"','""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "storico_alert_vvf.csv"; a.click();
  URL.revokeObjectURL(url);
}

/* --------------------------------- Page ---------------------------------- */
export default function StoricoVVFEstrazione() {
  const [from, setFrom] = useState("2025-09-18T00:00");
  const [to, setTo] = useState("2025-09-25T23:59");
  const [categoria, setCategoria] = useState("");
  const [sender, setSender] = useState("");
  const [evento, setEvento] = useState("");

  const filtered = useMemo(() => {
    const start = from ? new Date(from).getTime() : -Infinity;
    const end = to ? new Date(to).getTime() : Infinity;
    return MOCK.filter((r) => {
      const t = new Date(r.ts).getTime();
      if (t < start || t > end) return false;
      if (categoria && !r.categoria.toLowerCase().includes(categoria.toLowerCase())) return false;
      if (sender && !r.sender.toLowerCase().includes(sender.toLowerCase())) return false;
      if (evento && !r.evento.toLowerCase().includes(evento.toLowerCase())) return false;
      return true;
    }).sort((a, b) => new Date(b.ts) - new Date(a.ts));
  }, [from, to, categoria, sender, evento]);

  const countBy = (key) =>
    Object.entries(
      filtered.reduce((acc, r) => ((acc[r[key]] = (acc[r[key]] || 0) + 1), acc), {})
    ).sort((a, b) => b[1] - a[1]);

  const byCategoria = countBy("categoria");
  const bySender = countBy("sender");
  const byEvento = countBy("evento");

  const reset = () => {
    setFrom("2025-09-18T00:00");
    setTo("2025-09-25T23:59");
    setCategoria("");
    setSender("");
    setEvento("");
  };

  return (
    <PageShell title="Storico Alert VVF">
      {/* Barra ricerca */}
      <Card className="mb-6 p-4 sm:p-6">
        <p className="mb-3 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>AVVISO:</strong> I dati mostrati sono solo quelli completamente contenuti
            nell’intervallo selezionato.
          </span>
        </p>

        <div className="grid gap-4 md:grid-cols-5">
          <Field label="Data Inizio" icon={CalendarClock}>
            <Input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="Data Fine" icon={CalendarClock}>
            <Input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
          <Field label="Categorie" icon={Tag}>
            <Input placeholder="Cerca categorie..." value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </Field>
          <Field label="Sender" icon={User}>
            <Input placeholder="Cerca sender..." value={sender} onChange={(e) => setSender(e.target.value)} />
          </Field>
          <Field label="Eventi" icon={Megaphone}>
            <Input placeholder="Cerca eventi..." value={evento} onChange={(e) => setEvento(e.target.value)} />
          </Field>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button>
            <Search className="mr-1.5 h-4 w-4" />
            Cerca Storico Alert
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600"
            onClick={reset}
          >
            <RotateCw className="mr-1.5 h-4 w-4" />
            Reset
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            onClick={() => toCSV(filtered)}
          >
            <Download className="mr-1.5 h-4 w-4" />
            Esporta CSV
          </Button>
        </div>
      </Card>

      {/* Statistiche riassuntive */}
      <Card className="mb-6 p-4 sm:p-6">
        <h3 className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
          <BarChart3 className="h-5 w-5" /> Statistiche Riassuntive Alert VVF
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Categoria */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="h-4 w-4" /> Categoria
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">Numero Alert</th>
                </tr>
              </thead>
              <tbody>
                {byCategoria.map(([k, v]) => (
                  <tr key={k} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
                {!byCategoria.length && (
                  <tr><td colSpan={2} className="px-3 py-3 text-slate-500 dark:text-slate-400">Nessun dato</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Sender */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-4 w-4" /> Sender
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">Numero Alert</th>
                </tr>
              </thead>
              <tbody>
                {bySender.map(([k, v]) => (
                  <tr key={k} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
                {!bySender.length && (
                  <tr><td colSpan={2} className="px-3 py-3 text-slate-500 dark:text-slate-400">Nessun dato</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Evento */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <Megaphone className="h-4 w-4" /> Evento
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">Numero Alert</th>
                </tr>
              </thead>
              <tbody>
                {byEvento.map(([k, v]) => (
                  <tr key={k} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
                {!byEvento.length && (
                  <tr><td colSpan={2} className="px-3 py-3 text-slate-500 dark:text-slate-400">Nessun dato</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Storico alert */}
      <Card className="p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
            <Megaphone className="h-5 w-5" />
            Storico Alert VVF
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-normal dark:bg-slate-800">
              <Hash className="h-3.5 w-3.5" /> {filtered.length}
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[180px]" />
              <col className="w-[260px]" />
              <col className="w-[220px]" />
              <col className="w-[220px]" />
              <col className="w-[140px]" />
              <col />
              <col className="w-[100px]" />
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
                    <User className="h-4 w-4" /> Sender
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="h-4 w-4" /> Categoria
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Megaphone className="h-4 w-4" /> Evento
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Hash className="h-4 w-4" /> Code L2
                  </span>
                </th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">Headline</th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> Area
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length ? (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-3 py-2 align-top">
                      <div className="flex items-start gap-2">
                        <CalendarClock className="mt-1 h-4 w-4 shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200">{fmt(r.ts)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">{r.sender}</td>
                    <td className="px-3 py-2 align-top">{r.categoria}</td>
                    <td className="px-3 py-2 align-top">{r.evento}</td>
                    <td className="px-3 py-2 align-top">{r.codeL2}</td>
                    <td className="px-3 py-2 align-top">{r.headline}</td>
                    <td className="px-3 py-2 align-top">{r.area}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Info className="h-4 w-4" /> Nessun risultato trovato
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
