import { NavLink } from "react-router-dom";

export default function Sidebar({ routes = [] }) {
    return (
        <nav className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm p-3">
            <ul className="space-y-1">
                {routes.map(({ label, path }) => (
                    <li key={path}>
                        <NavLink
                            to={path}
                            className={({ isActive }) =>
                                [
                                    "block rounded-lg px-3 py-2 text-sm transition",
                                    isActive
                                        ? "bg-sky-600 text-white"
                                        : "hover:bg-slate-100 dark:hover:bg-slate-800",
                                ].join(" ")
                            }
                            end
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
