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

const INTERVENTI = [
  { id: 1, lat: 45.553, lng: 11.540, tipo: "Alberi/rami", comando: "VR", ts: "24/09/2025 22:15" },
  { id: 2, lat: 45.658, lng: 12.245, tipo: "Allagamenti", comando: "TV", ts: "24/09/2025 23:02" },
  { id: 3, lat: 45.434, lng: 12.339, tipo: "Danni vento", comando: "VE", ts: "25/09/2025 00:31" },
];

function ensureLeafletCSS() {
  if (document.querySelector('link[data-leaflet]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-leaflet", "true");
  document.head.appendChild(link);
}

export default function MappaInterventiVVF() {
  const ref = useRef(null);
  const Lref = useRef(null);
  const mapRef = useRef();
  const layerRef = useRef();

  useEffect(() => {
    let alive = true;
    (async () => {
      ensureLeafletCSS();
      const L = await import("leaflet"); if (!alive) return;
      Lref.current = L;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(ref.current, { center: [45.49, 11.88], zoom: 8 });
      mapRef.current = map;

      const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: "&copy; OpenStreetMap contributors", opacity: 0.9,
      }).addTo(map);
      const carto = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd", maxZoom: 19, attribution: "&copy; OpenStreetMap contributors • CARTO",
      });
      const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17, attribution: "&copy; OSM, SRTM • © OpenTopoMap (CC-BY-SA)",
      });
      const stamenHybrid = L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 20, attribution: "Stamen • © OSM" }
      );

      const interventi = L.layerGroup(); layerRef.current = interventi; interventi.addTo(map);

      L.control.layers(
        { "OpenStreetMap": osm, "Carto Light": carto, "OpenTopoMap": topo },
        { "Toner (linee)": stamenHybrid, "Interventi VVF": interventi }
      ).addTo(map);
      L.control.scale({ metric: true, imperial: false }).addTo(map);

      addLegend(map);
      render(INTERVENTI);
    })();
    return () => { alive = false; mapRef.current?.remove(); };
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
      div.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px;">Legenda</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" width="16" height="26" alt="" />
          <span>Intervento VVF (popup: tipo/comando/orario)</span>
        </div>
        <div style="border-top:1px dashed #cbd5e1;margin:8px 0;"></div>
        <div style="font-size:11px;color:#334155;">Sovrapporre "Toner (linee)" per toponimi e viabilità.</div>
      `;
      L.DomEvent.disableClickPropagation(div);
      return div;
    };
    ctl.addTo(map);
  }

  function render(data) {
    const L = Lref.current, layer = layerRef.current; if (!L || !layer) return;
    layer.clearLayers();
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -32],
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    data.forEach(d =>
      L.marker([d.lat, d.lng], { icon })
        .bindPopup(`<strong>${d.tipo}</strong><br/>Comando: ${d.comando}<br/>Agg.: ${d.ts}`)
        .addTo(layer)
    );
  }

  return (
    <PageShell title="Mappa Interventi VVF">
      <Card className="p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">Collega la tua API per i dati reali.</p>
        <div ref={ref} className="mt-3 w-full rounded-xl" style={{ height: "70vh", minHeight: 420 }} />
      </Card>
    </PageShell>
  );
}
