import React, { useState } from "react";
import { ClipboardList, Info } from "lucide-react";

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
function Button({ className, ...props }) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl h-10 px-4 text-sm font-medium",
                "bg-blue-600 text-white hover:bg-blue-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                "disabled:opacity-60 disabled:pointer-events-none",
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
                "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
                className
            )}
            {...props}
        />
    );
}
function Field({ label, hint, required, children }) {
    return (
        <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-200">
                {label} {required && <span className="text-red-600">*</span>}
            </span>
            {children}
            {hint && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Info className="h-3.5 w-3.5" /> {hint}
                </span>
            )}
        </label>
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
const Textarea = (p) => (
    <textarea
        {...p}
        className={cn(
            "min-h-24 w-full rounded-xl border px-3 py-2 text-sm",
            "border-slate-300 bg-white/90 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
            p.className
        )}
    />
);

export default function GestioneEventi() {
    const [form, setForm] = useState({
        eventoEsistente: "",
        nomeEvento: "",
        inizio: "",
        fine: "",
        ambito: "Ambito regionale",
        tipologia: "",
        art39: false,
        art40: false,
        spese: [], // array di stringhe
        attivitaPrevista: "",
        enteCoordinamento: "",
        zonaIntervento: "",
        noteZona: "",
        autoritaAccreditamento: "",
        noteAccreditamento: "",
        rilascioAttestati: "",
        istruttoriaRimborsi: "Regione Veneto - Protezione Civile",
        noteAttivazioni: "",
    });

    const toggleSpesa = (v) => {
        setForm((f) => {
            const on = f.spese.includes(v);
            return { ...f, spese: on ? f.spese.filter(s => s !== v) : [...f.spese, v] };
        });
    };

    const submit = (e) => {
        e.preventDefault();
        console.log("GestioneEventi submit:", form);
        alert("Evento salvato (mock). Controlla la console per il payload.");
    };

    return (
        <div className="p-4 lg:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                <ClipboardList className="h-5 w-5 text-blue-500" /> Gestione eventi
            </h2>

            <Card className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Consente l'inserimento di un nuovo evento o la modifica di eventi già registrati.
                </p>

                <form className="grid gap-6" onSubmit={submit}>
                    {/* selezione evento esistente */}
                    <Card className="p-4">
                        <h3 className="text-sm font-semibold mb-3">Selezionare un evento già registrato</h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Field label="Evento">
                                <Select
                                    value={form.eventoEsistente}
                                    onChange={(e) => setForm((f) => ({ ...f, eventoEsistente: e.target.value }))}
                                >
                                    <option value="">Selezionare un evento esistente</option>
                                    <option value="2935">EVENTO METEO - AVVISO DI CRITICITA' N. 56 / 2025</option>
                                    <option value="2931">ANA 3RGPT Corso base e sicurezza - Sez. di VR</option>
                                </Select>
                            </Field>

                            <Field label="Ricerca evento">
                                <div className="flex gap-2">
                                    <Input placeholder="Cerca per denominazione..." />
                                    <ButtonSecondary type="button">Cerca</ButtonSecondary>
                                </div>
                            </Field>
                        </div>
                    </Card>

                    {/* nuovo evento */}
                    <Card className="p-4">
                        <h3 className="text-sm font-semibold mb-3">Oppure inserire un nuovo evento</h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Field label="Nome evento" required>
                                <Input
                                    value={form.nomeEvento}
                                    onChange={(e) => setForm((f) => ({ ...f, nomeEvento: e.target.value }))}
                                    placeholder="Denominazione evento"
                                    required
                                />
                            </Field>
                            <Field label="Inizio evento" required hint="Formato gg/mm/aaaa">
                                <Input
                                    value={form.inizio}
                                    onChange={(e) => setForm((f) => ({ ...f, inizio: e.target.value }))}
                                    placeholder="gg/mm/aaaa"
                                    required
                                />
                            </Field>
                            <Field label="Fine evento" hint="Formato gg/mm/aaaa">
                                <Input
                                    value={form.fine}
                                    onChange={(e) => setForm((f) => ({ ...f, fine: e.target.value }))}
                                    placeholder="gg/mm/aaaa"
                                />
                            </Field>
                            <Field label="Ambito di intervento">
                                <Select
                                    value={form.ambito}
                                    onChange={(e) => setForm((f) => ({ ...f, ambito: e.target.value }))}
                                >
                                    <option>Ambito regionale</option>
                                    <option>Ambito provinciale</option>
                                    <option>Ambito comunale</option>
                                </Select>
                            </Field>
                            <Field label="Tipologia evento">
                                <Input
                                    value={form.tipologia}
                                    onChange={(e) => setForm((f) => ({ ...f, tipologia: e.target.value }))}
                                    placeholder="Tipologia evento"
                                />
                            </Field>
                            <Field label="Applicazione art. 39 / 40">
                                <div className="flex items-center gap-6 h-10">
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={form.art39} onChange={(e) => setForm((f) => ({ ...f, art39: e.target.checked }))} />
                                        Art. 39
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={form.art40} onChange={(e) => setForm((f) => ({ ...f, art40: e.target.checked }))} />
                                        Art. 40
                                    </label>
                                </div>
                            </Field>
                            <Field label="Spese autorizzate" hint="Seleziona una o più voci">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {["Carburante e pedaggi", "Pasti", "Alloggio", "Trasporti pubblici", "Materiali assorbenti", "Cancelleria"].map(v => (
                                        <label key={v} className="inline-flex items-center gap-2 text-sm">
                                            <input type="checkbox" checked={form.spese.includes(v)} onChange={() => toggleSpesa(v)} />
                                            {v}
                                        </label>
                                    ))}
                                </div>
                            </Field>
                            <Field label="Attività prevista">
                                <Textarea
                                    value={form.attivitaPrevista}
                                    onChange={(e) => setForm((f) => ({ ...f, attivitaPrevista: e.target.value }))}
                                    placeholder="Attività prevista"
                                />
                            </Field>
                        </div>
                    </Card>

                    {/* autorità & zone */}
                    <Card className="p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Autorità di coordinamento (Ente di Coordinamento)">
                                <Input
                                    value={form.enteCoordinamento}
                                    onChange={(e) => setForm((f) => ({ ...f, enteCoordinamento: e.target.value }))}
                                    placeholder="Ente di Coordinamento"
                                />
                            </Field>
                            <Field label="Zona di intervento">
                                <Input
                                    value={form.zonaIntervento}
                                    onChange={(e) => setForm((f) => ({ ...f, zonaIntervento: e.target.value }))}
                                    placeholder="Zona di intervento"
                                />
                            </Field>
                            <Field label="Note zona intervento">
                                <Textarea
                                    maxLength={250}
                                    value={form.noteZona}
                                    onChange={(e) => setForm((f) => ({ ...f, noteZona: e.target.value }))}
                                    placeholder="Note zona intervento"
                                />
                            </Field>
                            <div />
                            <Field label="Autorità di accreditamento">
                                <Input
                                    value={form.autoritaAccreditamento}
                                    onChange={(e) => setForm((f) => ({ ...f, autoritaAccreditamento: e.target.value }))}
                                    placeholder="Autorità di accreditamento"
                                />
                            </Field>
                            <Field label="Note accreditamento">
                                <Textarea
                                    maxLength={250}
                                    value={form.noteAccreditamento}
                                    onChange={(e) => setForm((f) => ({ ...f, noteAccreditamento: e.target.value }))}
                                    placeholder="Note accreditamento"
                                />
                            </Field>
                            <Field label="Autorità incaricata rilascio attestati">
                                <Input
                                    value={form.rilascioAttestati}
                                    onChange={(e) => setForm((f) => ({ ...f, rilascioAttestati: e.target.value }))}
                                    placeholder="Rilascio attestati a cura di"
                                />
                            </Field>
                            <Field label="Ente incaricato istruttoria domande di rimborso">
                                <Input
                                    value={form.istruttoriaRimborsi}
                                    onChange={(e) => setForm((f) => ({ ...f, istruttoriaRimborsi: e.target.value }))}
                                />
                            </Field>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <Field label="Note attivazione">
                            <Textarea
                                value={form.noteAttivazioni}
                                onChange={(e) => setForm((f) => ({ ...f, noteAttivazioni: e.target.value }))}
                                placeholder="Note attivazioni"
                            />
                        </Field>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <ButtonSecondary type="reset" onClick={() => window.location.reload()}>Annulla</ButtonSecondary>
                        <Button type="submit">Salva</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
