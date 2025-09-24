import { Link } from "react-router-dom";
import { getIconFor } from "../routes/sections";
import { ChevronRight } from "lucide-react";

function toSentenceCase(str) {
    if (!str) return "";
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export default function SectionCard({ item }) {
    const Icon = getIconFor(item.slug);
    const href = item.slug === "segnalazioni" ? "/segnalazioni" : `/app/${item.slug}`;

    return (
        <Link
            to={href}
            aria-label={`Apri la sezione ${item.title}`}
            className={[
                "group block rounded-2xl overflow-hidden relative",
                "bg-gradient-to-br from-white via-sky-50 to-sky-100",
                "dark:from-slate-900 dark:via-slate-950 dark:to-blue-950",
                "border border-slate-200/70 dark:border-slate-800/70",
                "ring-1 ring-slate-900/5 dark:ring-white/5",
                "pt-4 pb-6 sm:pt-5 sm:pb-7 px-6 sm:px-7",
                "shadow-sm hover:shadow-lg transition hover:-translate-y-0.5",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 dark:focus-visible:ring-sky-500/60",
            ].join(" ")}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
                style={{
                    background:
                        "radial-gradient(1200px 400px at -10% -10%, rgba(56,189,248,0.18), transparent 60%)",
                }}
            />
            <div className="flex items-center gap-4 relative">
                <div
                    className={[
                        "size-12 sm:size-14 flex items-center justify-center shrink-0 rounded-xl",
                        "border border-slate-200 dark:border-slate-800",
                        "bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300",
                        "dark:from-slate-800 dark:via-slate-900 dark:to-blue-900",
                        "shadow-[inset_0_1px_0_rgba(255,255,255,.6)] dark:shadow-none",
                        "transition-transform group-hover:-translate-y-0.5",
                    ].join(" ")}
                >
                    <Icon className="h-6 w-6 text-sky-700 dark:text-sky-300" />
                </div>

                <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold capitalize leading-snug text-slate-900 dark:text-slate-100 whitespace-normal break-words">
                        {toSentenceCase(item.title)}
                    </h3>
                    <p className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">Vai alla sezione</p>
                </div>

                <div className="ml-auto translate-x-0 group-hover:translate-x-1 transition-transform">
                    <div
                        className={[
                            "size-8 sm:size-9 rounded-full flex items-center justify-center",
                            "border border-slate-200 dark:border-slate-800",
                            "bg-gradient-to-br from-white via-slate-100 to-slate-200",
                            "dark:from-slate-800 dark:via-slate-900 dark:to-slate-950",
                        ].join(" ")}
                    >
                        <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
