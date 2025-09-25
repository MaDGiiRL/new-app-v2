import { useMemo, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Info,
  Building2,
  Type,
  Layers3,
  Search,
  RotateCw,
} from "lucide-react";

const TIPI_ENTE = [
  "Centro Operativo Intercomunale",
  "COM",
  "Comunità Montana",
  "Consorzi di bonifica",
  "Distretto",
  "Esterni",
  "Prefettura",
  "Provincia",
  "Rappresentanti volontariato",
  "Regione (e uffici)",
  "Reti tecnologiche",
  "Servizio Intercomunale",
  "Unione dei Comuni",
  "Viabilità e trasporti",
  "Vigili del Fuoco",
];

/* ----------------------------- UI primitives ----------------------------- */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Section({ title, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <header className="flex items-center gap-2 rounded-t-2xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
        {Icon && <Icon className="h-4 w-4" />} {title}
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function Field({ label, icon: Icon, children, hint }) {
  return (
    <label className="grid gap-1.5">
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
        {Icon && <Icon className="h-4 w-4" />} {label}
      </span>
      {children}
      {hint && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span>
      )}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400",
        "focus:ring-2 focus:ring-blue-500",
        "border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
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
        "h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition",
        "focus:ring-2 focus:ring-blue-500",
        "border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
        props.className
      )}
    />
  );
}

/* --------------------------------- Page --------------------------------- */
export default function Ricerca() {
  const [denominazione, setDenominazione] = useState("");
  const [tipo, setTipo] = useState("");

  const canSearch = useMemo(() => {
    const hasDen = denominazione.trim().length > 0;
    const hasTipo = !!tipo;
    return (hasDen && !hasTipo) || (!hasDen && hasTipo);
  }, [denominazione, tipo]);

  const handleRicerca = () => {
    if (!canSearch) return;
    const criterio = denominazione
      ? { criterio: "denominazione", valore: denominazione.trim() }
      : { criterio: "tipologia", valore: tipo };
    alert(`Ricerca per ${criterio.criterio}: ${criterio.valore}`);
  };

  const reset = () => {
    setDenominazione("");
    setTipo("");
  };

  const disableDen = !!tipo;
  const disableTipo = denominazione.trim().length > 0;

  return (
    <PageShell title="Ricerca enti">
      {/* Avviso */}
      <div className="mb-4 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-900/70 dark:bg-blue-950 dark:text-blue-100">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Selezionare un <strong>unico</strong> criterio di ricerca.
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Denominazione */}
        <Section title="Denominazione" icon={Type}>
          <div className="space-y-2">
            <Field label="Denominazione ente" icon={Building2}>
              <Input
                type="text"
                value={denominazione}
                onChange={(e) => setDenominazione(e.target.value)}
                placeholder="Inserire parte della denominazione"
                disabled={disableDen}
                className={cn(disableDen && "cursor-not-allowed opacity-60")}
              />
            </Field>
            {disableDen && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Disabilitato perché è stata selezionata una tipologia di ente.
              </p>
            )}
          </div>
        </Section>

        {/* Tipologia ente */}
        <Section title="Selezionare tipologia di ente" icon={Layers3}>
          <div className="space-y-2">
            <Field label="Tipo ente" icon={Layers3}>
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                disabled={disableTipo}
                className={cn(disableTipo && "cursor-not-allowed opacity-60")}
              >
                <option value="">scegli tipologia di ente</option>
                {TIPI_ENTE.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </Field>
            {disableTipo && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Disabilitato perché è stata inserita una denominazione.
              </p>
            )}
          </div>
        </Section>
      </div>

      {/* Azioni */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={handleRicerca}
          disabled={!canSearch}
          className="inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Search className="mr-1.5 h-4 w-4" />
          Ricerca
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <RotateCw className="mr-1.5 h-4 w-4" />
          Reimposta
        </button>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Attiva il bottone “Ricerca” compilando solo uno dei due campi.
        </span>
      </div>
    </PageShell>
  );
}
