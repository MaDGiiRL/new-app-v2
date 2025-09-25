import { useParams, Link } from "react-router-dom";
import { sections, getIconFor } from "../routes/sections";
import { lazy, Suspense } from "react";

/** Rimuove suffissi numerici tipo "-2" generati per i duplicati */
const canonicalizeSlug = (s = "") => s.replace(/-\d+$/, "");

/** Registry delle pagine dedicate (slug canonico → componente lazy) */
const SpecialPages = {
  // Attivazioni 2.0
  "attivazioni-20": lazy(() => import("../pages/attivazioni/AttivazioniPage")),


};

export default function SectionPage() {
  const { slug: rawSlug } = useParams();
  const slug = canonicalizeSlug(rawSlug);

  // caso speciale: segnalazioni con messaggio + link (se mantieni il redirect in App.jsx puoi anche rimuovere questo blocco)
  if (slug === "segnalazioni") {
    return (
      <div className="container max-w-5xl py-10">
        <h2 className="text-xl font-semibold mb-2">La sezione Segnalazioni è stata spostata</h2>
        <p className="mb-3">Ora è disponibile nella nuova area dedicata.</p>
        <Link className="text-sky-600 hover:underline" to="/segnalazioni">
          Vai a /segnalazioni
        </Link>
      </div>
    );
  }

  // se esiste una pagina dedicata per questo slug, renderizzala
  if (slug && SpecialPages[slug]) {
    const Page = SpecialPages[slug];
    return (
      <Suspense fallback={<div className="container max-w-5xl py-10">Caricamento…</div>}>
        <Page />
      </Suspense>
    );
  }

  // fallback: sezione generica (placeholder)
  const item = sections.find((s) => canonicalizeSlug(s.slug) === slug);
  const Icon = getIconFor(slug);

  if (!item) {
    return (
      <div className="container max-w-5xl py-10">
        <h2 className="text-xl font-semibold mb-2">Sezione non trovata</h2>
        <Link className="text-sky-600 hover:underline" to="/app">
          Torna al pannello
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-2">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold capitalize">{item.title}</h1>
          <p className="text-sm opacity-70 mt-0.5">/app/{slug}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 bg-white/60 dark:bg-slate-900/60">
        <p className="opacity-90">
          <strong>Pagina in costruzione:</strong> qui potrai inserire liste, filtri, form e grafici.
          Attualmente l’app è solo frontend (nessun database collegato).
        </p>
      </div>
    </div>
  );
}
