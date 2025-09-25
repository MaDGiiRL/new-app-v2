// RicercaRecapiti.jsx
import React, { useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Building2,
  MapPin,
  Droplets,
  Mountain,
  Phone,
  Filter,
  Search,
  Activity,
} from "lucide-react";

/* ---------- mini UI ---------- */
function cn(...c) { return c.filter(Boolean).join(" "); }

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

function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        "disabled:opacity-60 disabled:pointer-events-none",
        "h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        className
      )}
      {...props}
    />
  );
}

function ButtonSecondary({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl h-10 px-4 text-sm font-medium",
        "bg-slate-100 text-slate-900 hover:bg-slate-200",
        "dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        className
      )}
      {...props}
    />
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-200">
        {label}
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
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
        props.className
      )}
    />
  );
}

function MultiSelect({ value = [], onChange, children, className, ...rest }) {
  return (
    <select
      multiple
      value={value}
      onChange={(e) =>
        onChange(Array.from(e.target.selectedOptions, (o) => o.value))
      }
      className={cn(
        "min-h-[2.5rem] w-full rounded-xl border px-3 py-2 text-sm",
        "border-slate-300 bg-white/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

/* Header con icona + titolo */
function SectionCard({ icon: Icon, title, children }) {
  return (
    <Card className="p-4">
      <h4 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        {Icon && <Icon className="h-4 w-4" />} {title}
      </h4>
      {children}
    </Card>
  );
}

/* ---------- opzioni ---------- */
const TIPO_ENTE = [["Comune", "Comune"], ["Org_vol", "Org Volontariato"]];
const PROVINCE_VENETO = ["Belluno", "Padova", "Rovigo", "Treviso", "Venezia", "Verona", "Vicenza"];
const IDRO = ["Vene-A", "Vene-B", "Vene-C"];
const STATO_SALE = [["0", "chiusa"], ["1", "aperta orario diurno"], ["2", "aperta h24"]];
const FASI = [["1", "attenzione"], ["2", "preallarme"], ["0", "assenza allerta"], ["3", "allarme"]];
const TIPO_RECAPITO = [["CEL", "Cellulare"], ["TEL", "Telefono"], ["PEC", "Posta Certificata"], ["MA", "Posta Elettronica"], ["FAX", "Fax"]];

/* ---------- componente pagina ---------- */
export default function RicercaRecapiti() {
  const initial = {
    nome_ente: "",
    tipo_ente: [],
    ambito_competenza: [],
    ambito_appartenenza: [],
    allertamento_idraulico: [],
    zona_valanghe: [],
    stato_sale: [],
    fase: [],
    tipo_recapito: [],
    limite: 5,
  };
  const [form, setForm] = useState(initial);

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Ricerca recapiti – payload:", form);
    alert("Ricerca avviata (vedi console). Integra il submit al backend se necessario.");
  };

  const onReset = () => setForm(initial);

  return (
    <PageShell title="Ricerca recapiti">
      <form onSubmit={onSubmit} onReset={onReset}>
        {/* riga 1 */}
        <div className="grid gap-4 md:grid-cols-3">
          <SectionCard icon={Building2} title="Ente">
            <Field label="Nome ente" hint="Inserire il nome dell'ente o una parte">
              <Input
                value={form.nome_ente}
                onChange={(e) => handleChange("nome_ente", e.target.value)}
                placeholder="Es. Comune di… / Provincia di…"
              />
            </Field>
          </SectionCard>

          <SectionCard icon={Filter} title="Tipo di Ente">
            <Field label="Seleziona uno o più tipi">
              <MultiSelect
                value={form.tipo_ente}
                onChange={(vals) => handleChange("tipo_ente", vals)}
              >
                {TIPO_ENTE.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>

          <SectionCard icon={MapPin} title="Ambito territoriale di competenza">
            <Field label="Ambito (multi-selezione)" hint="Esempio: province di competenza">
              <MultiSelect
                value={form.ambito_competenza}
                onChange={(vals) => handleChange("ambito_competenza", vals)}
              >
                {PROVINCE_VENETO.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>
        </div>

        {/* riga 2 */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <SectionCard icon={MapPin} title="Ambito territoriale di appartenenza">
            <Field label="Ambito (multi-selezione)" hint="Provincia / area in cui ricade l’ente">
              <MultiSelect
                value={form.ambito_appartenenza}
                onChange={(vals) => handleChange("ambito_appartenenza", vals)}
              >
                {PROVINCE_VENETO.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>

          <SectionCard icon={Droplets} title="Zona di allertamento idraulico">
            <Field label="Seleziona zone">
              <MultiSelect
                value={form.allertamento_idraulico}
                onChange={(vals) => handleChange("allertamento_idraulico", vals)}
              >
                {IDRO.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>

          <SectionCard icon={Mountain} title="Zona di allertamento valanghe">
            <Field label="Seleziona zone" hint="Nessuna zona configurata">
              <MultiSelect
                value={form.zona_valanghe}
                onChange={(vals) => handleChange("zona_valanghe", vals)}
              >
                <option value="" disabled>Nessuna zona disponibile</option>
              </MultiSelect>
            </Field>
          </SectionCard>
        </div>

        {/* riga 3 */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <SectionCard icon={Building2} title="Stato Centro Operativo Comunale">
            <Field label="Stato COC">
              <MultiSelect
                value={form.stato_sale}
                onChange={(vals) => handleChange("stato_sale", vals)}
              >
                {STATO_SALE.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>

          <SectionCard icon={Activity} title="Stato Fase operativa">
            <Field label="Fase">
              <MultiSelect
                value={form.fase}
                onChange={(vals) => handleChange("fase", vals)}
              >
                {FASI.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>

          <SectionCard icon={Phone} title="Tipo recapito">
            <Field label="Canali">
              <MultiSelect
                value={form.tipo_recapito}
                onChange={(vals) => handleChange("tipo_recapito", vals)}
              >
                {TIPO_RECAPITO.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </MultiSelect>
            </Field>
          </SectionCard>
        </div>

        {/* riga 4 – azioni */}
        <div className="mt-4">
          <SectionCard icon={Search} title="Azioni">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-700 dark:text-slate-200">
                Limita la ricerca a{" "}
                <Input
                  type="number"
                  min={1}
                  max={30}
                  value={form.limite}
                  onChange={(e) => handleChange("limite", Number(e.target.value))}
                  className="mx-2 inline-block w-20 text-center"
                />{" "}
                risultati per ogni tipologia
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  <Search className="h-4 w-4" /> Cerca
                </Button>
                <ButtonSecondary type="reset">Azzera</ButtonSecondary>
              </div>
            </div>
          </SectionCard>
        </div>
      </form>
    </PageShell>
  );
}
