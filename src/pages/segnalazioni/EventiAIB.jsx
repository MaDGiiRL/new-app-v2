import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PageShell from "../../components/_PageShell";
import { Plus, Flame, X, Navigation, MapPin, Tag } from "lucide-react";

/* ------------------------------ Utils & UI kit ------------------------------ */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ className, ...p }) {
  // (nota) Se in futuro aggiungi card "Categoria ...", l'icona verrà gestita nel Field
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

/** Campo con icona opzionale; se l'etichetta contiene "Categoria", mostra automaticamente <Tag/> */
function Field({ label, hint, required, icon: Icon, children }) {
  const showTag = /categoria/i.test(label || "");
  return (
    <label className="grid gap-1.5">
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
        {Icon ? <Icon className="h-4 w-4" /> : showTag ? <Tag className="h-4 w-4" /> : null}
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
      {hint && (
        <span className="text-xs text-slate-500 dark:text-slate-400">{hint}</span>
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

/* --------------------------------- Modale ---------------------------------- */
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
        <Card className="relative w-full max-w-4xl p-6">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-slate-300 hover:bg-white/10"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Da utilizzare per registrare segnalazioni di eventi incendi boschivi
          </p>
          <div className="max-h-[70vh] overflow-auto pr-1">{children}</div>
          {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
        </Card>
      </div>
    </div>,
    document.body
  );
}

/* ---------------------------- Form Segnalazione AIB ----------------------------*/
function FormSegnalazioneAIB({ onSubmit }) {
  const [form, setForm] = useState({
    comune: "",
    contatto: "",
    lat: "",
    lon: "",
    localita: "",
    noteEvento: "",
    necessita: "",
    noteFinali: "",
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
  });

  const handle = (k) => (e) =>
    setForm({
      ...form,
      [k]:
        e.target.type === "number"
          ? Number(e.target.value || 0)
          : e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="grid gap-4" onSubmit={submit}>
      {/* Blocco: dati generali */}
      <Card className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Selezionare il comune interessato"
            icon={MapPin}
            hint="Digita per cercare. (Suggerimento: integra una Combobox con ricerca/virtualizzazione)"
            required
          >
            <Input
              value={form.comune}
              onChange={handle("comune")}
              placeholder="Es. Adria"
              required
            />
          </Field>

          <Field label="Persona di contatto" hint="Inserire nominativo e recapito">
            <Input
              value={form.contatto}
              onChange={handle("contatto")}
              placeholder="Es. Mario Rossi – 3331234567"
            />
          </Field>

          <Field
            label="Latitudine"
            icon={Navigation}
            hint="Latitudine 45... N in formato decimale"
            required
          >
            <Input
              type="number"
              step="0.000001"
              value={form.lat}
              onChange={handle("lat")}
              placeholder="45.123456"
              required
            />
          </Field>

          <Field
            label="Longitudine"
            icon={Navigation}
            hint="Longitudine 11... E in formato decimale"
            required
          >
            <Input
              type="number"
              step="0.000001"
              value={form.lon}
              onChange={handle("lon")}
              placeholder="11.123456"
              required
            />
          </Field>

          <div className="md:col-span-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => alert("Convertitore coordinate: da implementare")}
              className="gap-2"
            >
              <Navigation className="h-4 w-4" />
              Convertitore coordinate
            </Button>
          </div>

          <Field label="Località" icon={MapPin} hint="Inserire località evento" className="md:col-span-2">
            <Input
              value={form.localita}
              onChange={handle("localita")}
              placeholder="Es. Località Bosco Alto"
            />
          </Field>
        </div>

        <Field
          label="Note"
          hint="Eventuali note descrittive dell'evento. Non utilizzare per gli aggiornamenti"
        >
          <Textarea
            value={form.noteEvento}
            onChange={handle("noteEvento")}
            placeholder="Descrizione iniziale dell'evento"
          />
        </Field>

        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Indicare, se disponibili, gli effetti complessivamente subiti dai territori
          comunali selezionati a causa dell'evento. Gli effetti potranno essere successivamente
          aggiornati accedendo alla pagina del Comune/i individuati.
        </p>
      </Card>

      {/* Blocco: necessità */}
      <Card className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Necessità" hint="Necessità evidenziate">
            <Textarea
              value={form.necessita}
              onChange={handle("necessita")}
              placeholder="Es. mezzi AIB aggiuntivi, supporto VVF…"
            />
          </Field>
          <Field label="Note" hint="Ulteriori notizie utili">
            <Textarea
              value={form.noteFinali}
              onChange={handle("noteFinali")}
              placeholder="Informazioni complementari"
            />
          </Field>
        </div>
      </Card>

      {/* Blocco: effetti su popolazione/territorio */}
      <Card className="p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          Effetti su popolazione e territorio
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
              placeholder="Es. areale 3 km²"
            />
          </Field>
          <Field label="Popolazione coinvolta">
            <Input
              value={form.popolazioneCoinvolta}
              onChange={handle("popolazioneCoinvolta")}
              placeholder="Stima persone"
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

          <Field label="Popolazione isolata">
            <Input type="number" min={0} value={form.isolati} onChange={handle("isolati")} />
          </Field>
          <Field label="Note isolati" hint="Eventuali necessità">
            <Input value={form.noteIsolati} onChange={handle("noteIsolati")} />
          </Field>

          <Field label="Popolazione evacuata">
            <Input type="number" min={0} value={form.evacuati} onChange={handle("evacuati")} />
          </Field>
          <Field label="Note evacuati" hint="Attuale sistemazione">
            <Input value={form.noteEvacuati} onChange={handle("noteEvacuati")} />
          </Field>
        </div>
      </Card>

      {/* Blocco: infrastrutture/servizi */}
      <Card className="p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          Infrastrutture e servizi
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Problematiche energia elettrica">
            <Input value={form.energia} onChange={handle("energia")} />
          </Field>
          <Field label="Note energia elettrica">
            <Input value={form.noteEnergia} onChange={handle("noteEnergia")} />
          </Field>

          <Field label="Problematiche acqua potabile">
            <Input value={form.acqua} onChange={handle("acqua")} />
          </Field>
          <Field label="Note acqua potabile">
            <Input value={form.noteAcqua} onChange={handle("noteAcqua")} />
          </Field>

          <Field label="Problematiche telecomunicazioni">
            <Input value={form.tlc} onChange={handle("tlc")} />
          </Field>
          <Field label="Note telecomunicazioni">
            <Input value={form.noteTlc} onChange={handle("noteTlc")} />
          </Field>

          <Field label="Problematiche viabilità locale">
            <Input value={form.viabilitaLocale} onChange={handle("viabilitaLocale")} />
          </Field>
          <Field label="Note viabilità locale">
            <Input value={form.noteViabilitaLocale} onChange={handle("noteViabilitaLocale")} />
          </Field>

          <Field label="Problematiche accessibilità stradale">
            <Input value={form.accessibilita} onChange={handle("accessibilita")} />
          </Field>
          <Field label="Note viabilità d'accesso">
            <Input value={form.noteAccesso} onChange={handle("noteAccesso")} />
          </Field>
        </div>
      </Card>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" className="min-w-40">
          Salva segnalazione AIB
        </Button>
      </div>
    </form>
  );
}

/* ------------------------------ Page component ------------------------------ */
function NuovoEventoAIBButton() {
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
        title={
          <span className="inline-flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Segnalazione AIB
          </span>
        }
        footer={
          <>
            <Button variant="subtle" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            {/* Il submit vero è nel form; qui potresti innescare ref/submit programmatico */}
          </>
        }
      >
        <FormSegnalazioneAIB
          onSubmit={(data) => {
            console.log("Segnalazione AIB salvata:", data);
            setOpen(false);
          }}
        />
      </ModalShell>
    </>
  );
}

export default function EventiAIB() {
  return (
    <PageShell title="Eventi AIB">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Gestisci le segnalazioni relative agli incendi boschivi (AIB).
        </p>
        <NuovoEventoAIBButton />
      </div>

      {/* Empty state / placeholder lista eventi AIB */}
      <Card className="flex flex-col items-center justify-center gap-3 p-8 text-center">
        <Flame className="h-8 w-8 text-orange-500" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Nessun evento AIB in elenco
        </h3>
        <p className="max-w-prose text-sm text-slate-500 dark:text-slate-400">
          Crea una nuova segnalazione per avviare il tracciamento dell’evento.
        </p>
        <NuovoEventoAIBButton />
      </Card>
    </PageShell>
  );
}
