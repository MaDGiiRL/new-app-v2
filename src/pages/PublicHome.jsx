import { Link } from "react-router-dom";
import { Map as MapIcon, AppWindow, Activity, ChevronRight } from "lucide-react";

export default function PublicHome() {
  return (
    <div className="space-y-15 py-15">
      {/* Intro */}
      <section className="space-y-4 text-center">
        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/dS54iAp.png"
            alt="Regione del Veneto"
            className="w-1/3 max-w-xs"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Benvenuti nel portale di supporto delle attività <br />di Protezione Civile della Regione del Veneto
        </h1>
        <p className="opacity-90">
          Il portale fornisce informazioni ed utilità di supporto per gli operatori del Sistema Regionale di Protezione Civile
        </p>
        <p className="text-sm opacity-70 max-w-4xl mx-auto">
          I dati presentati nel portale non sostituiscono i dati cartografici ufficiali nè i dati presenti nei piani comunali approvati,
          ma intendono essere solo uno strumento di supporto per Enti del sistema regionale di Protezione Civile.
        </p>
      </section>

      {/* Cards (stile SectionCard con testo) */}
      <section className="grid md:grid-cols-3 gap-6 max-w-7xl">
        {/* CARD 1 - Cartografie */}
        <Link
          to="/cartografie"
          aria-label="Apri la sezione Cartografie"
          className={[
            "group block rounded-2xl overflow-hidden relative",
            "bg-gradient-to-br from-white via-sky-50 to-sky-100",
            "dark:from-slate-900 dark:via-slate-950 dark:to-blue-950",
            "border border-slate-200/70 dark:border-slate-800/70",
            "ring-1 ring-slate-900/5 dark:ring-white/5",
            "pt-4 pb-6 sm:pt-5 sm:pb-7 px-6 sm:px-7",
            "shadow-sm hover:shadow-lg transition hover:-translate-y-0.5",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:focus-visible:ring-sky-500/60",
          ].join(" ")}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
            style={{
              background:
                "radial-gradient(1200px 400px at -10% -10%, rgba(56,189,248,0.18), transparent 60%)",
            }}
          />

          <div className="flex items-center gap-4 relative">
            <div
              className={[
                "size-12 sm:size-14 flex items-center justify-center shrink-0 rounded-xl",
                "border border-slate-200 dark:border-slate-800",
                "bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300",
                "dark:from-slate-800 dark:via-slate-900 dark:to-blue-900",
                "shadow-[inset_0_1px_0_rgba(255,255,255,.6)] dark:shadow-none",
                "transition-transform group-hover:-translate-y-0.5",
              ].join(" ")}
            >
              <MapIcon className="h-6 w-6 text-sky-700 dark:text-sky-300" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100 whitespace-normal break-words">
                Cartografie
              </h3>
              <p className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">
                Vai alla sezione
              </p>
            </div>

            <div className="ml-auto translate-x-0 group-hover:translate-x-1 transition-transform">
              <div
                className={[
                  "size-8 sm:size-9 rounded-full flex items-center justify-center",
                  "border border-slate-200 dark:border-slate-800",
                  "bg-gradient-to-br from-white via-slate-100 to-slate-200",
                  "dark:from-slate-800 dark:via-slate-900 dark:to-slate-950",
                ].join(" ")}
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
            Questa sezione raccoglie sotto forma di mappe, informazioni relative ai piani comunali di protezione civile,
            nonchè ulteriori dati raccolti ed elaborati dalla Direzione Protezione Civile e Polizia Locale della Regione del Veneto.
          </p>

          <div className="mt-5">
            <img
              src="https://i.imgur.com/1Q0274G.jpeg"
              alt="Cartografia Protezione Civile"
              className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 w-full h-45 object-cover"
            />
          </div>
        </Link>

        {/* CARD 2 - Applicativi informatici */}
        <Link
          to="/accesso"
          aria-label="Apri la sezione Applicativi informatici"
          className={[
            "group block rounded-2xl overflow-hidden relative",
            "bg-gradient-to-br from-white via-sky-50 to-sky-100",
            "dark:from-slate-900 dark:via-slate-950 dark:to-blue-950",
            "border border-slate-200/70 dark:border-slate-800/70",
            "ring-1 ring-slate-900/5 dark:ring-white/5",
            "pt-4 pb-6 sm:pt-5 sm:pb-7 px-6 sm:px-7",
            "shadow-sm hover:shadow-lg transition hover:-translate-y-0.5",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:focus-visible:ring-sky-500/60",
          ].join(" ")}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
            style={{
              background:
                "radial-gradient(1200px 400px at -10% -10%, rgba(56,189,248,0.18), transparent 60%)",
            }}
          />

          <div className="flex items-center gap-4 relative">
            <div
              className={[
                "size-12 sm:size-14 flex items-center justify-center shrink-0 rounded-xl",
                "border border-slate-200 dark:border-slate-800",
                "bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300",
                "dark:from-slate-800 dark:via-slate-900 dark:to-blue-900",
                "shadow-[inset_0_1px_0_rgba(255,255,255,.6)] dark:shadow-none",
                "transition-transform group-hover:-translate-y-0.5",
              ].join(" ")}
            >
              <AppWindow className="h-6 w-6 text-sky-700 dark:text-sky-300" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                Applicativi informatici
              </h3>
              <p className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">
                Vai alla sezione
              </p>
            </div>

            <div className="ml-auto translate-x-0 group-hover:translate-x-1 transition-transform">
              <div
                className={[
                  "size-8 sm:size-9 rounded-full flex items-center justify-center",
                  "border border-slate-200 dark:border-slate-800",
                  "bg-gradient-to-br from-white via-slate-100 to-slate-200",
                  "dark:from-slate-800 dark:via-slate-900 dark:to-slate-950",
                ].join(" ")}
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
            Questa sezione consente l'accesso a procedure informatiche per la ricerca e la gestione delle risorse umane e strumentali della Protezione Civile. L'accesso è riservato ai volontari specificatamente formati e a tutti gli utenti accreditati.
          </p>

          <div className="mt-5">
            <img
              src="https://i.imgur.com/byUJBRM.jpeg"
              alt="Applicativi placeholder"
              className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 w-full h-45 object-cover"
            />
          </div>
        </Link>

        {/* CARD 3 - Percezione sismica */}
        <Link
          to="/percezione-sismica"
          aria-label="Apri la sezione Percezione sismica"
          className={[
            "group block rounded-2xl overflow-hidden relative",
            "bg-gradient-to-br from-white via-sky-50 to-sky-100",
            "dark:from-slate-900 dark:via-slate-950 dark:to-blue-950",
            "border border-slate-200/70 dark:border-slate-800/70",
            "ring-1 ring-slate-900/5 dark:ring-white/5",
            "pt-4 pb-6 sm:pt-5 sm:pb-7 px-6 sm:px-7",
            "shadow-sm hover:shadow-lg transition hover:-translate-y-0.5",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:focus-visible:ring-sky-500/60",
          ].join(" ")}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
            style={{
              background:
                "radial-gradient(1200px 400px at -10% -10%, rgba(56,189,248,0.18), transparent 60%)",
            }}
          />

          <div className="flex items-center gap-4 relative">
            <div
              className={[
                "size-12 sm:size-14 flex items-center justify-center shrink-0 rounded-xl",
                "border border-slate-200 dark:border-slate-800",
                "bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300",
                "dark:from-slate-800 dark:via-slate-900 dark:to-blue-900",
                "shadow-[inset_0_1px_0_rgba(255,255,255,.6)] dark:shadow-none",
                "transition-transform group-hover:-translate-y-0.5",
              ].join(" ")}
            >
              <Activity className="h-6 w-6 text-sky-700 dark:text-sky-300" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                Percezione sismica
              </h3>
              <p className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">
                Vai alla sezione
              </p>
            </div>

            <div className="ml-auto translate-x-0 group-hover:translate-x-1 transition-transform">
              <div
                className={[
                  "size-8 sm:size-9 rounded-full flex items-center justify-center",
                  "border border-slate-200 dark:border-slate-800",
                  "bg-gradient-to-br from-white via-slate-100 to-slate-200",
                  "dark:from-slate-800 dark:via-slate-900 dark:to-slate-950",
                ].join(" ")}
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
            Attraverso questa sezione è possibile accedere al portale per la segnalazione della percezione sismica. L'accesso è riservato ai volontari specificatamente formati per la compilazione del questionario di percezione sismica.
          </p>

          <div className="mt-5">
            <img
              src="https://i.imgur.com/ASqOrvL.jpeg"
              alt="Percezione sismica placeholder"
              className="rounded-xl border border-slate-300/70 dark:border-slate-700/70 w-full h-45 object-cover"
            />
          </div>
        </Link>
      </section>
    </div>
  );
}
