import ThemeToggle from "./ThemeToggle";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 backdrop-blur">
            <div className="container flex items-center justify-between py-3">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <Shield className="h-6 w-6" />
                    <span>Supporto PC Veneto</span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
