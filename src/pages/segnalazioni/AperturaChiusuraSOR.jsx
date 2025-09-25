import { useMemo, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Info,
  Power,
  CalendarDays,
  FileText,
  AlertTriangle,
  Cog,
  ListChecks,
} from "lucide-react";

const RISKS = [
  "Sismico",
  "Meteo",
  "Idrogeologico",
  "Idraulico",
  "Incendi boschivi",
  "Sanitario",
  "Ambientale",
  "Industriale",
  "Altro",
];

const CONFIGS = [
  { code: "S0", label: "Ordinaria" },
  { code: "S1", label: "Vigilanza" },
  { code: "S2", label: "Presidio operativo" },
  { code: "S3", label: "Emergenza" },
];

const FUNZIONI = [
  { code: "FVS", label: "Valutazione situazione" },
  { code: "F1", label: "Tecnica e di pianificazione" },
  { code: "F2", label: "Sanità, assistenza sociale e veterinaria" },
  { code: "F3", label: "Mass-media e informazione" },
  { code: "F4", label: "Volontariato" },
  { code: "F5", label: "Materiali e mezzi" },
  { code: "F6", label: "Trasporti, circolazione e viabilità" },
  { code: "F7", label: "Telecomunicazioni" },
  { code: "F8", label: "Servizi essenziali" },
  { code: "F9", label: "Censimento danni" },
  { code: "F10", label: "Strutture operative" },
  { code: "F11", label: "Enti locali" },
  { code: "F12", label: "Materiali pericolosi" },
  { code: "F13", label: "Assistenza alla popolazione" },
  { code: "F14", label: "Coordinamento centri operativi" },
  { code: "FS", label: "Segreteria" },
];

function Section({ title, icon: Icon, children, accent = "" }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <header
        className={`flex items-center gap-2 rounded-t-2xl px-4 py-3 text-sm font-medium ${accent || "bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          }`}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <h2 className="text-base font-semibold">{title}</h2>
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

export default function AperturaChiusuraSOR() {
  const [stato, setStato] = useState("chiusa");
  const [decorrenza, setDecorrenza] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [descrizione, setDescrizione] = useState("");
  const [rischi, setRischi] = useState([]);
  const [config, setConfig] = useState("S0");
  const [funzioni, setFunzioni] = useState([]);

  const notaSintetica = useMemo(() => {
    const items = [
      `Stato SOR: ${stato.toUpperCase()}`,
      `Decorrenza: ${decorrenza}`,
      `Configurazione: ${config} - ${CONFIGS.find((c) => c.code === config)?.label}`,
      `Rischi in atto: ${rischi.length ? rischi.join(", ") : "nessuno"}`,
      `Funzioni attivate: ${funzioni.length ? funzioni.join(", ") : "nessuna"}`,
    ];
    return items.join(" \n");
  }, [stato, decorrenza, rischi, funzioni, config]);

  const toggleInArray = (arr, setArr, value) => {
    setArr((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <PageShell title="Apertura/chiusura SOR">
      {/* Banner stato attuale */}
      <div
        className={`mb-6 rounded-2xl border p-4 sm:p-5 ${stato === "chiusa"
            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950"
            : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
          }`}
      >
        <p className="flex items-center gap-2 text-lg font-semibold">
          <Info className="h-5 w-5" />
          Attuale situazione della Sala Operativa Regionale: {stato}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3 grid gap-6 lg:grid-cols-3">
          {/* Stato & descrizione */}
          <Section
            title="Aggiornamento stato"
            icon={Power}
            accent="bg-blue-50 text-zinc-800 dark:bg-blue-900/20 dark:text-zinc-100"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  <Power className="h-4 w-4" />
                  Aggiorna lo stato a
                </span>
                <select
                  value={stato}
                  onChange={(e) => setStato(e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                >
                  <option value="aperta">aperta</option>
                  <option value="chiusa">chiusa</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  <CalendarDays className="h-4 w-4" />
                  Con decorrenza
                </span>
                <input
                  type="date"
                  value={decorrenza}
                  onChange={(e) => setDecorrenza(e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                <FileText className="h-4 w-4" />
                Descrizione
              </span>
              <textarea
                rows={4}
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                placeholder="Eventuale sintetica descrizione. Attenzione: viene inclusa nella nota stampata!"
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-sm outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </label>
          </Section>

          {/* Rischio in atto */}
          <Section title="Rischio in atto" icon={AlertTriangle}>
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {RISKS.map((r) => (
                <li key={r} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-zinc-800 dark:text-zinc-100">{r}</span>
                  <input
                    aria-label={r}
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600"
                    checked={rischi.includes(r)}
                    onChange={() => toggleInArray(rischi, setRischi, r)}
                  />
                </li>
              ))}
            </ul>
          </Section>

          {/* Configurazione operativa */}
          <Section title="Configurazione operativa" icon={Cog}>
            <div className="-mx-3 grid grid-cols-1 sm:grid-cols-2">
              {CONFIGS.map((c) => (
                <label
                  key={c.code}
                  className="group mx-3 mb-3 flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-3 transition hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-800 dark:hover:border-blue-400/70 dark:hover:bg-blue-900/20"
                >
                  <input
                    type="radio"
                    name="config"
                    value={c.code}
                    checked={config === c.code}
                    onChange={() => setConfig(c.code)}
                    className="h-4 w-4 border-zinc-400 text-blue-600 focus:ring-blue-500 dark:border-zinc-600"
                  />
                  <span className="w-10 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.code}</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-200">{c.label}</span>
                </label>
              ))}
            </div>
          </Section>

          {/* Funzioni attivate */}
          <Section title="Funzioni attivate" icon={ListChecks}>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {FUNZIONI.map((f) => (
                <label
                  key={f.code}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 transition hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-800 dark:hover:border-blue-400/70 dark:hover:bg-blue-900/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-12 items-center justify-center rounded-lg bg-zinc-100 text-[11px] font-semibold tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {f.code}
                    </span>
                    <span className="text-sm text-zinc-800 dark:text-zinc-100">{f.label}</span>
                  </div>
                  <input
                    aria-label={f.label}
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600"
                    checked={funzioni.includes(f.code)}
                    onChange={() => toggleInArray(funzioni, setFunzioni, f.code)}
                  />
                </label>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Footer azioni */}
      <div className="sticky bottom-3 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white/90 p-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
          <span className="rounded-md bg-emerald-50 px-2 py-1 font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
            Anteprima nota
          </span>
          <code className="max-w-[52ch] truncate whitespace-pre text-[11px] text-zinc-700 dark:text-zinc-200">
            {notaSintetica}
          </code>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => {
              setStato("chiusa");
              setDecorrenza(new Date().toISOString().slice(0, 10));
              setDescrizione("");
              setRischi([]);
              setConfig("S0");
              setFunzioni([]);
            }}
          >
            Reimposta
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => {
              alert("Stato SOR aggiornato. (Solo UI)");
            }}
          >
            Salva aggiornamento
          </button>
        </div>
      </div>
    </PageShell>
  );
}
