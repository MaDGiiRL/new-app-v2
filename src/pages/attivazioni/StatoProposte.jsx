import React, { useMemo, useState } from "react";
import { ClipboardList, Search } from "lucide-react";

/* mini UI */
function cn(...c) { return c.filter(Boolean).join(" "); }
function Card({ className, ...p }) {
    return (
        <div
            className={cn(
                "m-4 rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
                className
            )}
            {...p}
        />
    );
}
const Input = (p) => (
    <input
        {...p}
        className={cn(
            "h-10 w-full rounded-xl border px-3 text-sm",
            "border-slate-300 bg-white/90 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
            p.className
        )}
    />
);
const Select = (p) => (
    <select
        {...p}
        className={cn(
            "h-10 w-full rounded-xl border px-3 text-sm",
            "border-slate-300 bg-white/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",
            p.className
        )}
    />
);

const MOCK = [
    { richiesta: "1757942360", richiesta_ts: "15/09/2025 15:19:20", id: "49696", stato: "Protocollata", org: "A.P.C. Villadose O.D.V. ONLUS", inizio: "17/09/2025", operatore: "silvia fontana", op_ts: "16/09/2025 10:41:38" },
    { richiesta: "1758011540", richiesta_ts: "16/09/2025 10:32:20", id: "49699", stato: "Protocollata", org: "Associazione Volontari Protezione Civile “Grifone” – ODV Verona", inizio: "20/09/2025", operatore: "manuela gregolin", op_ts: "16/09/2025 11:59:34" },
    { richiesta: "1758093449", richiesta_ts: "17/09/2025 09:17:29", id: "49717", stato: "Rifiutata", org: "Associazione Reparto Volo Emergenze", inizio: "20/09/2025", operatore: "silvia fontana", op_ts: "17/09/2025 13:01:44" },
    { richiesta: "1758094207", richiesta_ts: "17/09/2025 09:30:07", id: "49723", stato: "Protocollata", org: "Croce Rossa Italiana Comitato di Verona ODV", inizio: "20/09/2025", operatore: "silvia fontana", op_ts: "18/09/2025 09:50:09" },
];

export default function StatoProposte() {
    const [q, setQ] = useState("");
    const [stato, setStato] = useState("ALL");

    const rows = useMemo(() => {
        return MOCK.filter(r => {
            if (stato !== "ALL" && r.stato !== stato) return false;
            if (!q) return true;
            const hay = `${r.richiesta} ${r.id} ${r.stato} ${r.org} ${r.operatore}`.toLowerCase();
            return hay.includes(q.toLowerCase());
        });
    }, [q, stato]);

    return (
        <div className="p-4 lg:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                <ClipboardList className="h-5 w-5 text-blue-500" />
                Stato delle proposte di attivazione
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mx-4 mb-4">
                Elenco delle proposte di attivazione formulate negli ultimi 10 giorni, ordinate per numero richiesta.
            </p>

            <Card className="p-4">
                {/* filtri */}
                <div className="grid gap-3 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                className="pl-9"
                                placeholder="Cerca per richiesta, ID, organizzazione, operatore…"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                    </div>
                    <Select value={stato} onChange={(e) => setStato(e.target.value)}>
                        <option value="ALL">Tutti gli stati</option>
                        <option value="Protocollata">Protocollata</option>
                        <option value="Rifiutata">Rifiutata</option>
                    </Select>
                </div>

                {/* tabella */}
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full table-fixed text-sm">
                        <colgroup>
                            <col className="w-[220px]" />
                            <col className="w-[90px]" />
                            <col className="w-[420px]" />
                            <col className="w-[140px]" />
                            <col className="w-[220px]" />
                        </colgroup>
                        <thead className="bg-slate-50 text-left dark:bg-slate-900/30">
                            <tr>
                                {["Richiesta", "ID", "Organizzazione", "Data inizio", "Operatore e data"].map(h => (
                                    <th key={h} className="px-3 py-2 text-slate-700 dark:text-slate-300">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(r => (
                                <tr key={`${r.richiesta}-${r.id}`} className="border-t border-slate-200 dark:border-slate-800">
                                    <td className="px-3 py-3 align-top">
                                        <div className="font-medium">Richiesta n.{r.richiesta}</div>
                                        <div className="text-xs text-slate-500">{r.richiesta_ts}</div>
                                        <div className={cn("mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                                            r.stato === "Protocollata" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                                : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200"
                                        )}>{r.stato}</div>
                                    </td>
                                    <td className="px-3 py-3 align-top">{r.id}</td>
                                    <td className="px-3 py-3 align-top">{r.org}</td>
                                    <td className="px-3 py-3 align-top">{r.inizio}</td>
                                    <td className="px-3 py-3 align-top">
                                        <div className="capitalize">{r.operatore}</div>
                                        <div className="text-xs text-slate-500">{r.op_ts}</div>
                                    </td>
                                </tr>
                            ))}
                            {!rows.length && (
                                <tr>
                                    <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                                        Nessun risultato
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
