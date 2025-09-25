// src/pages/AttivazioniPage.jsx
import { useMemo, useState } from "react";

/**
 * Dati delle attivazioni senza evento (derivati dalla tua tabella)
 */
const ACTIVATIONS = [
    { id: 49916, org: "Gruppo Comunale Volontari di Protezione Civile - Pramaggiore (VE)", period: "23/09/2025 25/09/2025", activity: "monitoraggio territorio per forti piogge segnalazione CFD arancione", coord: "Comune di Pramaggiore" },
    { id: 49923, org: "Gruppo Volontari di Protezione Civile Alto Astico - Pedemonte (VI)", period: "24/09/2025 24/09/2025", activity: "Monitoraggio evento meteo 24/09/2025", coord: "C.O.I. Alto Astico" },
    { id: 49921, org: "Organizzazione di Volontariato Protezione Civile Arsiero ODV", period: "24/09/2025 24/09/2025", activity: "Monitoraggio evento meteo 24/09/2025", coord: "C.O.I. Alto Astico" },
    { id: 49922, org: "O.D.V. - Comitato Volontario di Protezione Civile di Tonezza del Cimone", period: "24/09/2025 24/09/2025", activity: "Monitoraggio evento meteo 24/09/2025", coord: "C.O.I. Alto Astico" },
    { id: 49905, org: "Associazione Italiana Soccorritori - Protezione Civile - Sezione Valpolicella-Valdadige - Marano di Valpolicella (VR)", period: "24/09/2025 24/09/2025", activity: "Supporto per svolgimento manifestazione Chiesa Santa Maria Valverde dalle ore 18.00 alle ore 22.00", coord: "Comune di Marano di Valpolicella" },
    { id: 49920, org: "Gruppo Volontari Antincendio e Protezione Civile Cogollo del Cengio - ODV", period: "24/09/2025 24/09/2025", activity: "Monitoraggio evento meteo 24/09/2025", coord: "C.O.I. Alto Astico" },
    { id: 49928, org: "ODV Volontari Protezione Civile di Eraclea", period: "24/09/2025 24/09/2025", activity: "ASSISTENZA ALLAGAMENTI ERACLEA MARE", coord: "Comune di Eraclea" },
    { id: 49924, org: "Gruppo Comunale P.C. di San Pietro in Cariano", period: "24/09/2025 24/09/2025", activity: "Eventi avversi temporale", coord: "Comune di San Pietro in Cariano" },
    { id: 49904, org: "Gruppo Comunale Volontari di Protezione Civile - Annone Veneto (VE)", period: "24/09/2025 24/09/2025", activity: "controllo del territorio comunale per sorveglianza rischio idro-geologico.", coord: "Comune di Annone Veneto" },
    { id: 49929, org: "Gruppo Comunale Volontari di Protezione Civile – Porto Tolle (RO)", period: "25/09/2025 25/09/2025", activity: "POST-TEMPORALE DEL 23-24 SETTEMBRE 2025 - RIPRISTINI A SUPPORTO DELLA POLIZIA LOCALE", coord: "Comune di Porto Tolle" },
    { id: 49850, org: "Gruppo Comunale Protezione Civile di Belluno", period: "25/09/2025 25/09/2025", activity: "Emergenza Ucraina - Supporto gestione profughi ucraini", coord: "Comune di Belluno" },
    { id: 49925, org: "Gruppo di Volontariato Comunale di Protezione Civile di Povegliano Veronese", period: "25/09/2025 25/09/2025", activity: "Supporto alla Polizia locale per Inaugurazione Anno scolastico 2025/26", coord: "Comune di Povegliano Veronese" },
    { id: 49933, org: "Protezione Civile Pasubio Alto Vicentino ODV", period: "25/09/2025 25/09/2025", activity: "Allagamento Torrebelvicino", coord: "Unione Montana Pasubio - Piccole Dolomiti" },
    { id: 49917, org: "Gruppo Protezione Civile Auronzo di Cadore ODV", period: "26/09/2025 27/09/2025", activity: "esercitazione di protezione civile", coord: "Comune di Auronzo di Cadore" },
    { id: 49930, org: "Gruppo Comunale Volontari di Protezione Civile - Crocetta del Montello (TV)", period: "27/09/2025 27/09/2025", activity: "Funzione religiosa locale con grande afflusso di persone: controllo del territorio e informazioni alla popolazione.", coord: "Comune di Crocetta del Montello" },
    { id: 49931, org: "Associazione Nazionale Alpini - Sezione Cadore - Calalzo di Cadore (BL)", period: "27/09/2025 27/09/2025", activity: "informazioni alla popolazione per manifestazione rilevante", coord: "Comune di Cortina d'Ampezzo" },
    { id: 49903, org: "Gruppo Comunale Volontari di Protezione Civile - Fontaniva (PD)", period: "28/09/2025 28/09/2025", activity: "Informazioni alla popolazione durante la mifestazione \"Marcia dei Bartandi\"", coord: "Comune di Fontaniva" },
];

