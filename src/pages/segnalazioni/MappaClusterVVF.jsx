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

/** Mock cluster per CAP */
const CLUSTERS = [
  { id: "CAP-37100", lat: 45.44, lng: 10.99, cap: "37100", count: 28 },
  { id: "CAP-30100", lat: 45.44, lng: 12.33, cap: "30100", count: 17 },
  { id: "CAP-31100", lat: 45.67, lng: 12.24, cap: "31100", count: 9 },
];

function ensureLeafletCSS() {
  if (document.querySelector('link[data-leaflet]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-leaflet", "true");
  document.head.appendChild(link);
}

export default function MappaClusterCAPVVF() {
  const ref = useRef(null);
  const Lref = useRef(null);
  const mapRef = useRef();
  const layerRef = useRef();

  useEffect(() => {
    let ok = true;
    (async () => {
      ensureLeafletCSS();
      const L = await import("leaflet"); if (!ok) return;
      Lref.current = L;

      const map = L.map(ref.current, { center: [45.49, 11.88], zoom: 8 });
      mapRef.current = map;

      const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OSM" }).addTo(map);
      const carto = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "&copy; OSM • CARTO" });

      const clusters = L.layerGroup(); layerRef.current = clusters; clusters.addTo(map);

      L.control.layers({ "OpenStreetMap": base, "Carto Light": carto }, { "Cluster CAP VVF": clusters }).addTo(map);
      L.control.scale({ metric: true, imperial: false }).addTo(map);

      addLegend(map);
      render(CLUSTERS);
    })();
    return () => { ok = false; mapRef.current?.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addLegend(map) {
    const L = Lref.current; if (!L) return;
    const ctl = L.control({ position: "bottomright" });
    ctl.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.style.cssText =
        "padding:10px 12px;background:rgba(255,255,255,.9);backdrop-filter:blur(6px);" +
        "border:1px solid rgba(15,23,42,.12);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.08);" +
        "font:12px/1.35 system-ui,Segoe UI,Roboto,Arial;color:#0f172a;min-width:220px;";
      const dot = (c) => `<span style="display:inline-block;width:12px;height:12px;border-radius:999px;background:${c};border:1px solid #0f172a22"></span>`;
      div.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px;">Legenda</div>
        <div style="display:grid;row-gap:6px;">
          <div style="display:flex;align-items:center;gap:8px;">${dot("#22c55e")} <span>Basso numero interventi</span></div>
          <div style="display:flex;align-items:center;gap:8px;">${dot("#f59e0b")} <span>Medio numero interventi</span></div>
          <div style="display:flex;align-items:center;gap:8px;">${dot("#ef4444")} <span>Alto numero interventi</span></div>
          <div style="font-size:11px;color:#334155;margin-top:4px;">Dimensione del cerchio proporzionale al conteggio.</div>
        </div>
      `;
      L.DomEvent.disableClickPropagation(div);
      return div;
    };
    ctl.addTo(map);
  }

  function render(data) {
    const L = Lref.current, layer = layerRef.current, map = mapRef.current; if (!L || !layer) return;
    layer.clearLayers();

    const max = Math.max(...data.map(d => d.count));
    data.forEach(d => {
      const r = 12 + (d.count / max) * 18;
      const fill = d.count > max * 0.66 ? "#ef4444" : d.count > max * 0.33 ? "#f59e0b" : "#22c55e";
      L.circleMarker([d.lat, d.lng], { radius: r, color: "#0f172a", weight: 2, fillColor: fill, fillOpacity: 0.8, opacity: 0.9 })
        .bindPopup(`<strong>CAP ${d.cap}</strong><br/>Interventi: ${d.count}`)
        .addTo(layer);
    });

    if (layer.getLayers().length) {
      const b = L.featureGroup(layer.getLayers()).getBounds();
      map.fitBounds(b.pad(0.2));
    }
  }

  return (
    <PageShell title="Mappa cluster eventi VVF (CAP)">
      <Card className="p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">Cerchi proporzionali agli interventi per CAP (mock).</p>
        <div ref={ref} className="mt-3 w-full rounded-xl" style={{ height: "70vh", minHeight: 420 }} />
      </Card>
    </PageShell>
  );
}
