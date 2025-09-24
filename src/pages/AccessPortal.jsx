import { useContext } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import LoginForm from "../components/LoginForm";
import SectionGrid from "../components/SectionGrid";
import { sections } from "../routes/sections";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function AccessPortal() {
    const { session, signOut } = useContext(SessionContext);

    return (
        <div className="text-center space-y-10">
            {/* Hero */}
            <div className="space-y-3 pt-10">
                <div className="flex justify-center">
                    <img
                        src="https://i.imgur.com/dS54iAp.png"
                        alt="Regione del Veneto"
                        className="w-1/3 max-w-xs"
                    />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Applicativi informatici
                </h1>
                <p className="text-lg sm:text-xl">Direzione Protezione Civile, Sicurezza e Polizia Locale</p>
                <p className="text-sm opacity-80">Sezione ad accesso riservato agli utenti accreditati</p>
            </div>

            {/* Social */}
            <div className="flex items-center justify-center gap-6">
                <a href="https://x.com/" target="_blank" rel="noreferrer"><Twitter className="h-6 w-6 hover:text-sky-600" /></a>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer"><Facebook className="h-6 w-6 hover:text-sky-600" /></a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer"><Instagram className="h-6 w-6 hover:text-sky-600" /></a>
            </div>

            {/* Contenuto */}
            {!session ? (
                <div className="mx-auto max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-8 bg-white/60 dark:bg-slate-900/60 shadow-sm text-left">
                    <LoginForm />
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link
                            to="/password-smarrita"
                            className="text-center rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                        >
                            Password smarrita
                        </Link>
                        <Link
                            to="/nuovo-utente"
                            className="text-center rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm transition"
                        >
                            Nuovo utente
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="font-semibold text-lg">Pannello Sezioni</h2>
                        <button
                            onClick={signOut}
                            className="text-sm rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                        >
                            Esci
                        </button>
                    </div>
                    <SectionGrid sections={sections} />
                </div>
            )}
        </div>
    );
}
