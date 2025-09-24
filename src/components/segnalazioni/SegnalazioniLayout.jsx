import FullBleed from "../FullBleed";
import { Outlet } from "react-router-dom"; 
import Sidebar from "./Sidebar"; 
import routes from "./routesConfig";

export default function SegnalazioniLayout() {
    return (
        <FullBleed>
            <div className="w-full px-4 lg:px-8 py-6">
                <h1 className="text-2xl font-bold mb-4">Segnalazioni</h1>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
                    <aside className="lg:sticky lg:top-6 h-max">
                        <Sidebar routes={routes} />
                    </aside>

                    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm min-h-[60vh]">
                        <Outlet />
                    </section>
                </div>
            </div>
        </FullBleed>
    );
}
