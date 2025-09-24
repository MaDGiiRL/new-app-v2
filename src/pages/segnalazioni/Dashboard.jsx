import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PageShell from "./_PageShell";
import {
    Plus,
    Phone,
    Search,
    Users,
    MapPin,
    CalendarClock,
    FileText,
    X,
} from "lucide-react";

/* ---------------------------------- Mocks ---------------------------------- */
const rows = [
    {
        id: "1",
        datetime: "24/09/2025 12:34 (2 ore trascorse)",
        tipo: "U",
        ente: "Comune di Badia Polesine",
        comune: "Comune di Badia Polesine",
        sintesi:
            "Monica Gambardella 3481534524 – Aggiornamenti dal COC attivato. Problemi di scarico dell'acqua in eccesso; interventi in rientro.",
        operatore: "emanuele barone",
    },
    {
        id: "2",
        datetime: "24/09/2025 11:29 (3 ore trascorse)",
        tipo: "E",
        ente: "Vigili del Fuoco - Comando Rovigo",
        comune: "Comune di Badia Polesine",
        sintesi:
            "Resp. coordinamento operazioni (Vangelista) – possibili ulteriori 20 interventi.",
        operatore: "nicola zennaro",
    },
];

/* ------------------------------ UI primitives ------------------------------ */
function cn(...c) {
    return c.filter(Boolean).join(" ");
}

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

function Button({ variant = "solid", size = "md", className, ...props }) {
    const base =
        "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none";
    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
    };
    const variants = {
        solid:
            "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        ghost:
            "bg-transparent text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800",
        outline:
            "border border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
        subtle:
            "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
    };
    return (
        <button
            className={cn(base, sizes[size], variants[variant], className)}
            {...props}
        />
    );
}

function Badge({ children, className }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs",
                "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200",
                className
            )}
        >
            {children}
        </span>
    );
}

function Field({ label, hint, required, children }) {
    return (
        <label className="grid gap-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {label} {required && <span className="text-red-600">*</span>}
            </span>
            {children}
            {hint && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    {hint}
                </span>
            )}
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
                "dark:border-slate-700 dark:bg-slate-900/70 dark:placeholder:text-slate-500",
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
                "h-10 w-full rounded-xl border px-3 text-sm",
                "border-slate-300 bg-white/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                "dark:border-slate-700 dark:bg-slate-900/70",
                props.className
            )}
        />
    );
}


function Textarea(props) {
    return (
        <textarea
            {...props}
            className={cn(
                "min-h-24 w-full rounded-xl border px-3 py-2 text-sm",
                "border-slate-300 bg-white/90 placeholder:text-slate-400",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                "dark:border-slate-700 dark:bg-slate-900/70 dark:placeholder:text-slate-500",
                props.className
            )}
        />
    );
}

/* --------------------------------- Modals ---------------------------------- */
/** Modal con portal su document.body per evitare clipping/stacking dei contenitori */
function ModalShell({ open, onClose, title, children, footer }) {
    if (!open) return null;
    return createPortal(
        <div className="fixed inset-0 z-[100000]">
            {/* overlay full-screen */}
            <div
                className="fixed inset-0 bg-black/70"
                onClick={onClose}
                aria-hidden
            />
            {/* contenuto */}
            <div
                className="fixed inset-0 z-[100001] flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-label={typeof title === "string" ? title : undefined}
            >
                <Card className="relative w-full max-w-3xl p-6">
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 rounded-lg p-2 text-slate-300 hover:bg-white/10"
                        aria-label="Chiudi"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {title}
                    </h3>
                    <div className="max-h-[70vh] overflow-auto pr-1">{children}</div>
                    {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
                </Card>
            </div>
        </div>,
        document.body
    );
}

/* ----------------------------- Modale: Sintesi ----------------------------- */
function ModalSintesi({ open, onClose, content }) {
    return (
        <ModalShell
            open={open}
            onClose={onClose}
            title="Sintesi completa"
            footer={<Button onClick={onClose}>Chiudi</Button>}
        >
            <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                {content}
            </p>
        </ModalShell>
    );
}

/* --------------------------- Form: Telefonata base -------------------------- */
function FormTelefonata({ onSubmit }) {
    const [form, setForm] = useState({
        direzione: "Entrata",
        interlocutore: "",
        telefono: "",
        comune: "",
        sintesi: "",
    });

    const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    return (
        <form
            className="grid gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(form);
            }}
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Tel in Entrata/Uscita" required>
                    <select
                        value={form.direzione}
                        onChange={handle("direzione")}
                        className="h-10 w-full rounded-xl border border-slate-300 bg-white/90 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70"
                    >
                        <option>Entrata</option>
                        <option>Uscita</option>
                    </select>
                </Field>

                <Field label="Interlocutore" required>
                    <Input
                        value={form.interlocutore}
                        onChange={handle("interlocutore")}
                        placeholder="Nome / ruolo / ente"
                        required
                    />
                </Field>

                <Field label="Recapito telefonico">
                    <Input
                        value={form.telefono}
                        onChange={handle("telefono")}
                        type="tel"
                        placeholder="Es. 3331234567"
                        pattern="[0-9 +()-]*"
                    />
                </Field>

                <Field
                    label="Comune"
                    hint="Digita il comune. (Suggerimento: integra una Combobox con ricerca/virtualizzazione)"
                >
                    <Input
                        value={form.comune}
                        onChange={handle("comune")}
                        placeholder="Es. Rovigo"
                    />
                </Field>
            </div>

            <Field
                label="Sintesi della telefonata"
                hint="Breve riepilogo. Usa la scheda evento per aggiornamenti puntuali."
                required
            >
                <Textarea value={form.sintesi} onChange={handle("sintesi")} required />
            </Field>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" className="min-w-32">
                    Salva telefonata
                </Button>
            </div>
        </form>
    );
}

