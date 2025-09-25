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

const COC = [
  { id: 1, lat: 45.44, lng: 12.33, comune: "Venezia", stato: "aperta h24" },
  { id: 2, lat: 45.41, lng: 11.88, comune: "Padova", stato: "aperta orario diurno" },
  { id: 3, lat: 45.55, lng: 11.55, comune: "Vicenza", stato: "chiusa" },
];

function ensureLeafletCSS() {
  if (document.querySelector('link[data-leaflet]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-leaflet", "true");
  document.head.appendChild(link);
}

export default function MappaStatoCOC() {
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

      const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      const carto = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd", maxZoom: 19, attribution: "&copy; OSM • CARTO",
      });
      const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17, attribution: "&copy; OSM, SRTM • © OpenTopoMap (CC-BY-SA)",
      });

      const coc = L.layerGroup(); layerRef.current = coc; coc.addTo(map);

      L.control.layers(
        { "OpenStreetMap": base, "Carto Light": carto, "OpenTopoMap": topo },
        { "COC (stato)": coc }
      ).addTo(map);
      L.control.scale({ metric: true, imperial: false }).addTo(map);

      addLegend(map);
      render(COC);
    })();
    return () => { ok = false; mapRef.current?.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function colorFor(stato) {
    if (stato === "aperta h24") return "#16a34a";          // green
    if (stato === "aperta orario diurno") return "#eab308"; // amber
    return "#94a3b8";                                       // slate/chiusa
  }

  function addLegend(map) {
    const L = Lref.current; if (!L) return;
    const ctl = L.control({ position: "bottomright" });
    ctl.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.style.cssText =
        "padding:10px 12px;background:rgba(255,255,255,.9);backdrop-filter:blur(6px);" +
        "border:1px solid rgba(15,23,42,.12);border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.08);" +
        "font:12px/1.35 system-ui,Segoe UI,Roboto,Arial;color:#0f172a;min-width:180px;";
      const item = (color, label) =>
        `<div style="display:flex;align-items:center;gap:8px;margin:4px 0;">
           <span style="display:inline-block;width:12px;height:12px;border-radius:999px;background:${color};border:1px solid #0f172a22"></span>
           <span>${label}</span>
         </div>`;
      div.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px;">Legenda</div>
        ${item("#16a34a", "COC aperta h24")}
        ${item("#eab308", "COC aperta orario diurno")}
        ${item("#94a3b8", "COC chiusa")}
      `;
      L.DomEvent.disableClickPropagation(div);
      return div;
    };
    ctl.addTo(map);
  }

  function render(data) {
    const L = Lref.current, layer = layerRef.current, map = mapRef.current; if (!L || !layer) return;
    layer.clearLayers();
    data.forEach(d => {
      const c = colorFor(d.stato);
      L.circleMarker([d.lat, d.lng], { radius: 9, weight: 2, color: "#0f172a", opacity: 0.8, fillColor: c, fillOpacity: 0.85 })
        .bindPopup(`<strong>${d.comune}</strong><br/>Stato COC: ${d.stato}`)
        .addTo(layer);
    });
    if (layer.getLayers().length) {
      const b = L.featureGroup(layer.getLayers()).getBounds();
      map.fitBounds(b.pad(0.2));
    }
  }

  return (
    <PageShell title="Mappa stato COC">
      <Card className="p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">Stato operativo dei COC (mock).</p>
        <div ref={ref} className="mt-3 w-full rounded-xl" style={{ height: "70vh", minHeight: 420 }} />
      </Card>
    </PageShell>
  );
}
