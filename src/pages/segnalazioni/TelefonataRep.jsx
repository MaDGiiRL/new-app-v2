import React, { useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  PhoneCall,
  Phone,
  User,
  MapPin,
  FileText,
  Archive,
  Trash2,
  Search,
  CalendarClock,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

/* ------------------ UI primitives ------------------ */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900",
        className
      )}
      {...p}
    />
  );
}
function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition",
        "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-lg border px-3 text-sm",
        "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400",
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
        "w-full rounded-lg border px-3 py-2 text-sm",
        "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400",
        props.className
      )}
    />
  );
}
function Field({ label, icon: Icon, children }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
        {Icon && <Icon className="h-4 w-4" />} {label}
      </span>
      {children}
    </label>
  );
}

/* ------------------ Main Page ------------------ */
export default function TelefonataRep() {
  const [form, setForm] = useState({
    tipo: "E",
    segnalante: "",
    recapito: "",
    comune: "",
    sintesi: "",
  });
  const [telefonate, setTelefonate] = useState([
    {
      data: "25/09/2025 09:31",
      tipo: "U",
      ente: "Provincia di Verona",
      comune: "",
      sintesi:
        "Armando Lorenzini 3351415320 segnala grandinate intense su Valpolicella (Bussolengo). Verona città non interessata.",
      operatore: "emanuele barone",
    },
    {
      data: "25/09/2025 09:21",
      tipo: "U",
      ente: "Provincia di Treviso",
      comune: "",
      sintesi:
        "Mina Carlucci 0422656663 chiede info su grandinate. Nessuna segnalazione ricevuta dal territorio.",
      operatore: "nicola zennaro",
    },
    {
      data: "25/09/2025 05:59",
      tipo: "E",
      ente: "Dipartimento Protezione Civile",
      comune: "Valdobbiadene",
      sintesi:
        "SSI 0066804 chiede info meteo notte. Riferita grandinata a Valdobbiadene.",
      operatore: "alberto favero",
    },
  ]);

  const handleChange = (k, v) => setForm({ ...form, [k]: v });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTelefonate([
      {
        data: new Date().toLocaleString("it-IT", { hour12: false }),
        tipo: form.tipo,
        ente: form.segnalante,
        comune: form.comune,
        sintesi: form.sintesi,
        operatore: "operatore demo",
      },
      ...telefonate,
    ]);
    setForm({ tipo: "E", segnalante: "", recapito: "", comune: "", sintesi: "" });
  };

  return (
    <PageShell title="Telefonata rep">
      {/* Form registrazione */}
      <Card className="mb-6 p-4">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <Field label="Entrata/Uscita" icon={PhoneCall}>
            <select
              value={form.tipo}
              onChange={(e) => handleChange("tipo", e.target.value)}
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="E">Entrata</option>
              <option value="U">Uscita</option>
            </select>
          </Field>
          <Field label="Segnalante" icon={User}>
            <Input
              value={form.segnalante}
              onChange={(e) => handleChange("segnalante", e.target.value)}
            />
          </Field>
          <Field label="Recapito telefonico" icon={Phone}>
            <Input
              value={form.recapito}
              onChange={(e) => handleChange("recapito", e.target.value)}
            />
          </Field>
          <Field label="Comune" icon={MapPin}>
            <Input
              value={form.comune}
              onChange={(e) => handleChange("comune", e.target.value)}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Sintesi della telefonata" icon={FileText}>
              <Textarea
                rows={3}
                value={form.sintesi}
                onChange={(e) => handleChange("sintesi", e.target.value)}
              />
            </Field>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">
              <PhoneCall className="h-4 w-4" /> Registra Telefonata
            </Button>
          </div>
        </form>
      </Card>

      {/* Tabella */}
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Telefonate ultime 24 ore</h3>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <Input placeholder="Cerca…" className="w-48" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left dark:bg-slate-800">
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> Data e ora
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <PhoneCall className="h-4 w-4" /> E/U
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-4 w-4" /> Ente
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> Comune
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4" /> Sintesi
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-4 w-4" /> Operatore
                  </span>
                </th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Archive className="h-4 w-4" /> Azioni
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {telefonate.map((t, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-200 dark:border-slate-700"
                >
                  <td className="px-3 py-2">{t.data}</td>
                  <td className="px-3 py-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 h-6 px-2 rounded-full text-xs font-semibold",
                        t.tipo === "E"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                          : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                      )}
                      title={t.tipo === "E" ? "Entrata" : "Uscita"}
                    >
                      {t.tipo === "E" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
                      {t.tipo}
                    </span>
                  </td>
                  <td className="px-3 py-2">{t.ente}</td>
                  <td className="px-3 py-2">{t.comune}</td>
                  <td className="px-3 py-2">{t.sintesi}</td>
                  <td className="px-3 py-2">{t.operatore}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Archivia"
                      >
                        <Archive className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Elimina"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
