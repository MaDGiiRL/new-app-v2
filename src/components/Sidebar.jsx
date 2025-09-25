import { NavLink } from "react-router-dom";

export default function Sidebar({ routes = [] }) {
    // Raggruppa per categoria
    const groupedRoutes = routes.reduce((acc, route) => {
        acc[route.category] = acc[route.category] || [];
        acc[route.category].push(route);
        return acc;
    }, {});

    return (
        <nav className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm p-3">
            {Object.entries(groupedRoutes).map(([category, items]) => (
                <div key={category} className="mb-4">
                    <h2 className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2 px-2">
                        {category}
                    </h2>
                    <ul className="space-y-1">
                        {items.map(({ label, path, icon: Icon }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        [
                                            "flex capitalize items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                                            isActive
                                                ? "bg-sky-600 text-white"
                                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                                        ].join(" ")
                                    }
                                    end
                                    title={label}
                                    aria-label={label}
                                >
                                    {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden /> : null}
                                    <span className="truncate">{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}
