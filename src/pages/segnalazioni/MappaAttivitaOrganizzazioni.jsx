import React, { useEffect, useRef } from "react";
import PageShell from "../../components/_PageShell";

/* mini-UI */
function cn(...c) { return c.filter(Boolean).join(" "); }
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

/** Mock aree attività */
const ZONE = [
  { id: "A", name: "Area intervento – Valdobbiadene", coords: [[45.912, 12.015], [45.905, 12.061], [45.882, 12.042], [45.890, 11.998]], livello: "alto" },
  { id: "B", name: "Area supporto – Bussolengo", coords: [[45.492, 10.852], [45.488, 10.889], [45.470, 10.880], [45.473, 10.842]], livello: "medio" },
];

function ensureLeafletCSS() {
  if (document.querySelector('link[data-leaflet]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-leaflet", "true");
  document.head.appendChild(link);
}

export default function MappaZoneAttivita() {
  const ref = useRef(null);
  const Lref = useRef(null);
  const mapRef = useRef();
  const layerRef = useRef();

  useEffect(() => {
    let running = true;
    (async () => {
      ensureLeafletCSS();
      const L = await import("leaflet"); if (!running) return;
      Lref.current = L;

      const map = L.map(ref.current, { center: [45.6, 11.7], zoom: 8 });
      mapRef.current = map;

      const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OSM" }).addTo(map);
      const carto = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "&copy; OSM • CARTO" });

      const zone = L.layerGroup(); layerRef.current = zone; zone.addTo(map);

      L.control.layers({ "OpenStreetMap": base, "Carto Light": carto }, { "Zone attività": zone }).addTo(map);
      L.control.scale({ metric: true, imperial: false }).addTo(map);

      addLegend(map);
      render(ZONE);
    })();
    return () => { running = false; mapRef.current?.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function styleFor(livello) {
    if (livello === "alto") return { color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.25 };
    if (livello === "medio") return { color: "#f59e0b", fillColor: "#f59e0b", fillOpacity: 0.25 };
    return { color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.25 };
  }

  function addLegend(map) {
    const L = Lref.current; if (!L) return;
    const ctl = L.control({ position: "bottomright" });
    ctl.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.style.cssText =
        "padding:10px 12px;background:rgba(255,255,255,.9);backdrop-filter:blur(6px);" +
        "border:1px solid rgba(15,23,42,.12);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.08);" +
        "font:12px/1.35 system-ui,Segoe UI,Roboto,Arial;color:#0f172a;min-width:200px;";
      const chip = (c, t) =>
        `<span style="display:inline-flex;align-items:center;gap:8px;margin:4px 0;">
           <span style="display:inline-block;width:14px;height:10px;border-radius:3px;background:${c};border:1px solid #0f172a22"></span>
           <span>${t}</span>
         </span>`;
      div.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px;">Legenda</div>
        <div style="display:grid;row-gap:4px;">
          ${chip("#ef4444", "Livello alto")}
          ${chip("#f59e0b", "Livello medio")}
          ${chip("#22c55e", "Livello basso")}
        </div>
        <div style="border-top:1px dashed #cbd5e1;margin:8px 0;"></div>
        <div style="font-size:11px;color:#334155;">Clicca sui poligoni per nome area e livello.</div>
      `;
      L.DomEvent.disableClickPropagation(div);
      return div;
    };
    ctl.addTo(map);
  }

  function render(data) {
    const L = Lref.current, layer = layerRef.current, map = mapRef.current; if (!L || !layer) return;
    layer.clearLayers();
    data.forEach(z => {
      const s = styleFor(z.livello);
      L.polygon(z.coords, { weight: 2, ...s })
        .bindPopup(`<strong>${z.name}</strong><br/>Livello: ${z.livello}`)
        .addTo(layer);
    });
    if (layer.getLayers().length) {
      const b = L.featureGroup(layer.getLayers()).getBounds();
      map.fitBounds(b.pad(0.2));
    }
  }

  return (
    <PageShell title="Mappa attività organizzazioni">
      <Card className="p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">Poligoni delle zone operative (mock).</p>
        <div ref={ref} className="mt-3 w-full rounded-xl" style={{ height: "70vh", minHeight: 420 }} />
      </Card>
    </PageShell>
  );
}