/**
 * Elenco eventi (value = id). Ho mantenuto le opzioni che hai incollato.
 */
const EVENTS = [
    { id: "", label: "Scegliere un evento" },
    { id: "2926", label: "attività addestrativa di Protezione Civile- comuni di Segusino, Tarzo, Vittorio Veneto (TV)  ( 11/10/2025 - 11/10/2025)" },
    { id: "2933", label: "REAS - 24° Salone Internazionale dell'Emergenza 2025 ( 03/10/2025 - 05/10/2025)" },
    { id: "2938", label: "Attività addestrativa a Garda (VR) con mzzi 4x4 su richiesta del comune di Garda  ( 27/09/2025 - 27/09/2025)" },
    { id: "2937", label: "Esercitazione salvaguardia beni culturali Venezia ( 27/09/2025 - 28/09/2025)" },
    { id: "2936", label: "Presentazione attività AIB ... Bagnoli ( 27/09/2025 - 27/09/2025)" },
    { id: "2939", label: "Esercitazione AIB Auronzo di Cadore 27 settembre 2025 ( 27/09/2025 - 27/09/2025)" },
    { id: "2932", label: "Manovra dimostrativa Scuole Bagnoli di Sopra ( 27/09/2025 - 27/09/2025)" },
    { id: "2934", label: "Ricerca persona scomparsa - Comune di Sanguineto - Verona ( 22/09/2025 - 24/09/2025)" },
    { id: "2935", label: "EVENTO METEO - AVVISO DI CRITICITA' N. 56 / 2025 ( 22/09/2025 - 26/09/2025)" },
    { id: "2931", label: "ANA 3RGPT Corso base e sicurezza - Sez. di VR ( 20/09/2025 - 05/10/2025)" },
    { id: "2930", label: "AIR SHOW THIENE 2025 - Frecce Tricolori ( 19/09/2025 - 20/09/2025)" },
    { id: "2929", label: "Incendio boschivo - Santo Stefano di Cadore ( 17/09/2025 - 20/09/2025)" },
    { id: "2925", label: "CORSO BASE E SICUREZZA ... Padova (16.09.2025-28.10.2025) ( 16/09/2025 - 28/10/2025)" },
    { id: "2927", label: "Chiusura Ponte Gisbenti SP46 Valli del Pasubio ( 16/09/2025 - 07/10/2025)" },
    { id: "2921", label: "Manifestazione sportiva \"LESSINIA LEGEND RUN\" ( 14/09/2025 - 14/09/2025)" },
    { id: "2907", label: "\"Festa Madonna dell'Angelo - Caorle 2025\" ( 14/09/2025 - 15/09/2025)" },
    { id: "2922", label: "Centenario Alpini Gruppo di Malo - 14/09/2025 ( 14/09/2025 - 14/09/2025)" },
    { id: "2917", label: "Giro del Veneto 2025 ( 13/09/2025 - 13/09/2025)" },
    { id: "2920", label: "Retraining Sicurezza DLgs 81/2008 - Fiesso ( 13/09/2025 - 13/09/2025)" },
    { id: "2924", label: "Esercitazione AIB Monte Calvarina ( 12/09/2025 - 12/09/2025)" },
    { id: "2919", label: "Allerta meteo CFD n. 54/2025 ( 10/09/2025 - 12/09/2025)" },
    { id: "2918", label: "Intervento supporto RFI Padova ( 09/09/2025 - 09/09/2025)" },
    { id: "2916", label: "Sversamento liquidi oleosi - Cisano (VR) ( 09/09/2025 - 10/09/2025)" },
    { id: "2891", label: "66° Pellegrinaggio alpino Monte Tomba ANA ( 07/09/2025 - 07/09/2025)" },
    { id: "2915", label: "Feste quinquennali Divin Crocifisso - Pove ( 07/09/2025 - 14/09/2025)" },
    { id: "2910", label: "Retraining Sicurezza DLgs 81/2008 - Rovigo ( 06/09/2025 - 06/09/2025)" },
    { id: "2914", label: "Incendio boschivo - Jesolo ( 04/09/2025 - 07/09/2025)" },
    { id: "2912", label: "Ricerca persona scomparsa - Susegana (TV) ( 03/09/2025 - 06/09/2025)" },
    { id: "2911", label: "Evento meteo CFD n. 52 ( 01/09/2025 - 03/09/2025)" },
    { id: "2909", label: "Evento meteo CFD n. 51 ( 29/08/2025 - 30/08/2025)" },
    { id: "2908", label: "Supporto RFI Montegrotto Terme (PD) ( 29/08/2025 - 29/08/2025)" },
    { id: "2857", label: "Campagna estiva AIB 2025 - Colli Euganei ( 05/07/2025 - 31/08/2025)" },
    { id: "2858", label: "Campagna estiva AIB zona litoranea Rovigo 2025 ( 04/07/2025 - 31/08/2025)" },
    { id: "2860", label: "Eventi Meteo Locali 2025 ( 30/06/2025 - 31/12/2025)" },
    { id: "2818", label: "Campi Scuola 2025 ( 07/06/2025 - 15/09/2025)" },
    { id: "2808", label: "Monitoraggio frana di Cancia (BL) - Stagione 2025 ( 31/05/2025 - 04/10/2025)" },
    { id: "2684", label: "Ricerca persone scomparse locale - 2025 ( 01/01/2025 - 31/12/2025)" },
    { id: "2928", label: "INR 365 - FORMATORI ( 01/01/2025 - 31/12/2025)" },
    { id: "2698", label: "Movimentazione mezzi Servizi Provinciali PC ( 01/01/2025 - 31/10/2025)" },
    { id: "2681", label: "Attività nelle scuole 2025 ( 01/01/2025 - 31/10/2025)" },
    { id: "2703", label: "Campagna INR 365 - anno 2025 ( 01/01/2025 - 31/12/2025)" },
    { id: "2685", label: "Movimentazione materiali e mezzi CMR/CLR 2025 ( 01/01/2025 - 31/10/2025)" },
    { id: "2676", label: "Evento Locale - 2025 ( 01/01/2025 - 31/12/2025)" },
    { id: "2683", label: "Attività formative e addestrative locali 2025 ( 01/01/2025 - 31/10/2025)" },
    { id: "2361", label: "maltempo a Pederobba 30 e 31 marzo 2024 ( 30/03/2024 - )" },
];