/* -------------------------- Form: Segnalazione base ------------------------- */
function FormSegnalazione({ onSubmit }) {
    const [form, setForm] = useState({
        tipologiaEvento: "",
        note: "",
        comuni: "",
        contatto: "",
        necessita: "",
        tipologiaAbitato: "",
        estensione: "",
        popolazioneCoinvolta: "",
        deceduti: 0,
        feriti: 0,
        isolati: 0,
        noteIsolati: "",
        evacuati: 0,
        noteEvacuati: "",
        energia: "",
        noteEnergia: "",
        acqua: "",
        noteAcqua: "",
        tlc: "",
        noteTlc: "",
        viabilitaLocale: "",
        noteViabilitaLocale: "",
        accessibilita: "",
        noteAccesso: "",
        noteFinali: "",
    });

    const handle = (k) => (e) =>
        setForm({ ...form, [k]: e.target.type === "number" ? Number(e.target.value) : e.target.value });

    return (
        <form
            className="grid gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(form);
            }}
        >
            <Card className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Tipologia Evento" required>
                        <Input
                            value={form.tipologiaEvento}
                            onChange={handle("tipologiaEvento")}
                            placeholder="Es. allagamenti, frana, vento forte…"
                            required
                        />
                    </Field>

                    <Field label="Nuovo evento">
                        <Badge>Creazione</Badge>
                    </Field>

                    <Field
                        label="Comuni interessati"
                        hint="Separa con virgole. (Suggerimento: usa una Combobox multi-selezione con virtualizzazione)"
                    >
                        <Textarea
                            value={form.comuni}
                            onChange={handle("comuni")}
                            placeholder="Es. Abano Terme, Adria, Rovigo…"
                        />
                    </Field>

                    <Field label="Persona di contatto">
                        <Input
                            value={form.contatto}
                            onChange={handle("contatto")}
                            placeholder="Nome e recapito"
                        />
                    </Field>
                </div>

                <Field label="Note (descrizione evento)">
                    <Textarea
                        value={form.note}
                        onChange={handle("note")}
                        placeholder="Eventuali note descrittive dell'evento. Non usare per aggiornamenti operativi."
                    />
                </Field>
            </Card>

            <Card className="p-4">
                <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Effetti sul territorio
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Tipologia abitato">
                        <Input
                            value={form.tipologiaAbitato}
                            onChange={handle("tipologiaAbitato")}
                            placeholder="Sparso, urbano, montano…"
                        />
                    </Field>
                    <Field label="Estensione territoriale">
                        <Input
                            value={form.estensione}
                            onChange={handle("estensione")}
                            placeholder="Es. lineare 2km, areale 3km²…"
                        />
                    </Field>
                    <Field label="Popolazione coinvolta">
                        <Input
                            value={form.popolazioneCoinvolta}
                            onChange={handle("popolazioneCoinvolta")}
                            placeholder="Stima persone/utenti"
                        />
                    </Field>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Field label="Deceduti">
                        <Input type="number" min={0} value={form.deceduti} onChange={handle("deceduti")} />
                    </Field>
                    <Field label="Feriti">
                        <Input type="number" min={0} value={form.feriti} onChange={handle("feriti")} />
                    </Field>
                    <Field label="Popolazione isolata (n.)">
                        <Input type="number" min={0} value={form.isolati} onChange={handle("isolati")} />
                    </Field>
                    <Field label="Note isolati">
                        <Input
                            value={form.noteIsolati}
                            onChange={handle("noteIsolati")}
                            placeholder="Eventuali necessità"
                        />
                    </Field>
                    <Field label="Popolazione evacuata (n.)">
                        <Input type="number" min={0} value={form.evacuati} onChange={handle("evacuati")} />
                    </Field>
                    <Field label="Note evacuati">
                        <Input
                            value={form.noteEvacuati}
                            onChange={handle("noteEvacuati")}
                            placeholder="Sistemazione attuale"
                        />
                    </Field>
                </div>
            </Card>

            <Card className="p-4">
                <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Infrastrutture e servizi
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Energia elettrica (problematiche)">
                        <Input value={form.energia} onChange={handle("energia")} />
                    </Field>
                    <Field label="Note energia">
                        <Input value={form.noteEnergia} onChange={handle("noteEnergia")} />
                    </Field>

                    <Field label="Acqua potabile (problematiche)">
                        <Input value={form.acqua} onChange={handle("acqua")} />
                    </Field>
                    <Field label="Note acqua">
                        <Input value={form.noteAcqua} onChange={handle("noteAcqua")} />
                    </Field>

                    <Field label="Telecomunicazioni (problematiche)">
                        <Input value={form.tlc} onChange={handle("tlc")} />
                    </Field>
                    <Field label="Note telecomunicazioni">
                        <Input value={form.noteTlc} onChange={handle("noteTlc")} />
                    </Field>

                    <Field label="Viabilità locale (problematiche)">
                        <Input value={form.viabilitaLocale} onChange={handle("viabilitaLocale")} />
                    </Field>
                    <Field label="Note viabilità locale">
                        <Input value={form.noteViabilitaLocale} onChange={handle("noteViabilitaLocale")} />
                    </Field>

                    <Field label="Accessibilità stradale (problematiche)">
                        <Input value={form.accessibilita} onChange={handle("accessibilita")} />
                    </Field>
                    <Field label="Note vie d'accesso">
                        <Input value={form.noteAccesso} onChange={handle("noteAccesso")} />
                    </Field>
                </div>
            </Card>

            <Field label="Ulteriori notizie utili">
                <Textarea
                    value={form.noteFinali}
                    onChange={handle("noteFinali")}
                    placeholder="Note conclusive"
                />
            </Field>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" className="min-w-40">
                    Salva segnalazione
                </Button>
            </div>
        </form>
    );
}

