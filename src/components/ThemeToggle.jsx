import { useEffect, useState } from "react";
import { Sun, MoonStar } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = stored ? stored === "dark" : prefers;
        setDark(initial);
        document.documentElement.classList.toggle("dark", initial);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <button
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            aria-label="Toggle theme"
        >
            {dark ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"} mode</span>
        </button>
    );
}
