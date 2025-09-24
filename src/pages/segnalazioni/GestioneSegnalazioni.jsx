import { useMemo, useState } from "react";
import PageShell from "./_PageShell";

const rows = [
  // TODO: Incolla qui tutti i record forniti. Esempio:
  // {
  //   dataOra: "24/09/2025 12:34 (2 ore trascorse)",
  //   eu: "U",
  //   ente: "Comune di Badia Polesine",
  //   comune: "Comune di Badia Polesine",
  //   sintesi: "segnalante/punto di contatto: ...",
  //   operatore: "emanuele barone",
  // },
];

export default function GestioneSegnalazioni() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      [r.dataOra, r.eu, r.ente, r.comune, r.sintesi, r.operatore]
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [q]);

  return (
    <PageShell
      title="Gestione segnalazioni o telefonate"
      description="Ricerca e consultazione delle segnalazioni registrate (frontend mock)."
    >
      {/* Barra azioni */}
      <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cerca per ente, comune, operatore, testo..."
          className="w-full sm:max-w-md rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        <div className="ml-auto flex gap-2">
          <button className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
            Esporta CSV
          </button>
          <button className="rounded-lg bg-sky-600 text-white px-3 py-2 text-sm hover:bg-sky-700">
            Nuova segnalazione
          </button>
        </div>
      </div>

      {/* Tabella scrollabile */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="max-h-[60vh] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur z-10">
              <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
                <th>Data e ora</th>
                <th>E/U</th>
                <th>Ente</th>
                <th>Comune</th>
                <th className="min-w-[360px]">Sintesi</th>
                <th>Operatore</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
              {filtered.map((r, i) => (
                <tr key={i} className="[&>td]:px-3 [&>td]:py-2 align-top">
                  <td className="whitespace-nowrap">{r.dataOra}</td>
                  <td className="font-mono">{r.eu}</td>
                  <td className="whitespace-nowrap">{r.ente || "-"}</td>
                  <td className="whitespace-nowrap">{r.comune || "-"}</td>
                  <td className="text-slate-700 dark:text-slate-200">{r.sintesi}</td>
                  <td className="whitespace-nowrap">{r.operatore || "-"}</td>
                  <td className="whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="rounded border px-2 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800">
                        Apri
                      </button>
                      <button className="rounded border px-2 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800">
                        Duplica
                      </button>
                      <button className="rounded border px-2 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800">
                        Elimina
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center opacity-70">
                    Nessun risultato{q ? ` per “${q}”` : ""}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