/* ------------------------------- Filters bar ------------------------------- */
function FiltersBar({ actions }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {actions}
    </div>
  );
}



function RowActions() {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Apri dettagli"
            aria-label="Apri dettagli"
        >
            <FileText className="h-4 w-4" />
        </Button>
    );
}


/* --------------------------------- Table ---------------------------------- */
function DataTable() {
  const [query, setQuery] = useState("");
  const [modalSintesiOpen, setModalSintesiOpen] = useState(false);
  const [modalSintesiContent, setModalSintesiContent] = useState("");

  // filtri
  const [tipoFilter, setTipoFilter] = useState("ALL"); // ALL | E | U
  const [timeFilter, setTimeFilter] = useState("24");  // "1"|"6"|"24"|"48"|"ALL"

  // Parser dd/mm/yyyy hh:mm (ignora il testo tra parentesi)
  const parseItalianDate = (s) => {
    const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/);
    if (!m) return null;
    const [, dd, mm, yyyy, HH, MM] = m;
    return new Date(+yyyy, +mm - 1, +dd, +HH, +MM);
  };

  const now = new Date();

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (tipoFilter !== "ALL" && r.tipo !== tipoFilter) return false;

      if (timeFilter !== "ALL") {
        const limHours = Number(timeFilter);
        const ts = parseItalianDate(r.datetime);
        if (!ts) return false;
        const diffHours = (now - ts) / 36e5;
        if (diffHours > limHours) return false;
      }

      if (query) {
        const q = query.toLowerCase();
        const hay = [r.datetime, r.tipo, r.ente, r.comune, r.sintesi, r.operatore]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [query, tipoFilter, timeFilter, now]);

  const truncate = (text, length = 64) =>
    text?.length > length ? text.slice(0, length) + "…" : text;

  return (
    <>
      <Card>
        <div className="border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Gestione segnalazioni o telefonate
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Elenco aggiornato delle comunicazioni con sintesi operativa.
              </p>
            </div>

            {/* Bottoni in alto */}
            <FiltersBar
              actions={
                <>
                  <TelefonataButton />
                  <SegnalazioneButton />
                </>
              }
            />

            {/* 🔻 SEARCH INLINE COI FILTRI (sotto i bottoni) */}
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              {/* Cerca (occupazione più larga) */}
              <div className="md:col-span-2 lg:col-span-3">
                <Field label="Cerca">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      className="pl-9"
                      placeholder="Ente, comune, operatore, testo…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </Field>
              </div>

              <Field label="Tipo">
                <Select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
                  <option value="ALL">Tutti</option>
                  <option value="E">Entrata</option>
                  <option value="U">Uscita</option>
                </Select>
              </Field>

              <Field label="Intervallo (ore)">
                <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                  <option value="1">Ultima 1h</option>
                  <option value="6">Ultime 6h</option>
                  <option value="24">Ultime 24h</option>
                  <option value="48">Ultime 48h</option>
                  <option value="ALL">Tutto</option>
                </Select>
              </Field>

              {/* Reset */}
              <div className="flex items-end">
                <Button
                  variant="subtle"
                  className="w-full"
                  onClick={() => {
                    setQuery("");
                    setTipoFilter("ALL");
                    setTimeFilter("24");
                  }}
                >
                  Reimposta filtri
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabella */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[220px]" />
              <col className="w-[64px]" />
              <col className="w-[260px]" />
              <col className="w-[220px]" />
              <col className="w-[520px]" />
              <col className="w-[160px]" />
              <col className="w-[80px]" />
            </colgroup>

            <thead className="bg-slate-50 text-left dark:bg-slate-900/30">
              <tr>
                {["Data e ora", "E/U", "Ente", "Comune", "Sintesi", "Operatore", "Azioni"].map(
                  (h) => (
                    <th key={h} className="px-3 py-2 text-slate-700 dark:text-slate-300">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/40"
                >
                  <td className="px-3 py-3 align-top">
                    <div className="flex items-start gap-2">
                      <CalendarClock className="mt-1 h-4 w-4 shrink-0" />
                      <span className="break-words text-slate-800 dark:text-slate-200">
                        {r.datetime}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                        r.tipo === "E"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                          : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                      )}
                      title={r.tipo === "E" ? "Entrata" : "Uscita"}
                    >
                      {r.tipo}
                    </span>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <div className="flex items-start gap-2">
                      <Users className="mt-1 h-4 w-4 shrink-0" />
                      <span className="break-words text-slate-800 dark:text-slate-200">
                        {r.ente}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4 shrink-0" />
                      <span className="break-words text-slate-800 dark:text-slate-200">
                        {r.comune}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <p className="break-words text-slate-800 dark:text-slate-200">
                      {truncate(r.sintesi, 64)}
                      {r.sintesi?.length > 64 && (
                        <button
                          onClick={() => {
                            setModalSintesiContent(r.sintesi);
                            setModalSintesiOpen(true);
                          }}
                          className="ml-1 inline-block text-xs underline text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Mostra di più
                        </button>
                      )}
                    </p>
                  </td>

                  <td className="px-3 py-3 align-top capitalize text-slate-800 dark:text-slate-200">
                    {r.operatore}
                  </td>

                  <td className="px-3 py-3 align-top text-right">
                    <RowActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ModalSintesi
        open={modalSintesiOpen}
        onClose={() => setModalSintesiOpen(false)}
        content={modalSintesiContent}
      />
    </>
  );
}