export default function AttivazioniPage() {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [eventoId, setEventoId] = useState("");
  const [eventoVerificaId, setEventoVerificaId] = useState("");

  const toggleAll = () => {
    if (selectAll) {
      setSelectedIds(new Set());
      setSelectAll(false);
    } else {
      setSelectedIds(new Set(ACTIVATIONS.map((a) => a.id)));
      setSelectAll(true);
    }
  };

  const toggleOne = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
    if (next.size === ACTIVATIONS.length) setSelectAll(true);
    else setSelectAll(false);
  };

  const selectedCount = selectedIds.size;

  const handleExportCSV = () => {
    const headers = ["ID", "Organizzazione", "Periodo", "Attività", "Coordinamento"];
    const rows = ACTIVATIONS.map((a) => [
      a.id,
      a.org.replaceAll('"', '""'),
      a.period.replaceAll('"', '""'),
      a.activity.replaceAll('"', '""'),
      a.coord.replaceAll('"', '""'),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attivazioni_senza_evento.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const postFormUrlEncoded = async (url, payload) => {
    const body = new URLSearchParams(payload);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  };

  const handleAssociate = async () => {
    if (!eventoId) {
      alert("Seleziona un evento prima di associare.");
      return;
    }
    if (selectedIds.size === 0) {
      alert("Seleziona almeno un'attivazione.");
      return;
    }
    try {
      const payload = {
        action: "associa_protocollate",
        evento: eventoId,
        ...Array.from(selectedIds).reduce((acc, id, i) => {
          acc[`id_attivazione[${i}]`] = String(id);
          return acc;
        }, {}),
      };
      await postFormUrlEncoded("api/associazione_eventi.php", payload);
      alert("Associazione completata.");
      setSelectedIds(new Set());
      setSelectAll(false);
    } catch (e) {
      console.error(e);
      alert("Errore durante l'associazione.");
    }
  };

  const handleVerify = async () => {
    if (!eventoVerificaId) {
      alert("Seleziona un evento per la verifica.");
      return;
    }
    try {
      const payload = { action: "verifica_associazione", evento: eventoVerificaId };
      await postFormUrlEncoded("api/associazione_eventi.php", payload);
      alert("Verifica inviata. Controlla i risultati nel backend/log.");
    } catch (e) {
      console.error(e);
      alert("Errore durante la verifica.");
    }
  };

  const allChecked = useMemo(
    () => selectAll || selectedIds.size === ACTIVATIONS.length,
    [selectAll, selectedIds]
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Associazione eventi</h1>

      {/* PANNELLO 1 — Attivazioni senza evento */}
      <section className="mb-10 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-semibold">Attivazioni senza evento</h2>
          <p className="text-sm text-slate-600 mt-1">
            Elenco delle attivazioni che non hanno evento collegato (solo definitive).
          </p>

          <label className="mt-4 inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              id="sel_generale"
              type="checkbox"
              checked={allChecked}
              onChange={toggleAll}
              className="h-5 w-5"
            />
            <span className="text-red-600 font-medium">Seleziona/deseleziona tutti</span>
          </label>
        </div>

        <div className="p-5 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="text-left bg-slate-50 dark:bg-slate-900/30">
                <th className="px-3 py-2">Sel</th>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Organizzazione</th>
                <th className="px-3 py-2">Periodo</th>
                <th className="px-3 py-2">Attività</th>
                <th className="px-3 py-2">Coordinamento</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVATIONS.map((a) => {
                const checked = selectedIds.has(a.id);
                return (
                  <tr key={a.id} className="border-t border-slate-200 dark:border-slate-800">
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOne(a.id)}
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="px-3 py-2">{a.id}</td>
                    <td className="px-3 py-2">{a.org}</td>
                    <td className="px-3 py-2">{a.period}</td>
                    <td className="px-3 py-2">{a.activity}</td>
                    <td className="px-3 py-2">{a.coord}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Evento da associare</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={eventoId}
                onChange={(e) => setEventoId(e.target.value)}
                required
              >
                {EVENTS.map((ev) => (
                  <option key={ev.id || "blank"} value={ev.id}>
                    {ev.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">
                Selezionati: <strong>{selectedCount}</strong>
              </p>
            </div>

            <div className="flex gap-3 md:justify-end">
              <button
                type="button"
                className="rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm hover:brightness-110"
                onClick={handleAssociate}
              >
                Associa
              </button>
              <button
                type="button"
                className="rounded-lg bg-sky-600 text-white px-4 py-2 text-sm hover:brightness-110"
                onClick={handleExportCSV}
                title='Esporta CSV (compatibile "xls")'
              >
                Estrai in formato xls
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PANNELLO 2 — Verifica */}
      <section className="rounded-2xl border border-amber-300 bg-amber-50/50 dark:bg-amber-900/10">
        <div className="p-5 border-b border-amber-200">
          <h2 className="text-lg font-semibold">
            Verifica attivazioni associate a “Evento Locale” potenzialmente associabili ad altro evento
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Ricerca le attivazioni con data congruente e parole chiave: <em>emergenz, maltemp, argin, fium, alber</em>.
          </p>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Evento per la verifica</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={eventoVerificaId}
                onChange={(e) => setEventoVerificaId(e.target.value)}
                required
              >
                {EVENTS.map((ev) => (
                  <option key={`v-${ev.id || "blank"}`} value={ev.id}>
                    {ev.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 md:justify-end">
              <button
                type="button"
                className="rounded-lg bg-cyan-600 text-white px-4 py-2 text-sm hover:brightness-110"
                onClick={handleVerify}
              >
                Verifica
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}