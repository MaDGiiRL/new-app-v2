import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  Building2,
  PhoneCall,
  Flame,
  Search,
  BarChart3,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function Reportistica({ telefonate = null, attivazioni = null }) {
  const navigate = useNavigate();

  const [open24h, setOpen24h] = useState(false);
  const [open7gg, setOpen7gg] = useState(false);
  const [openGrafico, setOpenGrafico] = useState(false);

  // Stato filtro in modale (default: ultimi 7 giorni)
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const weekAgoISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  }, []);

  const [dal, setDal] = useState(weekAgoISO);
  const [al, setAl] = useState(todayISO);
  const [rangeError, setRangeError] = useState("");

  // Rileva dark mode (nessun toggle qui; è gestito a livello di header/app)
  const isDark = useIsDark();

  // Demo data se non vengono passati via props
  const demoTelefonate = useMemo(() => generateDemoSeries("telefonate"), []);
  const demoAttivazioni = useMemo(() => generateDemoSeries("attivazioni"), []);

  // Sorgente dati effettiva (props -> fallback demo)
  const telefonateData = useMemo(
    () => telefonate ?? demoTelefonate,
    [telefonate, demoTelefonate]
  );
  const attivazioniData = useMemo(
    () => attivazioni ?? demoAttivazioni,
    [attivazioni, demoAttivazioni]
  );

  // Applico filtro in base al range scelto
  const filteredTelefonate = useMemo(
    () => filterByDateRange(telefonateData, dal, al),
    [telefonateData, dal, al]
  );
  const filteredAttivazioni = useMemo(
    () => filterByDateRange(attivazioniData, dal, al),
    [attivazioniData, dal, al]
  );

  // Validazione semplice del range
  useEffect(() => {
    if (!dal || !al) return setRangeError("");
    setRangeError(
      new Date(dal) > new Date(al)
        ? "L'intervallo non è valido: 'dal' è successivo ad 'al'."
        : ""
    );
  }, [dal, al]);

  const goTelefonateRep = () =>
    navigate("/segnalazioni/telefonate-reperibilita");
  const goEventiAib = () => navigate("/segnalazioni/eventi-aib");
  const goStoricoChiamate = () => navigate("/segnalazioni/storico-chiamate");
  const goStato = () => navigate("/segnalazioni/apertura-chiusura-sor");

  // Chart theming (aggiorna assi/griglia in base al tema corrente)
  const axisColor = isDark ? "#E5E7EB" : "#374151"; // slate-200 vs gray-700
  const gridColor = isDark ? "#334155" : "#E5E7EB"; // slate-700 vs slate-200

  return (
    <div className="p-6 space-y-8 text-slate-800  dark:text-slate-100 min-h-screen transition-colors">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="h-6 w-6" /> Reportistiche
        </h1>
        <p className="text-sm opacity-75">Report esportabili</p>
      </div>

      {/* Riga 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" /> Report ultime 24 ore
            </span>
          }
          desc="Visualizza i dati di sintesi delle ultime 24 ore (situazioni COC, segnalazioni, VVF e volontariato)"
        >
          <Button onClick={() => setOpen24h(true)}>Apri</Button>
        </Card>

        <Card
          title={
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" /> Log ultimi 7 giorni
            </span>
          }
          desc="Visualizza le registrazioni effettuate negli ultimi 7 giorni."
        >
          <Button onClick={() => setOpen7gg(true)}>Apri</Button>
        </Card>

        <Card
          tone="danger"
          title={
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Stato Sale Operative
            </span>
          }
          desc="DA VERIFICARE. Visualizza lo stato delle Sale operative di Prefetture, Province, Comuni e C.O.I."
        >
          <Button onClick={goStato}>Vai allo Stato SOR</Button>
        </Card>
      </div>

      {/* Riga 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          tone="info"
          title={
            <span className="inline-flex items-center gap-2">
              <PhoneCall className="h-4 w-4" /> Telefonate reperibilità
            </span>
          }
          desc="Visualizza le telefonate in reperibilità degli ultimi 30 giorni"
        >
          <Button onClick={goTelefonateRep}>Vai al pannello</Button>
        </Card>

        <Card
          tone="warning"
          title={
            <span className="inline-flex items-center gap-2">
              <Flame className="h-4 w-4" /> Report incendi boschivi
            </span>
          }
          desc="Accedi alla sezione Eventi AIB"
        >
          <Button onClick={goEventiAib}>Vai a Eventi AIB</Button>
        </Card>

        <Card
          tone="danger"
          title={
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4" /> Ricerca telefonate
            </span>
          }
          desc="Vai allo storico delle chiamate"
        >
          <Button onClick={goStoricoChiamate}>Vai allo storico chiamate</Button>
        </Card>
      </div>

      {/* Riga 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          tone="danger"
          title={
            <span className="inline-flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Report grafico
            </span>
          }
          desc="Genera il report grafico per intervallo date"
        >
          <Button onClick={() => setOpenGrafico(true)}>Visualizza grafici</Button>
        </Card>
      </div>

      {/* Modali */}
      <Modal
        open={open24h}
        onClose={() => setOpen24h(false)}
        title="Report 24 ore"
      >
        <p className="text-sm opacity-80">Contenuto report 24 ore…</p>
      </Modal>

      <Modal
        open={open7gg}
        onClose={() => setOpen7gg(false)}
        title="Segnalazioni degli ultimi 7 giorni"
      >
        <p className="text-sm opacity-80">Contenuto log 7 giorni…</p>
      </Modal>

      {/* MODALE REPORT GRAFICO */}
      <Modal
        open={openGrafico}
        onClose={() => setOpenGrafico(false)}
        title="Report grafico"
      >
        {/* Filtro data dentro la modale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            type="date"
            label={
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" /> dal
              </span>
            }
            value={dal}
            onChange={setDal}
            max={al || todayISO}
          />
          <Input
            type="date"
            label={
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" /> al
              </span>
            }
            value={al}
            onChange={setAl}
            min={dal || undefined}
            max={todayISO}
          />
          <div className="md:col-span-2 flex items-end">
            <Button
              onClick={() => {
                /* i grafici si aggiornano via state */
              }}
              disabled={!!rangeError}
            >
              Aggiorna
            </Button>
          </div>
        </div>
        {rangeError && (
          <p className="text-sm text-rose-600">{rangeError}</p>
        )}

        {/* Grafico Telefonate */}
        <Panel
          titleIcon="📞"
          title="Telefonate"
          subtitle="La data/ora è quella di riferimento della telefonata, non quella di registrazione."
        >
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredTelefonate}
                margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="date"
                  stroke={axisColor}
                  tick={{ fill: axisColor }}
                />
                <YAxis
                  allowDecimals={false}
                  stroke={axisColor}
                  tick={{ fill: axisColor }}
                />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#0B1220" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#E5E7EB",
                    color: isDark ? "#E5E7EB" : "#111827",
                  }}
                />
                <Legend wrapperStyle={{ color: axisColor }} />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Telefonate"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Grafico Attivazioni Comunali */}
        <Panel
          titleIcon="🏛️"
          title="Attivazioni evento comunali"
          subtitle="La data di riferimento è quella di primo inserimento dell'attivazione nel sistema informatico."
        >
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredAttivazioni}
                margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="date"
                  stroke={axisColor}
                  tick={{ fill: axisColor }}
                />
                <YAxis
                  allowDecimals={false}
                  stroke={axisColor}
                  tick={{ fill: axisColor }}
                />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#0B1220" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#E5E7EB",
                    color: isDark ? "#E5E7EB" : "#111827",
                  }}
                />
                <Legend wrapperStyle={{ color: axisColor }} />
                <Bar dataKey="count" name="Attivazioni" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </Modal>
    </div>
  );
}

