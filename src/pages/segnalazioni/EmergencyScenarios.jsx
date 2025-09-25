import React, { useEffect, useMemo, useRef, useState } from "react";
import PageShell from "../../components/_PageShell";
import {
  Pencil,
  Circle as IconCircle,
  Edit3,
  Save,
  FolderOpen,
  Trash2,
  Grid3X3,
  Maximize2,
  Minimize2,
  Info,
  MapPin,
  Layers,
} from "lucide-react";

// Leaflet + Draw
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // estende L con L.Control.Draw

/* ---------------------------------- UI kit --------------------------------- */
function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function Card({ className, ...p }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900",
        className
      )}
      {...p}
    />
  );
}

function Button({ children, className, variant = "primary", ...props }) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
    info:
      "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600",
    warning:
      "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    default:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-lg border px-3 text-sm",
        "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400",
        props.className
      )}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-24 w-full rounded-lg border px-3 py-2 text-sm",
        "border-slate-300 bg-white text-slate-900 placeholder:text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400",
        props.className
      )}
    />
  );
}

/* ------------------------------- Leaflet Map ------------------------------- */
const DEFAULT_CENTER = [45.55, 11.55];
const DEFAULT_ZOOM = 8;

function useFullscreen(containerRef) {
  const [isFs, setIsFs] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [containerRef]);
  const toggle = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  };
  return { isFs, toggle };
}

function EmergencyMap({ onLayersChange }) {
  const mapRef = useRef(null);
  const drawnRef = useRef(null); // L.FeatureGroup
  const drawControlRef = useRef(null);
  const containerRef = useRef(null);
  const { isFs, toggle } = useFullscreen(containerRef);

  useEffect(() => {
    // init map
    const map = L.map(containerRef.current, {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });
    mapRef.current = map;

    // tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // drawn items layer
    const drawn = new L.FeatureGroup();
    drawnRef.current = drawn;
    map.addLayer(drawn);

    // draw controls
    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        polygon: true,
        rectangle: true,
        circle: true,
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: { featureGroup: drawn },
    });
    drawControlRef.current = drawControl;
    map.addControl(drawControl);

    // events
    map.on(L.Draw.Event.CREATED, (e) => {
      drawn.addLayer(e.layer);
      onLayersChange?.(serializeLayers(drawn));
    });
    map.on(L.Draw.Event.EDITED, () => onLayersChange?.(serializeLayers(drawn)));
    map.on(L.Draw.Event.DELETED, () => onLayersChange?.(serializeLayers(drawn)));

    return () => map.remove();
  }, [onLayersChange]);

  const api = useMemo(
    () => ({
      drawPolygon: () => new L.Draw.Polygon(mapRef.current, {}).enable(),
      drawCircle: () => new L.Draw.Circle(mapRef.current, {}).enable(),
      enableEdit: () => drawControlRef.current._toolbars["edit"].enable(),
      clearAll: () => {
        drawnRef.current.clearLayers();
        onLayersChange?.([]);
      },
      fitBounds: () => {
        const g = drawnRef.current;
        if (!g || g.getLayers().length === 0) return;
        mapRef.current.fitBounds(g.getBounds(), { padding: [20, 20] });
      },
    }),
    [onLayersChange]
  );

  return (
    <div className="relative">
      <div ref={containerRef} className="h-[600px] w-full rounded-lg" />
      <div className="pointer-events-none absolute left-2 top-2 z-[1000] flex gap-2">
        <Button variant="default" className="pointer-events-auto" onClick={api.fitBounds}>
          <Grid3X3 className="h-4 w-4" /> Centra Aree
        </Button>
        <Button variant="default" className="pointer-events-auto" onClick={toggle}>
          {isFs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />} Schermo Intero
        </Button>
      </div>
      <Toolbar api={api} />
    </div>
  );
}

