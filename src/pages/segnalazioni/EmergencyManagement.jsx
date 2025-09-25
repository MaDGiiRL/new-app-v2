import React, { useEffect, useMemo, useRef, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Layers,
  RefreshCcw,
  XCircle,
  Info,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
} from "lucide-react";

// Leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

/* ------------------------------ UI primitives ------------------------------ */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/70 dark:bg-slate-900/60",
        className
      )}
      {...p}
    />
  );
}

function Button({ children, className, variant = "primary", ...props }) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
    info:
      "bg-sky-600 text-white hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500",
    warning:
      "bg-amber-500 text-white hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500",
    default:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500",
  };
  return (
    <button className={cn("inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition disabled:opacity-60", variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
      <input type="checkbox" className="h-4 w-4" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
      {label}
    </label>
  );
}

/* ------------------------------ Mock scenarios ----------------------------- */
// Semplici poligoni/cerchi demo localizzati in Veneto; sostituibili con GeoJSON reali
const SCENARIOS = [
  {
    id: "sc-01",
    name: "Alluvione Po Ott 2024",
    type: "alluvione",
    color: "#1d4ed8",
    features: [
      { kind: "polygon", latlngs: [[45.07, 11.75], [45.02, 11.95], [45.1, 12.08], [45.18, 11.9]] },
      { kind: "circle", center: [45.05, 11.85], radius: 8000 },
    ],
  },
  {
    id: "sc-02",
    name: "Incendio Colli Euganei Ago 2025",
    type: "incendio",
    color: "#ea580c",
    features: [
      { kind: "circle", center: [45.33, 11.69], radius: 5000 },
      { kind: "polygon", latlngs: [[45.35, 11.62], [45.37, 11.72], [45.31, 11.74]] },
    ],
  },
  {
    id: "sc-03",
    name: "Frana Bellunese Gen 2025",
    type: "frana",
    color: "#16a34a",
    features: [
      { kind: "polygon", latlngs: [[46.18, 12.1], [46.14, 12.2], [46.22, 12.26], [46.25, 12.18]] },
    ],
  },
];

/* ------------------------------- Leaflet map ------------------------------- */
function useFullscreen(ref) {
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const onChange = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  };
  return { fs, toggle };
}

