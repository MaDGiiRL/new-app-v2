import { Link } from "react-router-dom";
import { Map as MapIcon, AppWindow, Activity } from "lucide-react";

export default function PublicHome() {
    return (
        <div className="space-y-15 py-15">
            {/* Intro */}
            <section className="space-y-4 text-center">
                <div className="flex justify-center">
                    <img
                        src="https://i.imgur.com/dS54iAp.png"
                        alt="Regione del Veneto"
                        className="w-1/3 max-w-xs"
                    />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Benvenuti nel portale di supporto delle attività <br />di Protezione Civile della Regione del Veneto
                </h1>
                <p className="opacity-90">
                    Il portale fornisce informazioni ed utilità di supporto per gli operatori del Sistema Regionale di Protezione Civile
                </p>
                <p className="text-sm opacity-70 max-w-4xl mx-auto">
                    I dati presentati nel portale non sostituiscono i dati cartografici ufficiali nè i dati presenti nei piani comunali approvati,
                    ma intendono essere solo uno strumento di supporto per Enti del sistema regionale di Protezione Civile.
                </p>
            </section>


            {/* Cards */}
            <section className="grid md:grid-cols-3 gap-6">
                {/* CARD 1 - Cartografie */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-200/70 dark:border-slate-800/70">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-2">
                            <MapIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Cartografie</h3>
                    </div>

                    <div className="p-5 space-y-3 text-sm flex-1">
                        <p>
                            Questa sezione raccoglie sotto forma di mappe, informazioni relative ai piani comunali di protezione civile,
                            nonchè ulteriori dati raccolti ed elaborati dalla Direzione Protezione Civile e Polizia Locale della Regione del Veneto.
                        </p>

                        <div className="mt-3">
                            <img
                                src="https://i.imgur.com/1Q0274G.jpeg"
                                alt="Cartografia Protezione Civile"
                                className="rounded-xl border border-slate-300 dark:border-slate-700 w-full h-45 object-cover"
                            />
                        </div>
                    </div>

                    <div className="px-5 pb-5 pt-1">
                        <Link
                            to="/cartografie"
                            className="inline-flex items-center justify-center w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm transition"
                        >
                            Apri Cartografie
                        </Link>
                    </div>
                </div>

                {/* CARD 2 - Applicativi informatici */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-200/70 dark:border-slate-800/70">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-2">
                            <AppWindow className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Applicativi informatici</h3>
                    </div>

                    <div className="p-5 space-y-3 text-sm flex-1">
                        <p>
                            Questa sezione consente l'accesso a procedure informatiche per la ricerca e la gestione
                            delle risorse umane e strumentali della Protezione Civile. L'accesso è riservato ai volontari specificatamente formati e a tutti gli utenti accreditati.
                        </p>
                        <div className="mt-3">
                            <img
                                src="https://i.imgur.com/byUJBRM.jpeg"
                                alt="Applicativi placeholder"
                                className="rounded-xl border border-slate-300 dark:border-slate-700 w-full h-45 object-cover"
                            />
                        </div>
                    </div>

                    <div className="px-5 pb-5 pt-1">
                        <Link
                            to="/accesso"
                            className="inline-flex items-center justify-center w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm transition"
                        >
                            Vai agli Applicativi
                        </Link>
                    </div>
                </div>

                {/* CARD 3 - Percezione sismica */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-200/70 dark:border-slate-800/70">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-2">
                            <Activity className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Percezione sismica</h3>
                    </div>

                    <div className="p-5 space-y-3 text-sm flex-1">
                        <p>
                            Attraverso questa sezione è possibile accedere al portale per la segnalazione della percezione sismica.
                            L'accesso è riservato ai volontari specificatamente formati per la compilazione del questionario di percezione sismica.
                        </p>
                        <div className="mt-3">
                            <img
                                src="https://i.imgur.com/ASqOrvL.jpeg"
                                alt="Percezione sismica placeholder"
                                className="rounded-xl border border-slate-300 dark:border-slate-700 w-full h-45 object-cover"
                            />
                        </div>
                    </div>

                    <div className="px-5 pb-5 pt-1">
                        <Link
                            to="/percezione-sismica"
                            className="inline-flex items-center justify-center w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm transition"
                        >
                            Apri Percezione sismica
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
