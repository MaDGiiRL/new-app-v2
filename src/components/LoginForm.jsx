import { useState, useContext } from "react";
import SessionContext from "../context/SessionContext";
import { LockKeyhole, Mail } from "lucide-react";

export default function LoginForm() {
    const { signIn } = useContext(SessionContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setBusy(true);
        // Demo: nessuna chiamata a DB; autentica sempre
        setTimeout(() => {
            signIn(email || "utente@demo.it");
            setBusy(false);
        }, 500);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm mb-1">Email</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2">
                    <Mail className="h-4 w-4 opacity-60" />
                    <input
                        type="email"
                        className="w-full bg-transparent outline-none"
                        placeholder="nome.cognome@regione.veneto.it"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2">
                    <LockKeyhole className="h-4 w-4 opacity-60" />
                    <input
                        type="password"
                        className="w-full bg-transparent outline-none"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-60 px-4 py-2 text-white font-medium transition"
            >
                {busy ? "Accesso in corso…" : "Accedi"}
            </button>
        </form>
    );
}
