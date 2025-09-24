import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        // Solo frontend: simuliamo l'invio
        setDone(true);
    };

    return (
        <div className="container max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-sm mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4" /> Torna alla Home
            </Link>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white/60 dark:bg-slate-900/60">
                <h1 className="text-2xl font-bold mb-2">Procedura per il recupero della password</h1>
                <p className="opacity-80 mb-6">
                    Indicare l'indirizzo di posta elettronica utilizzato per la registrazione.
                </p>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Indirizzo di posta elettronica</label>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2">
                            <Mail className="h-4 w-4 opacity-60" />
                            <input
                                type="email"
                                className="w-full bg-transparent outline-none"
                                placeholder="nome.cognome@..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 px-4 py-2 text-white font-medium transition"
                    >
                        Invia richiesta
                    </button>

                    {done && (
                        <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                            Se l'indirizzo esiste nel sistema, riceverai una mail con le istruzioni per reimpostare la password.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
