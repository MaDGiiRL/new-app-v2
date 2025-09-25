import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PageShell from "../../components/_PageShell";
import {
  Plus,
  Phone,
  Search,
  Users,
  MapPin,
  CalendarClock,
  FileText,
  X,
  PhoneCall,
  Building2,
  Filter,
  Info,
  BadgeInfo,
  Tag,
  User,
  RefreshCw,
  Activity,
  Radio,
  BellRing,
  Clock4,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

/* ---------------------------------- Mocks ---------------------------------- */
const rows = [
  {
    id: "1",
    datetime: "25/09/2025 12:05 (30 minuti trascorsi)",
    tipo: "E",
    ente: "Protezione Civile – Sala Operativa Regionale",
    comune: "Comune di Rovigo",
    sintesi:
      "Richiesta aggiornamento quadro eventi meteo in atto. Nessuna nuova criticità segnalata nell'ultima ora.",
    operatore: "marta veronesi",
  },
  {
    id: "2",
    datetime: "25/09/2025 11:42 (53 minuti trascorsi)",
    tipo: "U",
    ente: "Comune di Adria – COC",
    comune: "Comune di Adria",
    sintesi:
      "Invio riepilogo interventi notturni a cura volontariato locale. Monitoraggio fossi periferici ancora in corso.",
    operatore: "emanuele barone",
  },
  {
    id: "3",
    datetime: "25/09/2025 11:10 (1 ora trascorsa)",
    tipo: "E",
    ente: "Vigili del Fuoco – Comando Rovigo",
    comune: "Comune di Lendinara",
    sintesi:
      "Segnalati allagamenti localizzati in via Roma; squadre operative sul posto, richiesto supporto sacchetti di sabbia.",
    operatore: "nicola zennaro",
  },
  {
    id: "4",
    datetime: "25/09/2025 10:55 (1 ora 10 minuti trascorsi)",
    tipo: "U",
    ente: "Provincia di Rovigo",
    comune: "Comune di Rovigo",
    sintesi:
      "Aggiornamento viabilità: chiusura temporanea sottopasso SP45 per accumulo acqua, deviazioni attive.",
    operatore: "sofia vidotto",
  },
  {
    id: "5",
    datetime: "25/09/2025 10:20 (1 ora 45 minuti trascorsi)",
    tipo: "E",
    ente: "Consorzio di Bonifica Adige Po",
    comune: "Comune di Polesella",
    sintesi:
      "Portate in aumento ma sotto soglia; pronti ad apertura paratoie se necessario. Prossimo punto ore 13.",
    operatore: "federico costa",
  },
  {
    id: "6",
    datetime: "25/09/2025 09:58 (2 ore 7 minuti trascorsi)",
    tipo: "U",
    ente: "ULSS 5 Polesana",
    comune: "Comune di Rovigo",
    sintesi:
      "Confermato ripristino linea elettrica presso ambulatorio decentrato. Nessuna ulteriore esigenza.",
    operatore: "chiara zanetti",
  },
  {
    id: "7",
    datetime: "25/09/2025 09:15 (2 ore 50 minuti trascorsi)",
    tipo: "E",
    ente: "Comune di Porto Viro",
    comune: "Comune di Porto Viro",
    sintesi:
      "Richiesta di 200 sacchi e 1 pallet di sale per criticità fognaria zona industriale. In attesa istruzioni.",
    operatore: "marta veronesi",
  },
  {
    id: "8",
    datetime: "25/09/2025 08:40 (3 ore 25 minuti trascorsi)",
    tipo: "U",
    ente: "Ente gestore TLC",
    comune: "Comune di Taglio di Po",
    sintesi:
      "Intervento tecnico programmato su BTS; possibili temporanei disservizi rete mobile tra le 10:00 e le 12:00.",
    operatore: "emanuele barone",
  },
  {
    id: "9",
    datetime: "25/09/2025 08:05 (4 ore trascorse)",
    tipo: "E",
    ente: "Comune di Villadose",
    comune: "Comune di Villadose",
    sintesi:
      "Segnalato ristagno in via Garibaldi; verifica in corso con pattuglia di Protezione Civile comunale.",
    operatore: "nicola zennaro",
  },
  {
    id: "10",
    datetime: "25/09/2025 07:20 (4 ore 45 minuti trascorsi)",
    tipo: "U",
    ente: "Gestore idrico Acquevenete",
    comune: "Comune di Rovigo",
    sintesi:
      "Aggiornamento rete: pressione normalizzata nella zona ovest, rientrate le anomalie notturne.",
    operatore: "federico costa",
  },

  // Ieri
  {
    id: "11",
    datetime: "24/09/2025 22:55 (13 ore trascorse)",
    tipo: "E",
    ente: "Comune di Badia Polesine",
    comune: "Comune di Badia Polesine",
    sintesi:
      "Richiesta contatto con VVF per coordinamento interventi in area artigianale. Presidio volontari attivo.",
    operatore: "chiara zanetti",
  },
  {
    id: "12",
    datetime: "24/09/2025 21:40 (14 ore 25 minuti trascorse)",
    tipo: "U",
    ente: "Vigili del Fuoco - Comando Rovigo",
    comune: "Comune di Badia Polesine",
    sintesi:
      "Resp. coordinamento operazioni (Vangelista) – possibili ulteriori 20 interventi.",
    operatore: "nicola zennaro",
  },
  {
    id: "13",
    datetime: "24/09/2025 20:30 (15 ore 35 minuti trascorse)",
    tipo: "E",
    ente: "Comune di Lusia",
    comune: "Comune di Lusia",
    sintesi:
      "Allagamento cantine in via Argine; famiglie informate. Non richiesto al momento supporto logistico.",
    operatore: "sofia vidotto",
  },
  {
    id: "14",
    datetime: "24/09/2025 19:15 (16 ore 50 minuti trascorse)",
    tipo: "U",
    ente: "Comune di Papozze",
    comune: "Comune di Papozze",
    sintesi:
      "Invio foto georeferenziate argine secondario; monitoraggio h24 avviato con turnazione volontari.",
    operatore: "emanuele barone",
  },
  {
    id: "15",
    datetime: "24/09/2025 18:02 (18 ore 3 minuti trascorsi)",
    tipo: "E",
    ente: "Gestore viabilità ANAS",
    comune: "Comune di Rovigo",
    sintesi:
      "Sottopasso SS16 transitabile con prudenza; attivata segnaletica temporanea.",
    operatore: "marta veronesi",
  },
  {
    id: "16",
    datetime: "24/09/2025 16:48 (19 ore 17 minuti trascorsi)",
    tipo: "U",
    ente: "Comune di Occhiobello",
    comune: "Comune di Occhiobello",
    sintesi:
      "Comunicazione preallerta COC livello 1 a scopo precauzionale. Nessun danno registrato.",
    operatore: "federico costa",
  },
  {
    id: "17",
    datetime: "24/09/2025 15:36 (20 ore 29 minuti trascorsi)",
    tipo: "E",
    ente: "Consorzio di Bonifica Adige Po",
    comune: "Provincia di Rovigo",
    sintesi:
      "Invio grafici livello canali secondari; trend in lieve calo nelle ultime 2 ore.",
    operatore: "chiara zanetti",
  },
  {
    id: "18",
    datetime: "24/09/2025 14:22 (21 ore 43 minuti trascorsi)",
    tipo: "U",
    ente: "Regione Veneto – CFMR",
    comune: "Area Polesine",
    sintesi:
      "Bollettino meteo di aggiornamento: precipitazioni residue nel pomeriggio, miglioramento serale.",
    operatore: "nicola zennaro",
  },
  {
    id: "19",
    datetime: "24/09/2025 13:10 (22 ore 55 minuti trascorsi)",
    tipo: "E",
    ente: "Comune di Rosolina",
    comune: "Comune di Rosolina",
    sintesi:
      "Segnalata mareggiata lieve, nessun danno a infrastrutture. Sorveglianza sulle dune litoranee.",
    operatore: "sofia vidotto",
  },
  {
    id: "20",
    datetime: "24/09/2025 12:34 (23 ore 31 minuti trascorsi)",
    tipo: "U",
    ente: "Comune di Badia Polesine",
    comune: "Comune di Badia Polesine",
    sintesi:
      "Monica Gambardella 3481534524 – Aggiornamenti dal COC attivato. Problemi di scarico acqua in eccesso; interventi in rientro.",
    operatore: "emanuele barone",
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
    "inline-flex items-center justify-center rounded-xl font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " +
    "disabled:opacity-60 disabled:pointer-events-none";
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

function BadgePill({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
        "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200",
        className
      )}
    >
      {children}
    </span>
  );
}

function Field({ label, hint, required, icon: Icon, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
        {Icon && (
          <Icon
            className="h-4 w-4 text-slate-500 dark:text-slate-400"
            aria-hidden
          />
        )}
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
      {hint && (
        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Info className="h-3.5 w-3.5" aria-hidden /> {hint}
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
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
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
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",
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
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
        props.className
      )}
    />
  );
}

/* --------------------------------- Modals ---------------------------------- */
function ModalShell({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[100000]">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} aria-hidden />
      <div
        className="fixed inset-0 z-[100001] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
      >
        <Card className="relative w-full max-w-3xl p-6">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            <BadgeInfo className="h-5 w-5 text-blue-500" aria-hidden />
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
        <Field label="Tel in Entrata/Uscita" required icon={Phone}>
          <select
            value={form.direzione}
            onChange={handle("direzione")}
            className="h-10 w-full rounded-xl border border-slate-300 bg-white/90 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/70"
          >
            <option>Entrata</option>
            <option>Uscita</option>
          </select>
        </Field>

        <Field label="Interlocutore" required icon={User}>
          <Input
            value={form.interlocutore}
            onChange={handle("interlocutore")}
            placeholder="Nome / ruolo / ente"
            required
          />
        </Field>

        <Field label="Recapito telefonico" icon={Phone}>
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
          icon={MapPin}
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
        icon={FileText}
      >
        <Textarea value={form.sintesi} onChange={handle("sintesi")} required />
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" className="min-w-32">
          <Phone className="mr-1.5 h-4 w-4" aria-hidden />
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
    setForm({
      ...form,
      [k]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });

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
          <Field label="Tipologia Evento" required icon={Tag}>
            <Input
              value={form.tipologiaEvento}
              onChange={handle("tipologiaEvento")}
              placeholder="Es. allagamenti, frana, vento forte…"
              required
            />
          </Field>

          <Field label="Nuovo evento" icon={BadgeInfo}>
            <BadgePill>
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Creazione
            </BadgePill>
          </Field>

          <Field
            label="Comuni interessati"
            hint="Separa con virgole. (Suggerimento: usa una Combobox multi-selezione con virtualizzazione)"
            icon={Building2}
          >
            <Textarea
              value={form.comuni}
              onChange={handle("comuni")}
              placeholder="Es. Abano Terme, Adria, Rovigo…"
            />
          </Field>

          <Field label="Persona di contatto" icon={User}>
            <Input
              value={form.contatto}
              onChange={handle("contatto")}
              placeholder="Nome e recapito"
            />
          </Field>
        </div>

        <Field label="Note (descrizione evento)" icon={FileText}>
          <Textarea
            value={form.note}
            onChange={handle("note")}
            placeholder="Eventuali note descrittive dell'evento. Non usare per aggiornamenti operativi."
          />
        </Field>
      </Card>

      <Card className="p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <Activity className="h-4 w-4 text-blue-500" aria-hidden />
          Effetti sul territorio
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field label="Tipologia abitato" icon={Tag}>
            <Input
              value={form.tipologiaAbitato}
              onChange={handle("tipologiaAbitato")}
              placeholder="Sparso, urbano, montano…"
            />
          </Field>
          <Field label="Estensione territoriale" icon={Radio}>
            <Input
              value={form.estensione}
              onChange={handle("estensione")}
              placeholder="Es. lineare 2km, areale 3km²…"
            />
          </Field>
          <Field label="Popolazione coinvolta" icon={Users}>
            <Input
              value={form.popolazioneCoinvolta}
              onChange={handle("popolazioneCoinvolta")}
              placeholder="Stima persone/utenti"
            />
          </Field>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field label="Deceduti" icon={BadgeInfo}>
            <Input
              type="number"
              min={0}
              value={form.deceduti}
              onChange={handle("deceduti")}
            />
          </Field>
          <Field label="Feriti" icon={BadgeInfo}>
            <Input
              type="number"
              min={0}
              value={form.feriti}
              onChange={handle("feriti")}
            />
          </Field>
          <Field label="Popolazione isolata (n.)" icon={BadgeInfo}>
            <Input
              type="number"
              min={0}
              value={form.isolati}
              onChange={handle("isolati")}
            />
          </Field>
          <Field label="Note isolati" icon={FileText}>
            <Input
              value={form.noteIsolati}
              onChange={handle("noteIsolati")}
              placeholder="Eventuali necessità"
            />
          </Field>
          <Field label="Popolazione evacuata (n.)" icon={BadgeInfo}>
            <Input
              type="number"
              min={0}
              value={form.evacuati}
              onChange={handle("evacuati")}
            />
          </Field>
          <Field label="Note evacuati" icon={FileText}>
            <Input
              value={form.noteEvacuati}
              onChange={handle("noteEvacuati")}
              placeholder="Sistemazione attuale"
            />
          </Field>
        </div>
      </Card>

      <Card className="p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <BellRing className="h-4 w-4 text-blue-500" aria-hidden />
          Infrastrutture e servizi
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Energia elettrica (problematiche)" icon={Tag}>
            <Input value={form.energia} onChange={handle("energia")} />
          </Field>
          <Field label="Note energia" icon={FileText}>
            <Input value={form.noteEnergia} onChange={handle("noteEnergia")} />
          </Field>

          <Field label="Acqua potabile (problematiche)" icon={Tag}>
            <Input value={form.acqua} onChange={handle("acqua")} />
          </Field>
          <Field label="Note acqua" icon={FileText}>
            <Input value={form.noteAcqua} onChange={handle("noteAcqua")} />
          </Field>

          <Field label="Telecomunicazioni (problematiche)" icon={Tag}>
            <Input value={form.tlc} onChange={handle("tlc")} />
          </Field>
          <Field label="Note telecomunicazioni" icon={FileText}>
            <Input value={form.noteTlc} onChange={handle("noteTlc")} />
          </Field>

          <Field label="Viabilità locale (problematiche)" icon={Tag}>
            <Input
              value={form.viabilitaLocale}
              onChange={handle("viabilitaLocale")}
            />
          </Field>
          <Field label="Note viabilità locale" icon={FileText}>
            <Input
              value={form.noteViabilitaLocale}
              onChange={handle("noteViabilitaLocale")}
            />
          </Field>

          <Field label="Accessibilità stradale (problematiche)" icon={Tag}>
            <Input
              value={form.accessibilita}
              onChange={handle("accessibilita")}
            />
          </Field>
          <Field label="Note vie d'accesso" icon={FileText}>
            <Input
              value={form.noteAccesso}
              onChange={handle("noteAccesso")}
            />
          </Field>
        </div>
      </Card>

      <Field label="Ulteriori notizie utili" icon={FileText}>
        <Textarea
          value={form.noteFinali}
          onChange={handle("noteFinali")}
          placeholder="Note conclusive"
        />
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" className="min-w-40">
          <FileText className="mr-1.5 h-4 w-4" aria-hidden />
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
      <div className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
        <Filter className="h-4 w-4" aria-hidden /> Filtri rapidi
      </div>
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

  const [tipoFilter, setTipoFilter] = useState("ALL"); // ALL | E | U
  const [timeFilter, setTimeFilter] = useState("24"); // "1"|"6"|"24"|"48"|"ALL"

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
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                <Radio className="h-5 w-5 text-blue-500" aria-hidden />
                Gestione segnalazioni o telefonate
              </h2>
              <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <Info className="h-4 w-4" aria-hidden />
                Elenco aggiornato delle comunicazioni con sintesi operativa.
              </p>
            </div>

            {/* Bottoni in alto */}
            <FiltersBar
              actions={
                <div className="flex gap-2">
                  <TelefonataButton />
                  <SegnalazioneButton />
                </div>
              }
            />

            {/* Search + filtri */}
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              <div className="md:col-span-2 lg:col-span-3">
                <Field label="Cerca" icon={Search}>
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

              <Field label="Tipo" icon={Tag}>
                <Select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
                  <option value="ALL">Tutti</option>
                  <option value="E">Entrata</option>
                  <option value="U">Uscita</option>
                </Select>
              </Field>

              <Field label="Intervallo (ore)" icon={Clock4}>
                <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                  <option value="1">Ultima 1h</option>
                  <option value="6">Ultime 6h</option>
                  <option value="24">Ultime 24h</option>
                  <option value="48">Ultime 48h</option>
                  <option value="ALL">Tutto</option>
                </Select>
              </Field>

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
                  <RefreshCw className="mr-1.5 h-4 w-4" aria-hidden />
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
              <col className="w-[90px]" />
              <col className="w-[260px]" />
              <col className="w-[220px]" />
              <col className="w-[520px]" />
              <col className="w-[160px]" />
              <col className="w-[80px]" />
            </colgroup>

            <thead className="bg-slate-50 text-left dark:bg-slate-900/30">
              <tr>
                {[
                  { h: "Data e ora", I: CalendarClock },
                  { h: "E/U", I: null },
                  { h: "Ente", I: Building2 },
                  { h: "Comune", I: MapPin },
                  { h: "Sintesi", I: FileText },
                  { h: "Operatore", I: User },
                  { h: "Azioni", I: BadgeInfo },
                ].map(({ h, I }) => (
                  <th key={h} className="px-3 py-2 text-slate-700 dark:text-slate-300">
                    {h === "E/U" ? (
                      <span className="inline-flex items-center gap-1.5">
                        {/* E/U */}
                        <PhoneCall className="h-4 w-4" /> E/U
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        {I && <I className="h-4 w-4" aria-hidden />} {h}
                      </span>
                    )}
                  </th>
                ))}
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
                        "inline-flex items-center gap-1 h-6 px-2 rounded-full text-xs font-semibold",
                        r.tipo === "E"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                          : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                      )}
                      title={r.tipo === "E" ? "Entrata" : "Uscita"}
                    >
                      {r.tipo === "E" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
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
                          className="ml-1 inline-flex items-center gap-1 text-xs underline decoration-blue-600 underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                          <FileText className="h-3.5 w-3.5" aria-hidden />
                          Mostra di più
                        </button>
                      )}
                    </p>
                  </td>

                  <td className="px-3 py-3 align-top capitalize text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center gap-2">
                      <User className="h-4 w-4" aria-hidden />
                      {r.operatore}
                    </span>
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
      <Button variant="outline" onClick={() => setOpen(true)} aria-label="Apri form telefonata">
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
      <Button onClick={() => setOpen(true)} aria-label="Apri form segnalazione">
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
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <BellRing className="h-4 w-4" aria-hidden /> Segnalazioni oggi
          </p>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-slate-900 dark:text-slate-100">32</span>
              <BadgePill className="bg-slate-100 dark:bg-slate-800">
                <Tag className="h-3.5 w-3.5" aria-hidden /> +12%
              </BadgePill>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Activity className="h-4 w-4" aria-hidden /> Eventi attivi
          </p>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">7</div>
            <BadgePill>
              <Building2 className="h-3.5 w-3.5" aria-hidden /> COC 1
            </BadgePill>
          </div>
        </Card>

        <Card className="p-4">
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Users className="h-4 w-4" aria-hidden /> Squadre operative
          </p>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">15</div>
            <BadgePill className="bg-slate-100 dark:bg-slate-800">
              <Radio className="h-3.5 w-3.5" aria-hidden /> VVF + PC
            </BadgePill>
          </div>
        </Card>

        <Card className="p-4">
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Clock4 className="h-4 w-4" aria-hidden /> Ultimo aggiornamento
          </p>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">5 min</div>
            <BadgePill>
              <Radio className="h-3.5 w-3.5" aria-hidden /> Real-time
            </BadgePill>
          </div>
        </Card>
      </div>

      <DataTable />
    </PageShell>
  );
}
