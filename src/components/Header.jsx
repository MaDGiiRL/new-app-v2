import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 backdrop-blur bg-white/70 dark:bg-slate-950/70">
            <div className="container flex items-center justify-between py-3">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <Shield className="h-6 w-6" />
                    <span>Protezione Civile Veneto</span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
