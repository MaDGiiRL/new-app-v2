import React from "react";
import { Link } from "react-router-dom";
import { Activity, FileText } from "lucide-react";

function cn(...c) { return c.filter(Boolean).join(" "); }
function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
        className
      )}
      {...p}
    />
  );
}

function Stat({ color, label, value, to }) {
  const colors = {
    red: "text-red-600 dark:text-red-400",
    orange: "text-orange-600 dark:text-orange-400",
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    gray: "text-slate-600 dark:text-slate-300",
  };
  return (
    <Card className="p-4">
      <p className={cn("text-sm mb-1", colors[color] || colors.gray)}>{label}</p>
      <div className="text-3xl font-semibold">
        {to ? (
          <Link className="underline decoration-current underline-offset-4" to={to}>
            {value}
          </Link>
        ) : value}
      </div>
    </Card>
  );
}

export default function EventiInAtto() {
  const eventiOggi = [
    {
      id: 2935,
      titolo: "EVENTO METEO -  AVVISO DI CRITICITA' N. 56 / 2025",
      inizio: "22/09/2025",
      fine: "26/09/2025",
    },
    {
      id: 2931,
      titolo: "ANA 3RGPT Corso base e sicurezza - Sez. di VR",
      inizio: "20/09/2025",
      fine: "05/10/2025",
    },
    {
      id: 2925,
      titolo:
        "CORSO BASE E SICUREZZA PER VOLONTARI DI PROTEZIONE CIVILE DELLA PROVINCIA DI PADOVA (16.09.2025-28.10.2025)",
      inizio: "16/09/2025",
      fine: "28/10/2025",
    },
    {
      id: 2927,
      titolo:
        "Chiusura Ponte Gisbenti lungo Strada Provinciale 46 in Comune di Valli del Pasubio",
      inizio: "16/09/2025",
      fine: "07/10/2025",
    },
    {
      id: 2808,
      titolo:
        "Supporto per il monitoraggio della frana di Cancia in Comune di Borca di Cadore (BL) - Stagione 2025",
      inizio: "31/05/2025",
      fine: "04/10/2025",
    },
    { id: 2676, titolo: "Evento Locale - 2025", inizio: "01/01/2025", fine: "31/12/2025" },
  ];

  const eventiProssimi = [
    { id: 2933, titolo: "REAS - 24° Salone Internazionale dell'Emergenza 2025", inizio: "03/10/2025", fine: "05/10/2025" },
    { id: 2932, titolo: "Manovra dimostrativa presso Scuole Bagnoli di Sopra", inizio: "27/09/2025", fine: "27/09/2025" },
    { id: 2937, titolo: "Esercitazione salvaguardia beni culturali Venezia", inizio: "27/09/2025", fine: "28/09/2025" },
    { id: 2939, titolo: "Esercitazione AIB Auronzo di Cadore 27 settembre 2025", inizio: "27/09/2025", fine: "27/09/2025" },
    // ...altri come nel tuo elenco
  ];

  return (
    <div className="p-4">
      <div className="border-b border-slate-200 dark:border-slate-800 p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Activity className="h-5 w-5 text-blue-500" /> Monitor attivazioni
        </h2>
      </div>

      <div className="p-4">
        {/* righe statistiche */}
        <div className="grid gap-4 md:grid-cols-4">
          <Stat color="red" label="Proposte in attesa" value={0} to="/attivazioni/proposte-in-attesa" />
          <Stat color="orange" label="Proposte in lavorazione" value={0} to="/attivazioni/proposte-in-lavorazione" />
          <Stat color="green" label="Proposte stampate da protocollare" value={0} to="/attivazioni/proposte-stampate" />
          <Stat color="blue" label="Attivazioni vie brevi" value={0} to="/attivazioni/attivazioni-da-ratificare" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Stat color="green" label="Squadre in attività oggi" value={55} to="/attivazioni/attivazioni-attive" />
          <Stat color="gray" label="Squadre attivate per i prossimi giorni" value={127} to="/attivazioni/attivazioni-attive" />
        </div>

        {/* Eventi oggi */}
        <div className="mt-8">
          <h3 className="text-base font-semibold mb-1">Eventi in atto oggi</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Elenco degli eventi con almeno un'attivazione attiva alla data odierna
          </p>
          <Card className="p-4">
            <ul className="space-y-2">
              {eventiOggi.map((e) => (
                <li key={e.id}>
                  <Link
                    to={`/attivazioni/ricerca-attivazioni?id_evento=${e.id}`}
                    className="font-medium underline decoration-sky-600 underline-offset-4"
                  >
                    {e.titolo}
                  </Link>{" "}
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    (Inizio evento {e.inizio} — Fine evento {e.fine})
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Eventi prossimi */}
        <div className="mt-10">
          <h3 className="text-base font-semibold mb-1">Eventi previsti nei prossimi giorni</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Elenco degli eventi con attivazioni formalizzate per i prossimi giorni
          </p>
          <Card className="p-4">
            <ul className="space-y-2">
              {eventiProssimi.map((e) => (
                <li key={e.id}>
                  <Link
                    to={`/attivazioni/ricerca-attivazioni?id_evento=${e.id}`}
                    className="font-medium underline decoration-sky-600 underline-offset-4"
                  >
                    {e.titolo}
                  </Link>{" "}
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    (Inizio evento {e.inizio} — Fine evento {e.fine})
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="p-4 pt-0">
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <FileText className="h-4 w-4" /> Dati dimostrativi.
        </p>
      </div>
    </div>
  );
}