/* -------------------------- Buttons + relative modali -------------------------- */
function TelefonataButton() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                <Phone className="mr-1.5 h-4 w-4" />
                Telefonata generica
            </Button>
            <ModalShell
                open={open}
                onClose={() => setOpen(false)}
                title="Registrazione nuova telefonata"
            >
                <FormTelefonata
                    onSubmit={(data) => {
                        console.log("Telefonata salvata:", data);
                        setOpen(false);
                    }}
                />
            </ModalShell>
        </>
    );
}

function SegnalazioneButton() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-1.5 h-4 w-4" />
                Nuovo evento
            </Button>
            <ModalShell
                open={open}
                onClose={() => setOpen(false)}
                title="Segnalazione generica (Nuovo evento)"
            >
                <FormSegnalazione
                    onSubmit={(data) => {
                        console.log("Segnalazione salvata:", data);
                        setOpen(false);
                    }}
                />
            </ModalShell>
        </>
    );
}

/* --------------------------------- Page ---------------------------------- */
export default function Dashboard() {
    return (
        <PageShell title="Dashboard">
            {/* KPI cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Segnalazioni oggi</p>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">32</div>
                        <Badge className="bg-slate-100 dark:bg-slate-800">+12%</Badge>
                    </div>
                </Card>

                <Card className="p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Eventi attivi</p>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">7</div>
                        <Badge>COC 1</Badge>
                    </div>
                </Card>

                <Card className="p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Squadre operative</p>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">15</div>
                        <Badge className="bg-slate-100 dark:bg-slate-800">VVF + PC</Badge>
                    </div>
                </Card>

                <Card className="p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ultimo aggiornamento</p>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">5 min</div>
                        <Badge>Real-time</Badge>
                    </div>
                </Card>
            </div>

            <DataTable />
        </PageShell>
    );
}
