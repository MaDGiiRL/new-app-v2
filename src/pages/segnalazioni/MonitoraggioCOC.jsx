import React, { useState, useRef, useEffect } from "react";
import PageShell from "../../components/_PageShell";
import {
  Search,
  Printer,
  Map as MapIcon,
  MapPin,
  CalendarClock,
  Info,
  BarChart3,
  Building2,
  Hash,
  Tag,
} from "lucide-react";

/* Leaflet */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix icone Leaflet per Vite/Webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

/* UI primitives già viste */
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

// Bottoni: esattamente la tua classe
function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        "disabled:opacity-60 disabled:pointer-events-none",
        "h-10 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        className
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
        {Icon && <Icon className="h-4 w-4" />} {label}
      </span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-xl border px-3 text-sm",
        "border-slate-300 bg-white/90 placeholder:text-slate-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500",
        props.className
      )}
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-xl border px-3 text-sm",
        "border-slate-300 bg-white/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",
        props.className
      )}
    />
  );
}

/* ------------------------------ Mappa COC ------------------------------ */
function MapCOC({ markers = [] }) {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { center: [45.55, 11.55], zoom: 8 });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Render markers mock
    const group = L.featureGroup();
    markers.forEach((m) => {
      L.marker([m.lat, m.lon]).addTo(group).bindPopup(`<b>${m.comune}</b><br/>${m.categoria}`);
    });
    if (markers.length) {
      group.addTo(map);
      map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }

    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // semplice refresh: rimuovi tutti i layer marker e ridisegna
    map.eachLayer((l) => {
      if (l instanceof L.Marker) map.removeLayer(l);
    });
    const group = L.featureGroup();
    markers.forEach((m) => L.marker([m.lat, m.lon]).addTo(group).bindPopup(`<b>${m.comune}</b><br/>${m.categoria}`));
    if (markers.length) {
      group.addTo(map);
      map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
  }, [markers]);

  return <div ref={ref} className="h-[50vh] w-full rounded-lg" />;
}

/* ------------------------------ Main Page ------------------------------ */
export default function MonitoraggioCOC() {
  const [inizio, setInizio] = useState("2025-08-01T00:00");
  const [fine, setFine] = useState("2025-08-31T23:59");
  const [provincia, setProvincia] = useState("ALL");
  const [markers, setMarkers] = useState([]);

  // dati mock
  const stats = { BL: 8, PD: 36, RO: 23, TV: 28, VE: 27, VI: 16, VR: 14 };
  const totale = Object.values(stats).reduce((a, b) => a + b, 0);

  const comuni = [
    { prov: "BL", comune: "Arsiè", categoria: "aperta h24", data: "16/08/2025 00:00", lat: 45.953, lon: 11.74 },
    { prov: "BL", comune: "Arsiè", categoria: "aperta orario diurno", data: "16/08/2025 00:00", lat: 45.953, lon: 11.74 },
    { prov: "RO", comune: "Adria", categoria: "aperta h24", data: "20/08/2025 08:00", lat: 45.054, lon: 12.057 },
  ];

  const cerca = () => {
    // filtro mock per provincia
    const filtered = provincia === "ALL" ? comuni : comuni.filter((c) => c.prov === provincia);
    setMarkers(filtered.map((c) => ({ lat: c.lat, lon: c.lon, comune: c.comune, categoria: c.categoria })));
  };

  return (
    <PageShell title="Monitoraggio COC">
      {/* Ricerca periodo */}
      <Card className="mb-6 p-4 sm:p-6">
        <p className="mb-3 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>AVVISO:</strong> I dati mostrati sono solo quelli completamente contenuti
            nell’intervallo di date/ore selezionato.
          </span>
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Data inizio" icon={CalendarClock}>
            <Input
              type="datetime-local"
              value={inizio}
              onChange={(e) => setInizio(e.target.value)}
            />
          </Field>
          <Field label="Data fine" icon={CalendarClock}>
            <Input
              type="datetime-local"
              value={fine}
              onChange={(e) => setFine(e.target.value)}
            />
          </Field>
          <Field label="Provincia" icon={MapPin}>
            <Select
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option value="ALL">Tutte le Province</option>
              {["BL", "PD", "RO", "TV", "VE", "VI", "VR"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
          </Field>
          <div className="flex items-end">
            <Button className="w-full" onClick={cerca}>
              <Search className="mr-1.5 h-4 w-4" />
              Cerca COC
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistiche */}
      <Card className="mb-6 p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
            <BarChart3 className="h-5 w-5" /> Statistiche per provincia
          </h3>
          <Button>
            <Printer className="mr-1.5 h-4 w-4" />
            Stampa Report
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/40">
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Hash className="h-4 w-4" /> Totale
                  </span>
                </th>
                {Object.keys(stats).map((k) => (
                  <th key={k} className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {k}
                    </span>
                  </th>
                ))}
                <th className="px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-1.5">
                    <Hash className="h-4 w-4" /> Totale
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 font-medium">COC attivati</td>
                {Object.values(stats).map((v, i) => (
                  <td key={i} className="px-3 py-2">{v}</td>
                ))}
                <td className="px-3 py-2 font-semibold">{totale}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comuni + mappa */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <h3 className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
            <Building2 className="h-5 w-5" />
            Comuni con COC attivati
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-normal dark:bg-slate-800">
              <Hash className="h-3.5 w-3.5" /> {totale}
            </span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> Provincia
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" /> Comune
                    </span>
                  </th>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="h-4 w-4" /> Categoria
                    </span></th>
                  <th className="px-3 py-2 text-left">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="h-4 w-4" /> Data attivazione
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comuni.map((c, i) => (
                  <tr key={i} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-3 py-2">{c.prov}</td>
                    <td className="px-3 py-2">{c.comune}</td>
                    <td className="px-3 py-2">{c.categoria}</td>
                    <td className="px-3 py-2">{c.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100">
            <MapIcon className="h-5 w-5 text-blue-500" /> Mappa situazione COC
          </h3>
          <MapCOC markers={markers} />
        </Card>
      </div>
    </PageShell>
  );
}
