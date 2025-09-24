import { useEffect, useState } from "react";
import SessionContext from "./SessionContext";

const STORAGE_KEY = "pcveneto_session";

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // carica sessione da localStorage
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setSession(JSON.parse(raw));
            } catch { }
        }
        setLoading(false);
    }, []);

    const signIn = (email) => {
        const s = { user: { email }, signedAt: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
        setSession(s);
    };

    const signOut = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
    };

    return (
        <SessionContext.Provider value={{ session, loading, signIn, signOut }}>
            {children}
        </SessionContext.Provider>
    );
}