/* ------------------ Theme helpers ------------------ */
function useIsDark() {
  const get = () => {
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("dark")) return true;
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };
  const [dark, setDark] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(get());
    const mo = new MutationObserver(onChange);
    mq.addEventListener?.("change", onChange);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      mq.removeEventListener?.("change", onChange);
      mo.disconnect();
    };
  }, []);
  return dark;
}

/* ------------------ UI helpers ------------------ */
function Card({ title, desc, tone = "default", children }) {
  const border = {
    default: "border-slate-200/70 dark:border-slate-800/50",
    info: "border-sky-200/70 dark:border-sky-900/50",
    warning: "border-amber-200/70 dark:border-amber-900/50",
    danger: "border-rose-200/70 dark:border-rose-900/50",
  }[tone];

  const headerBg = {
    default: "bg-slate-50/55 dark:bg-slate-900/40",
    info: "bg-sky-50/55 dark:bg-sky-900/25",
    warning: "bg-amber-50/55 dark:bg-amber-900/15",
    danger: "bg-rose-50/55 dark:bg-rose-900/15",
  }[tone];

  return (
    <div
      className={`rounded-2xl border ${border} shadow-sm overflow-hidden transition-colors bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 dark:bg-slate-900/35`}
    >
      <div className={`px-4 py-3 ${headerBg}`}>
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4 space-y-3">
        {desc && <p className="text-sm opacity-80">{desc}</p>}
        {children}
      </div>
    </div>
  );
}

function Panel({ title, titleIcon, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/50 overflow-hidden transition-colors bg-white/75 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/55 dark:bg-slate-900/35">
      <div className="px-4 py-3 bg-slate-50/55 dark:bg-slate-900/40">
        <h3 className="font-medium flex items-center gap-2">
          <span>{titleIcon}</span> {title}
        </h3>
        {subtitle && <p className="text-xs opacity-70 mt-1">{subtitle}</p>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Button({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm border border-slate-200 hover:shadow bg-white/90 hover:bg-white dark:bg-slate-900/50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

function Input({ label, type = "text", value, onChange, placeholder, min, max }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block opacity-70">{label}</span>
      <input
        type={type}
        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 px-3 py-2 placeholder:opacity-60 transition-colors"
        value={value}
        min={min}
        max={max}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </label>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[min(1000px,95vw)] max-h-[90vh] overflow-auto rounded-2xl bg-white/88 dark:bg-slate-950/80 text-slate-900 dark:text-slate-100 shadow-xl p-5 backdrop-blur supports-[backdrop-filter]:bg-white/65 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-1 text-sm bg-white hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors"
          >
            Chiudi
          </button>
        </div>
        <div className="mt-4 space-y-6">{children}</div>
      </div>
    </div>
  );
}

/* ------------------ utils ------------------ */
function filterByDateRange(data, dal, al) {
  if (!dal && !al) return data;
  const from = dal ? new Date(dal) : null;
  const to = al ? new Date(al) : null;
  return data.filter((d) => {
    const t = new Date(d.date);
    if (from && t < from) return false;
    if (to && t > to) return false;
    return true;
  });
}

function generateDemoSeries(kind) {
  // genera 30 punti giorno per giorno; count differenziato tra telefonate e attivazioni
  const today = new Date();
  const arr = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const base = kind === "telefonate" ? 30 : 6;
    const variance = kind === "telefonate" ? 15 : 4;
    const count = Math.max(
      0,
      Math.round(base + Math.sin(i / 3) * variance + (Math.random() * 6 - 3))
    );
    arr.push({ date: d.toISOString().slice(0, 10), count });
  }
  return arr;
}
