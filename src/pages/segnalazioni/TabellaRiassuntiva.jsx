import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PageShell from "../../components/_PageShell";
import {
  Search,
  PencilLine,
  Building2,
  MapPin,
  CalendarClock,
  Users,
  Phone,
  Smartphone,
  Inbox,
  Mail,
  Printer,
  Info,
  X,
  ExternalLink,
  Archive,
  Trash2,
  BadgeInfo,
  AlertCircle,
  Hash,
} from "lucide-react";

/* ------------------------------ UI primitives ------------------------------ */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
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
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    slate:
      "bg-slate-600 text-white hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-700",
  };
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}

function ButtonIcon({ title, onClick, children }) {
  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
        {Icon && <Icon className="h-4 w-4" />} {label}
      </span>
      {children}
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

function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-100",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------- Modal ---------------------------------- */
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
        <Card className="relative w-full max-w-5xl p-6">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            <BadgeInfo className="h-5 w-5 text-blue-500" />
            {title}
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Gestisci stato COC, eventi attivi, comunicazioni e recapiti del
            comune selezionato.
          </p>
          <div className="max-h-[70vh] overflow-auto pr-1">{children}</div>
          {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
        </Card>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------ Mocked content ----------------------------- */
const ROWS = [
  {
    comune: "Comune di Affi",
    stato: "chiusa dal 09/06/25",
    fase: "assenza allerta dal 17/06/25",
    attivazioni: "",
  },
  {
    comune: "Comune di Albaredo d'Adige",
    stato: "chiusa dal 11/09/25",
    fase: "assenza allerta dal 20/05/24",
    attivazioni: "",
  },
  {
    comune: "Comune di Angiari",
    stato: "chiusa dal 19/05/25",
    fase: "assenza allerta dal 14/05/25",
    attivazioni: "",
  },
  {
    comune: "Comune di Arcole",
    stato: "chiusa dal 28/02/24",
    fase: "assenza allerta dal 28/02/24",
    attivazioni: "",
  },
  {
    comune: "Comune di Badia Calavena",
    stato: "chiusa dal 08/09/24",
    fase: "assenza allerta dal 03/10/24",
    attivazioni: "",
  },
  {
    comune: "Comune di Bardolino",
    stato: "chiusa dal 25/08/25",
    fase: "assenza allerta dal 02/08/25",
    attivazioni: "",
  },
  {
    comune: "Comune di Belfiore",
    stato: "chiusa dal 17/05/24",
    fase: "assenza allerta dal 24/05/18",
    attivazioni: "",
  },
  {
    comune: "Comune di Bevilacqua",
    stato: "chiusa dal 08/09/24",
    fase: "assenza allerta dal 03/10/24",
    attivazioni: "",
  },
  {
    comune: "Comune di Bonavigo",
    stato: "chiusa dal 24/05/18",
    fase: "assenza allerta dal 24/05/18",
    attivazioni: "",
  },
  {
    comune: "Comune di Boschi Sant'Anna",
    stato: "chiusa dal 08/09/24",
    fase: "assenza allerta dal 24/05/18",
    attivazioni: "",
  },
];

const RECENT_CALLS = [
  {
    ts: "25/09/2025 09:31",
    sintesi:
      "Provincia di Verona – grandinate in Valpolicella; Bussolengo e comuni verso il Garda. Verona città non interessata.",
    operatore: "emanuele barone",
  },
  {
    ts: "25/09/2025 05:59",
    sintesi:
      "DPC – richiesta informazioni meteo notturno. Riferita grandinata a Valdobbiadene.",
    operatore: "alberto favero",
  },
];

const RECAPITI_AFFI = [
  {
    tipo: "Cellulare",
    recapito: "3284174015",
    referente: "Sega Marco Giacomo",
    note: "SINDACO - Dato fornito da CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Cellulare",
    recapito: "3382224626",
    referente: "Pezzo Ferdinando",
    note: "Dato fornito da CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Cellulare",
    recapito: "3482443293",
    referente: "Ramon Stefano",
    note: "Dato fornito da CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Telefono",
    recapito: "0456267472",
    referente: "Pezzo Ferdinando",
    note: "Dato fornito da CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Telefono",
    recapito: "0457235042",
    referente: "Residori Ennio",
    note: "Responsabile settore Lavori Pubblici e Patrimonio - Dato CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Posta Certificata",
    recapito: "protocollo@pec.comune.affi.vr.it",
    referente: "",
    note: "Dato fornito da CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Posta Elettronica",
    recapito: "sindaco@comune.affi.vr.it",
    referente: "Sega Marco Giacomo",
    note: "SINDACO - Dato fornito da CFD",
    update: "09/06/2024",
  },
  {
    tipo: "Fax",
    recapito: "0456260473",
    referente: "",
    note: "",
    update: "",
  },
];

/* ------------------------------ Icon helpers ------------------------------- */
function iconForTipo(tipo) {
  const t = (tipo || "").toLowerCase();
  if (t.includes("cell")) return <Smartphone className="h-4 w-4" />;
  if (t === "telefono") return <Phone className="h-4 w-4" />;
  if (t.includes("posta certificata") || t.includes("pec"))
    return <Inbox className="h-4 w-4" />;
  if (t.includes("posta elettronica") || t.includes("email") || t.includes("@"))
    return <Mail className="h-4 w-4" />;
  if (t === "fax" || t.includes("fax")) return <Printer className="h-4 w-4" />;
  return <Info className="h-4 w-4" />;
}

/* --------------------------- Comune detail modal --------------------------- */
function ComuneModal({ open, onClose, comune, stato, fase }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={`Gestione segnalazioni ${comune}`}
      footer={
        <>
          <Button variant="slate" onClick={onClose}>
            Chiudi
          </Button>
        </>
      }
    >
      {/* Stato sintetico */}
      <Card className="mb-4 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Situazione COC
            </p>
            <Badge className="bg-slate-100 dark:bg-slate-800">
              <Building2 className="h-4 w-4" />
              {stato?.split(" dal ")[0] || "-"}
            </Badge>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <CalendarClock className="h-4 w-4" />
              {stato?.split(" dal ")[1] ? stato.split(" dal ")[1] : "-"}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              Fase operativa
            </p>
            <Badge className="bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200">
              <AlertCircle className="h-4 w-4" />
              {fase?.split(" dal ")[0] || "-"}
            </Badge>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <CalendarClock className="h-4 w-4" />
              {fase?.split(" dal ")[1] ? fase.split(" dal ")[1] : "-"}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 md:w-2/3">
          <Card className="p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sq. vol. operative
            </p>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5 text-blue-500" /> 0
            </div>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sq. vol. in attivazione
            </p>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
              <Users className="h-5 w-5 text-amber-500" /> 0
            </div>
          </Card>
        </div>
      </Card>

      {/* Eventi attivi */}
      <Card className="mb-4 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <BadgeInfo className="h-4 w-4 text-blue-500" />
          Eventi attivi sul territorio
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Nessun evento attivo registrato per questo comune.
        </p>
      </Card>

      {/* Comunicazioni ultime 48 ore */}
      <Card className="mb-4 p-4">
        <h4 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <Phone className="h-4 w-4 text-blue-500" />
          Comunicazioni telefoniche generiche intercorse (ultime 48 ore)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/40">
              <tr>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> Data e ora
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Info className="h-4 w-4" /> Sintesi
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> Operatore
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Hash className="h-4 w-4" /> Azioni
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {RECENT_CALLS.map((c, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-200 dark:border-slate-800"
                >
                  <td className="px-3 py-2 align-top">{c.ts}</td>
                  <td className="px-3 py-2 align-top">{c.sintesi}</td>
                  <td className="px-3 py-2 align-top capitalize">
                    {c.operatore}
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex gap-1">
                      <Button variant="subtle" size="sm" title="Archivia">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="danger" size="sm" title="Elimina">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {RECENT_CALLS.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-3 text-slate-500">
                    Nessuna comunicazione nelle ultime 48 ore.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recapiti del Comune */}
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            <MapPin className="h-4 w-4 text-blue-500" />
            Recapiti del Comune
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=${encodeURIComponent(comune)}`,
                "_blank"
              )
            }
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Cerca su Google
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/40">
              <tr>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Info className="h-4 w-4" /> Tipo recapito
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-4 w-4" /> Recapito
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> Referente
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeInfo className="h-4 w-4" /> Note
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> Aggiornamento
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {RECAPITI_AFFI.map((r, i) => (
                <tr
                  key={i}
                  className="border-top border-slate-200 dark:border-slate-800"
                >
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center gap-1.5">
                      {iconForTipo(r.tipo)} {r.tipo}
                    </span>
                  </td>
                  <td className="px-3 py-2">{r.recapito || "-"}</td>
                  <td className="px-3 py-2">{r.referente || "-"}</td>
                  <td className="px-3 py-2">{r.note || "-"}</td>
                  <td className="px-3 py-2">{r.update || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ModalShell>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function TabellaRiassuntiva() {
  const [q, setQ] = useState("");
  const [openComune, setOpenComune] = useState(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ROWS;
    return ROWS.filter(
      (r) =>
        r.comune.toLowerCase().includes(needle) ||
        r.stato.toLowerCase().includes(needle) ||
        r.fase.toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <PageShell title="Tabella riassuntiva Comuni">
      {/* Barra ricerca */}
      <Card className="mb-6 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Field label="Cerca" icon={Search}>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="pl-9"
                placeholder="Comune, stato, fase…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </Field>
        </div>
      </Card>

      {/* Tabella */}
      <Card className="p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
            <MapPin className="h-5 w-5" />
            Elenco Comuni
            <Badge className="ml-2">
              <Hash className="h-3.5 w-3.5" /> {filtered.length}
            </Badge>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mostrati 1–{Math.min(10, filtered.length)} di 560 (mock)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/40">
              <tr>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <PencilLine className="h-4 w-4" /> Modifica
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" /> Comune
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeInfo className="h-4 w-4" /> Stato COC
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" /> Fase
                  </span>
                </th>
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> Attivazioni
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 10).map((r) => (
                <tr
                  key={r.comune}
                  className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/40"
                >
                  <td className="px-3 py-2">
                    <ButtonIcon
                      title="Gestisci comune"
                      onClick={() => setOpenComune(r)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </ButtonIcon>
                  </td>
                  <td className="px-3 py-2">{r.comune}</td>
                  <td className="px-3 py-2">{r.stato}</td>
                  <td className="px-3 py-2">{r.fase}</td>
                  <td className="px-3 py-2">{r.attivazioni || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modale dettaglio */}
      {openComune && (
        <ComuneModal
          open={!!openComune}
          onClose={() => setOpenComune(null)}
          comune={openComune.comune}
          stato={openComune.stato}
          fase={openComune.fase}
        />
      )}
    </PageShell>
  );
}
