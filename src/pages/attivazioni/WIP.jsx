import React from "react";
import { Info } from "lucide-react";

function cn(...c){ return c.filter(Boolean).join(" "); }
function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
        className
      )}
      {...p}
    />
  );
}

export default function WIP() {
  return (
    <div className="p-4 lg:p-6">
      <Card className="p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          <Info className="h-5 w-5 text-blue-500" />
          Pagina in costruzione
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Questa sezione sarà presto disponibile. Nel frattempo puoi usare le voci già attive nel menu.
        </p>
      </Card>
    </div>
  );
}
