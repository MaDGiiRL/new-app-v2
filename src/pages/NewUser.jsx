import { useMemo, useState } from "react";
import { ArrowLeft, Info, User, Building2, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

// utility per classi condizionali
const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function NewUser() {
    const [form, setForm] = useState({
        nome: "",
        cognome: "",
        ente: "",
        email: "",
        telefono: "",
        password: "",
        conferma: "",
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);

    const onChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const e = {};
        if (!form.nome.trim()) e.nome = "Campo obbligatorio";
        if (!form.cognome.trim()) e.cognome = "Campo obbligatorio";
        if (!form.ente.trim()) e.ente = "Seleziona l'ente di appartenenza";
        if (!form.email.trim()) e.email = "Campo obbligatorio";
        if (!form.telefono.trim()) e.telefono = "Campo obbligatorio";
        if (!form.password) e.password = "Campo obbligatorio";
        if (!form.conferma) e.conferma = "Campo obbligatorio";
        if (form.password && form.conferma && form.password !== form.conferma) {
            e.conferma = "Le password non coincidono";
        }
        return e;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const eobj = validate();
        setErrors(eobj);
        if (Object.keys(eobj).length === 0) {
            // Solo frontend: simuliamo la sottomissione
            setDone(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // indicatore semplice forza password
    const pwdScore = useMemo(() => {
        const v = form.password || "";
        let score = 0;
        if (v.length >= 8) score++;
        if (/[A-Z]/.test(v)) score++;
        if (/[a-z]/.test(v)) score++;
        if (/\d/.test(v)) score++;
        if (/[^A-Za-z0-9]/.test(v)) score++;
        return score; // 0..5
    }, [form.password]);

    const scoreLabel = ["Molto debole", "Debole", "Discreta", "Buona", "Robusta", "Molto robusta"][pwdScore];

    return (
        <div className="container mx-auto px-6 lg:px-8 py-10 max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
                <Link to="/" className="inline-flex items-center gap-2 text-sm hover:underline">
                    <ArrowLeft className="h-4 w-4" /> Torna alla Home
                </Link>
                {done && (
                    <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm">
                        <CheckCircle2 className="h-4 w-4" /> Richiesta inviata
                    </span>
                )}
            </div>

            {/* Card principale */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm overflow-hidden">
                {/* Header card */}
                <div className="px-6 py-5 border-b border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/40">
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-2">
                            <Info className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold">Nuovo utente</h1>
                            <p className="text-sm opacity-80 mt-1">
                                L'iscrizione è riservata agli operatori del sistema regionale di protezione civile.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Banner successo */}
                {done && (
                    <div className="px-6 pt-6">
                        <div className="rounded-xl border border-emerald-300/60 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-900/30 p-4 text-sm">
                            Richiesta inviata. L’abilitazione verrà convalidata secondo le procedure indicate.
                        </div>
                    </div>
                )}

                {/* Contenuti */}
                <div className="px-6 py-6 space-y-8">
                    {/* Blocco Informazioni */}
                    <section className="space-y-3 text-sm leading-relaxed">
                        <p className="font-semibold">Informazioni</p>
                        <ul className="space-y-2">
                            <li>
                                <strong>Dipendenti pubblici:</strong> <u>NON UTILIZZARE PEC</u>. Usare solo mail istituzionali dell’Ente
                                (es. <span className="font-mono">mario.rossi@comunexxx.it</span>, <span className="font-mono">tecnico@comunexxx.it</span>).
                            </li>
                            <li>
                                <strong>Volontari:</strong> Ammesse mail personali o dell’associazione. L’abilitazione verrà convalidata
                                dopo la conferma del Presidente/Coordinatore. Il Presidente/Coordinatore può confermare alla mail:
                                {" "}
                                <a
                                    className="text-sky-700 dark:text-sky-400 hover:underline break-all"
                                    href="mailto:protezionecivile.pianificazione@regione.veneto.it"
                                >
                                    protezionecivile.pianificazione@regione.veneto.it
                                </a>.
                            </li>
                        </ul>
                        <p className="opacity-80">La stessa mail non può essere utilizzata da più utenti. Tutti i campi sono obbligatori.</p>
                    </section>

                    <hr className="border-slate-200/70 dark:border-slate-800/70" />

                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Nome + Cognome */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-sm mb-1">Nome</label>
                                <div className={cx(
                                    "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                    "focus-within:ring-2 focus-within:ring-sky-500/50",
                                    errors.nome ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                                )}>
                                    <User className="h-4 w-4 opacity-60" />
                                    <input
                                        name="nome"
                                        value={form.nome}
                                        onChange={onChange}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="Mario"
                                        required
                                    />
                                </div>
                                {errors.nome && <p className="text-xs text-red-600 mt-1">{errors.nome}</p>}
                            </div>

                            <div className="group">
                                <label className="block text-sm mb-1">Cognome</label>
                                <div className={cx(
                                    "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                    "focus-within:ring-2 focus-within:ring-sky-500/50",
                                    errors.cognome ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                                )}>
                                    <User className="h-4 w-4 opacity-60" />
                                    <input
                                        name="cognome"
                                        value={form.cognome}
                                        onChange={onChange}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="Rossi"
                                        required
                                    />
                                </div>
                                {errors.cognome && <p className="text-xs text-red-600 mt-1">{errors.cognome}</p>}
                            </div>
                        </div>

                        {/* Ente */}
                        <div className="group">
                            <label className="block text-sm mb-1">Ente di appartenenza</label>
                            <div className={cx(
                                "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                "focus-within:ring-2 focus-within:ring-sky-500/50",
                                errors.ente ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                            )}>
                                <Building2 className="h-4 w-4 opacity-60" />
                                <select
                                    name="ente"
                                    value={form.ente}
                                    onChange={onChange}
                                    className="w-full bg-transparent outline-none"
                                    required
                                >
                                    <option value="">Selezionare Ente di appartenenza</option>
                                    <option>Comune</option>
                                    <option>Unione di Comuni</option>
                                    <option>Provincia</option>
                                    <option>Regione</option>
                                    <option>Associazione di Volontariato</option>
                                    <option>Altro Ente</option>
                                </select>
                            </div>
                            {errors.ente && <p className="text-xs text-red-600 mt-1">{errors.ente}</p>}
                        </div>

                        {/* Email + Telefono */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-sm mb-1">Indirizzo mail</label>
                                <div className={cx(
                                    "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                    "focus-within:ring-2 focus-within:ring-sky-500/50",
                                    errors.email ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                                )}>
                                    <Mail className="h-4 w-4 opacity-60" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="nome.cognome@ente.it"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                            </div>

                            <div className="group">
                                <label className="block text-sm mb-1">Recapito telefonico</label>
                                <div className={cx(
                                    "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                    "focus-within:ring-2 focus-within:ring-sky-500/50",
                                    errors.telefono ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                                )}>
                                    <Phone className="h-4 w-4 opacity-60" />
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={form.telefono}
                                        onChange={onChange}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="+39 ..."
                                        required
                                    />
                                </div>
                                {errors.telefono && <p className="text-xs text-red-600 mt-1">{errors.telefono}</p>}
                            </div>
                        </div>

                        {/* Password + Conferma */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-sm mb-1">Password</label>
                                <div className={cx(
                                    "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                    "focus-within:ring-2 focus-within:ring-sky-500/50",
                                    errors.password ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                                )}>
                                    <Lock className="h-4 w-4 opacity-60" />
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={onChange}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd((v) => !v)}
                                        className="opacity-70 hover:opacity-100"
                                        aria-label={showPwd ? "Nascondi password" : "Mostra password"}
                                    >
                                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}

                                {/* Indicatore forza password */}
                                <div className="mt-2">
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                        <div
                                            className={cx(
                                                "h-full transition-all",
                                                pwdScore <= 1 && "bg-red-500",
                                                pwdScore === 2 && "bg-orange-500",
                                                pwdScore === 3 && "bg-yellow-500",
                                                pwdScore === 4 && "bg-lime-500",
                                                pwdScore >= 5 && "bg-emerald-500"
                                            )}
                                            style={{ width: `${(pwdScore / 5) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-xs opacity-70 mt-1">{scoreLabel}</p>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm mb-1">Ripeti password</label>
                                <div className={cx(
                                    "flex items-center gap-2 rounded-xl border px-3 py-2 bg-white/70 dark:bg-slate-900/60",
                                    "focus-within:ring-2 focus-within:ring-sky-500/50",
                                    errors.conferma ? "border-red-300 dark:border-red-600" : "border-slate-200 dark:border-slate-800"
                                )}>
                                    <Lock className="h-4 w-4 opacity-60" />
                                    <input
                                        type={showPwd2 ? "text" : "password"}
                                        name="conferma"
                                        value={form.conferma}
                                        onChange={onChange}
                                        className="w-full bg-transparent outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd2((v) => !v)}
                                        className="opacity-70 hover:opacity-100"
                                        aria-label={showPwd2 ? "Nascondi password" : "Mostra password"}
                                    >
                                        {showPwd2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.conferma && <p className="text-xs text-red-600 mt-1">{errors.conferma}</p>}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 px-4 py-3 text-white font-medium transition shadow-sm"
                            >
                                Invia richiesta di abilitazione
                            </button>
                            <p className="text-xs opacity-70 mt-3 text-center">
                                Inviando la richiesta dichiari di aver letto e compreso le indicazioni sopra riportate.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
