import React, { useEffect, useRef } from "react";
import PageShell from "../../components/_PageShell";

/** Card mini-UI */
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

/** Mock eventi (sostituisci con i tuoi dati) */
const EVENTS = [
  { id: 1, lat: 45.899, lng: 12.032, title: "Allagamento – Valdobbiadene", desc: "Aggiornamento: 23/09/2025 ore 19:12" },
  { id: 2, lat: 45.476, lng: 10.856, title: "Allagamento – Bussolengo", desc: "Aggiornamento: 23/09/2025 ore 21:42" },
  { id: 3, lat: 45.535, lng: 10.991, title: "Allagamento – Negrar", desc: "Aggiornamento: 23/09/2025 ore 21:42" },
];

/** Garantisce il CSS di Leaflet anche senza importare file locali */
function ensureLeafletCSS() {
  if (document.querySelector('link[data-leaflet]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  link.setAttribute("data-leaflet", "true");
  document.head.appendChild(link);
}

export default function MappaEventi() {
  const mapRef = useRef(null);
  const Lref = useRef(null);
  const mapInstanceRef = useRef();
  const eventsLayerRef = useRef();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      ensureLeafletCSS();
      const L = await import("leaflet");
      if (!isMounted) return;
      Lref.current = L;

      // Fix icone default
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Mappa
      const map = L.map(mapRef.current, { center: [45.49, 11.88], zoom: 8, zoomControl: true });
      mapInstanceRef.current = map;

      // Basi
      const openstreet = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: "&copy; OpenStreetMap contributors", opacity: 0.9,
      }).addTo(map);
      const cartoLight = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap • &copy; CARTO", subdomains: "abcd", maxZoom: 19,
      });
      const openTopo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17, attribution: "&copy; OSM, SRTM • © OpenTopoMap (CC-BY-SA)",
      });
      const stamenTonerHybrid = L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png",
        { attribution: "Stamen • © OSM", subdomains: "abcd", maxZoom: 20 }
      );

      // Layers
      const eventsLayer = L.layerGroup(); eventsLayerRef.current = eventsLayer; eventsLayer.addTo(map);
      L.control.layers(
        { "OpenStreetMap": openstreet, "Carto Light": cartoLight, "OpenTopoMap": openTopo },
        { "Stamen Toner (linee)": stamenTonerHybrid, "Eventi": eventsLayer }
      ).addTo(map);
      L.control.scale({ metric: true, imperial: false }).addTo(map);

      // Legenda
      addLegend(map);

      // Render
      renderEvents(EVENTS);
      if (eventsLayer.getLayers().length) {
        const bounds = L.featureGroup(eventsLayer.getLayers()).getBounds();
        map.fitBounds(bounds.pad(0.2));
      }
    })();

    return () => { isMounted = false; mapInstanceRef.current?.remove(); };
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
        "font:12px/1.35 system-ui,Segoe UI,Roboto,Arial;color:#0f172a;min-width:180px;";
      div.innerHTML = `
        <div style="font-weight:600;margin-bottom:6px;">Legenda</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" width="16" height="26" alt="" />
          <span>Evento segnalato</span>
        </div>
        <div style="border-top:1px dashed #cbd5e1;margin:8px 0;"></div>
        <div style="font-size:11px;color:#334155;">Suggerimento: apri il popup per dettagli (titolo + ultimo aggiornamento).</div>
      `;
      L.DomEvent.disableClickPropagation(div);
      return div;
    };
    ctl.addTo(map);
  }

  function renderEvents(data) {
    const L = Lref.current, layer = eventsLayerRef.current; if (!L || !layer) return;
    layer.clearLayers();
    const smallIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [0, -28],
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", shadowSize: [41, 41],
    });
    data.forEach(e => L.marker([e.lat, e.lng], { icon: smallIcon })
      .bindPopup(`<strong>${e.title ?? "Evento"}</strong><br/>${e.desc ?? ""}`)
      .addTo(layer));
  }

  return (
    <PageShell title="Mappa eventi">
      <Card className="mb-4 p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          I marker qui sono di esempio; collega la tua API per popolarli.
        </p>
        <div ref={mapRef} className="mt-3 w-full rounded-xl" style={{ height: "70vh", minHeight: 420 }} />
      </Card>
    </PageShell>
  );
}