function MultiScenarioMap({ active, opacity, showLabels }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef(new Map()); // scenarioId -> L.LayerGroup
  const { fs, toggle } = useFullscreen(containerRef);

  // init
  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current, { center: [45.55, 11.55], zoom: 8 });
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);
    return () => map.remove();
  }, []);

  // draw/update layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // remove missing scenarios
    for (const [id, group] of layersRef.current.entries()) {
      if (!active.find((s) => s.id === id)) {
        group.remove();
        layersRef.current.delete(id);
      }
    }

    // add/update scenarios
    active.forEach((sc) => {
      let group = layersRef.current.get(sc.id);
      if (!group) {
        group = L.layerGroup().addTo(map);
        layersRef.current.set(sc.id, group);
      } else {
        group.clearLayers();
      }

      const style = { color: sc.color, fillColor: sc.color, fillOpacity: opacity, weight: 2 };
      sc.features.forEach((f, i) => {
        let layer;
        if (f.kind === "polygon") layer = L.polygon(f.latlngs, style);
        else if (f.kind === "circle") layer = L.circle(f.center, { ...style, radius: f.radius });
        if (layer) {
          layer.addTo(group);
          if (showLabels) layer.bindTooltip(`${sc.name}`, { permanent: true, direction: "center", className: "bg-white/80 rounded px-1 py-0.5" });
        }
      });
    });

    // fit bounds to active
    const all = Array.from(layersRef.current.values()).flatMap((g) => g.getLayers());
    if (all.length) {
      const fg = L.featureGroup(all);
      map.fitBounds(fg.getBounds().pad(0.1));
    }
  }, [active, opacity, showLabels]);

  return (
    <div className="relative">
      <div ref={containerRef} className="h-[600px] w-full rounded-lg" />
      <div className="pointer-events-none absolute left-2 top-2 z-[1000] flex gap-2">
        <Button variant="default" className="pointer-events-auto" onClick={() => {
          const map = mapRef.current; if (!map) return; map.setView([45.55, 11.55], 8);
        }}>Reset vista</Button>
        <Button variant="default" className="pointer-events-auto" onClick={toggle}>
          {fs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />} Schermo Intero
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------ Side panels ------------------------------ */
function ScenarioList({ title, items, actionLabel, onAction, emptyIcon = <Layers className="h-5 w-5" />, emptyText }) {
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">
        <div className="inline-flex items-center gap-2"><Layers className="h-4 w-4" /> {title} <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">{items.length}</span></div>
      </div>
      <div className="p-3">
        {items.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            {emptyIcon}
            <br />
            {emptyText}
          </p>
        ) : (
          <ul className="grid max-h-[260px] gap-2 overflow-auto pr-1">
            {items.map((s) => (
              <li key={s.id} className="rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{ background: s.color }} /> {s.name}</span>
                  {onAction && (
                    <Button variant="default" onClick={() => onAction(s)}>{actionLabel}</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function LegendActive({ items }) {
  return (
    <Card>
      <div className="border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">Legenda Attiva</div>
      <div className="p-3">
        {items.length === 0 ? (
          <p className="text-center text-sm text-slate-500"><EyeOff className="mx-auto mb-1 h-5 w-5" /> Nessuno scenario selezionato</p>
        ) : (
          <ul className="grid gap-2">
            {items.map((s) => (
              <li key={s.id} className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{ background: s.color }} /> {s.name}</span>
                <span className="text-xs uppercase text-slate-500">{s.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function StatsPanel({ items, areaKm = 0, comuni = 0 }) {
  return (
    <Card>
      <div className="border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">Statistiche</div>
      <div className="p-3 grid gap-2 text-sm">
        <div className="flex justify-between"><span>Scenari attivi:</span><span className="font-medium">{items.length}</span></div>
        <div className="flex justify-between"><span>Aree totali:</span><span className="font-medium">{items.reduce((a, s) => a + s.features.length, 0)}</span></div>
        <div className="flex justify-between"><span>Superficie coperta:</span><span className="font-medium">{areaKm.toLocaleString()} km²</span></div>
        <div className="flex justify-between"><span>Comuni interessati:</span><span className="font-medium">{comuni}</span></div>
      </div>
    </Card>
  );
}

/* ------------------------------- Main screen ------------------------------- */
export default function EmergencyManagement() {
  const [available, setAvailable] = useState(SCENARIOS);
  const [selected, setSelected] = useState([]);
  const [showComuni, setShowComuni] = useState(true); // (placeholder)
  const [showOverlaps, setShowOverlaps] = useState(true); // (placeholder)
  const [showLabels, setShowLabels] = useState(false);
  const [opacity, setOpacity] = useState(0.6);

  const addToAnalysis = (s) => {
    if (selected.find((x) => x.id === s.id)) return;
    setSelected((prev) => [...prev, s]);
  };
  const removeFromAnalysis = (s) => setSelected((prev) => prev.filter((x) => x.id !== s.id));

  const refresh = () => {
    // qui potresti ricaricare da API; per ora finto loader
    setAvailable([...SCENARIOS]);
  };

  const clearAll = () => setSelected([]);

  return (
    <PageShell title="Emergency Management">
      {/* Info */}
      <Card className="mb-4 p-4">
        <div className="flex items-start gap-2 text-blue-700 dark:text-blue-300">
          <Info className="mt-0.5 h-5 w-5" />
          <p className="text-sm">
            <strong>Analisi Multi-Scenario:</strong> Visualizza e confronta più scenari di emergenza contemporaneamente. Seleziona gli scenari desiderati per identificare zone critiche, sovrapposizioni e pianificare interventi coordinati.
          </p>
        </div>
      </Card>

      {/* Toolbar */}
      <Card className="mb-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-sm font-semibold"><Layers className="h-4 w-4" /> Strumenti Gestione Emergenze</div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={refresh}><RefreshCcw className="h-4 w-4" /> Aggiorna</Button>
            <Button variant="warning" onClick={clearAll}><XCircle className="h-4 w-4" /> Pulisci Tutto</Button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <span className="text-sm font-medium">Opzioni Visualizzazione</span>
            <Toggle checked={showComuni} onChange={setShowComuni} label={"Mostra confini comuni (placeholder)"} />
            <Toggle checked={showOverlaps} onChange={setShowOverlaps} label={"Evidenzia sovrapposizioni (placeholder)"} />
            <Toggle checked={showLabels} onChange={setShowLabels} label={"Mostra etichette aree"} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Trasparenza layer: <span className="ml-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">{opacity.toFixed(1)}</span></label>
            <input type="range" min={0.3} max={1} step={0.1} value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
          </div>
        </div>
      </Card>

      {/* Map + side panels */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="mb-2 text-sm font-semibold">Mappa Multi-Scenario</div>
            <MultiScenarioMap active={selected} opacity={opacity} showLabels={showLabels} />
          </Card>
        </div>
        <div className="grid gap-4">
          <ScenarioList
            title="Ricerca e Selezione Scenari"
            items={available.filter((s) => !selected.find((x) => x.id === s.id))}
            actionLabel="Aggiungi"
            onAction={addToAnalysis}
            emptyText={"Nessuno scenario disponibile (crea nuovi scenari nella pagina dedicata)"}
          />

          <Card>
            <div className="flex items-center justify-between border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">
              <div>Scenari in Analisi <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">{selected.length}</span></div>
            </div>
            <div className="p-3">
              {selected.length === 0 ? (
                <p className="text-center text-sm text-slate-500"><Layers className="mx-auto mb-1 h-5 w-5" /> Seleziona scenari sopra per aggiungerli all'analisi</p>
              ) : (
                <ul className="grid max-h-[220px] gap-2 overflow-auto pr-1">
                  {selected.map((s) => (
                    <li key={s.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700">
                      <span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full" style={{ background: s.color }} /> {s.name}</span>
                      <Button variant="default" onClick={() => removeFromAnalysis(s)}>Rimuovi</Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          <LegendActive items={selected} />
          <StatsPanel items={selected} areaKm={0} comuni={0} />
        </div>
      </div>
    </PageShell>
  );
}