function serializeLayers(featureGroup) {
  const layers = [];
  featureGroup.eachLayer((l) => {
    if (l instanceof L.Polygon && !(l instanceof L.Rectangle)) {
      layers.push({ type: "polygon", latlngs: l.getLatLngs() });
    } else if (l instanceof L.Rectangle) {
      layers.push({ type: "rectangle", bounds: l.getBounds() });
    } else if (l instanceof L.Circle) {
      layers.push({ type: "circle", center: l.getLatLng(), radius: l.getRadius() });
    }
  });
  return layers;
}

/* ------------------------------- Top Toolbar ------------------------------- */
function Toolbar({ api }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <Button onClick={api.drawPolygon}>
        <Pencil className="h-4 w-4" /> Disegna Area
      </Button>
      <Button variant="info" onClick={api.drawCircle}>
        <IconCircle className="h-4 w-4" /> Disegna Cerchio
      </Button>
      <Button variant="warning" onClick={api.enableEdit}>
        <Edit3 className="h-4 w-4" /> Modifica Aree
      </Button>
      <Button variant="danger" onClick={api.clearAll}>
        <Trash2 className="h-4 w-4" /> Pulisci Tutto
      </Button>
    </div>
  );
}

/* ----------------------------- Right side panel ---------------------------- */
function SidePanel({ areas, onAddArea, list }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    desc: "",
    priority: "3",
    active: true,
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.type) return;
    onAddArea?.({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setForm({ name: "", type: "", desc: "", priority: "3", active: true });
  };

  return (
    <div className="grid gap-4">
      {/* Nuova Area */}
      <Card>
        <div className="border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">Nuova Area</div>
        <div className="p-3">
          <form onSubmit={submit} className="grid gap-3">
            <label className="text-sm">Nome Area:<Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Es. Zona Alluvione Centro" required /></label>
            <label className="text-sm">Tipo Area:
              <select
                className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                required
              >
                <option value="">Seleziona tipo…</option>
                <option value="danger-high">Pericolo Alto</option>
                <option value="danger-medium">Pericolo Medio</option>
                <option value="danger-low">Pericolo Basso</option>
                <option value="safe">Zona Sicura</option>
                <option value="evacuation">Area Evacuazione</option>
              </select>
            </label>
            <label className="text-sm">Descrizione:<Textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Descrizione dell'area e dei rischi…" /></label>
            <label className="text-sm">Priorità:
              <select
                className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="1">Bassa</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
                <option value="4">Critica</option>
              </select>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Area attiva
            </label>
            <Button type="submit">
              <Save className="h-4 w-4" /> Aggiungi Area
            </Button>
          </form>
        </div>
      </Card>

      {/* Aree create */}
      <Card>
        <div className="flex items-center justify-between border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">
          <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Aree Create</div>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">{areas.length}</span>
        </div>
        <div className="p-3">
          {areas.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              <MapPin className="mx-auto mb-1 h-5 w-5 opacity-70" />
              Nessuna area creata
            </p>
          ) : (
            <ul className="grid gap-2 max-h-[320px] overflow-auto pr-1">
              {areas.map((a) => (
                <li key={a.id} className="rounded-lg border border-slate-200 p-2 text-sm dark:border-slate-700">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-slate-500">{a.type} • Priorità {a.priority} • {a.active ? "Attiva" : "Disattiva"}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      {/* Legenda */}
      <Card>
        <div className="border-b border-slate-200 p-3 text-sm font-semibold dark:border-slate-800">Legenda</div>
        <div className="p-3">
          <Legend />
        </div>
      </Card>
    </div>
  );
}

function Dot({ color, border }) {
  return (
    <span
      className="inline-block h-3 w-3 rounded-full border"
      style={{ background: color, borderColor: border }}
    />
  );
}

function Legend() {
  return (
    <div className="grid gap-2 text-sm">
      <div className="flex items-center gap-2"><Dot color="rgba(255,0,0,.6)" border="#cc0000" /> Pericolo Alto</div>
      <div className="flex items-center gap-2"><Dot color="rgba(255,165,0,.6)" border="#cc8800" /> Pericolo Medio</div>
      <div className="flex items-center gap-2"><Dot color="rgba(255,255,0,.6)" border="#cccc00" /> Pericolo Basso</div>
      <div className="flex items-center gap-2"><Dot color="rgba(0,255,0,.6)" border="#00cc00" /> Zona Sicura</div>
      <div className="flex items-center gap-2"><Dot color="rgba(128,0,128,.6)" border="#800080" /> Area Evacuazione</div>
    </div>
  );
}

/* ---------------------------- Save scenario modal --------------------------- */
function SaveModal({ open, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "", desc: "", type: "" });
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[10000]">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <div className="border-b border-slate-200 p-4 text-lg font-semibold dark:border-slate-800">Salva Scenario di Emergenza</div>
          <div className="grid gap-3 p-4">
            <label className="text-sm">Nome Scenario:<Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Es: Alluvione Po Ottobre 2024" required /></label>
            <label className="text-sm">Descrizione:<Textarea rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Descrizione dettagliata dello scenario…" /></label>
            <label className="text-sm">Tipo Emergenza:
              <select
                className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                required
              >
                <option value="">Seleziona tipo…</option>
                <option value="alluvione">Alluvione</option>
                <option value="frana">Frana</option>
                <option value="incendio">Incendio</option>
                <option value="terremoto">Terremoto</option>
                <option value="neve">Emergenza Neve</option>
                <option value="altro">Altro</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-200 p-4 dark:border-slate-800">
            <Button variant="default" onClick={onClose}>Annulla</Button>
            <Button onClick={() => onConfirm?.(form)}>
              <Save className="h-4 w-4" /> Salva Scenario
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------ Main component ------------------------------ */
export default function EmergencyScenarios() {
  const [layers, setLayers] = useState([]); // geometrie disegnate
  const [areas, setAreas] = useState([]); // lista laterale
  const [openSave, setOpenSave] = useState(false);

  const addArea = (a) => setAreas((s) => [a, ...s]);

  const saveScenario = (meta) => {
    const payload = { meta, layers, areas, savedAt: new Date().toISOString() };
    console.log("Scenario salvato", payload);
    setOpenSave(false);
    alert("Scenario salvato (stub). Vedi console.");
  };

  return (
    <PageShell title="Emergency scenarios">
      {/* Info banner */}
      <Card className="mb-4 p-4">
        <div className="flex items-start gap-2 text-blue-700 dark:text-blue-400">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            <strong>Gestione Aree di Emergenza:</strong> Utilizza gli strumenti di disegno per creare aree di pericolo, zone sicure e aree di evacuazione. Puoi sovrapporre più aree e assegnare diversi livelli di rischio. Le aree possono essere salvate e gestite nel tempo.
          </p>
        </div>
      </Card>

      {/* Toolbar azioni principali */}
      <Card className="mb-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex flex-wrap gap-2">
            <Layers className="mr-1 h-4 w-4 opacity-70" /> Strumenti Gestione Emergenze
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => document.getElementById("map-anchor")?.scrollIntoView({ behavior: "smooth" })}>
              <MapPin className="h-4 w-4" /> Vai alla mappa
            </Button>
            <Button variant="success" onClick={() => setOpenSave(true)}>
              <Save className="h-4 w-4" /> Salva Scenario
            </Button>
            <Button variant="default">
              <FolderOpen className="h-4 w-4" /> Carica Scenario
            </Button>
          </div>
        </div>
      </Card>

      {/* Map + side panel */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="p-4">
            <div className="mb-2 text-sm font-semibold">Mappa Aree di Emergenza</div>
            <div id="map-anchor" />
            <EmergencyMap onLayersChange={setLayers} />
          </Card>
        </div>
        <div>
          <SidePanel areas={areas} onAddArea={addArea} />
        </div>
      </div>

      <SaveModal open={openSave} onClose={() => setOpenSave(false)} onConfirm={saveScenario} />
    </PageShell>
  );
}