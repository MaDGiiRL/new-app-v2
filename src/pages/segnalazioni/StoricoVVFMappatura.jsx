import React, { useState, useRef, useEffect } from "react";
import PageShell from "../../components/_PageShell";
import { RefreshCcw, Search, Info, MapPin, BarChart3, Tag, Hash, Shield } from "lucide-react";

/* ---------- Leaflet (mappa) ---------- */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix icone Leaflet (evita 404 con Vite/Webpack)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapView() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [45.55, 11.55], // Veneto
      zoom: 8,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Esempio: marker centrale (puoi rimuoverlo)
    // L.marker([45.55, 11.55]).addTo(map).bindPopup("Centro Veneto");

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="h-[60vh] w-full rounded-lg" />;
}

/* ---------- UI kit ---------- */
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

function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition",
        "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
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

export default function StoricoVVFMappatura() {
  const [dataInizio, setDataInizio] = useState("18/09/2025 00:00");
  const [dataFine, setDataFine] = useState("25/09/2025 23:59");
  const [categoria, setCategoria] = useState("");

  const caricaInterventi = () => {
    alert("Caricamento interventi su mappa in base ai filtri… (da implementare)");
  };

  const resetFiltri = () => {
    setDataInizio("");
    setDataFine("");
    setCategoria("");
  };

  return (
    <PageShell title="Storico VVF Mappatura interventi">
      {/* AVVISO */}
      <Card className="mb-4 p-4">
        <div className="flex items-start gap-2 text-blue-700 dark:text-blue-400">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            <strong>AVVISO:</strong> I dati mostrati sono solo quelli completamente contenuti
            all'interno delle date e orari inseriti. Per vedere tutti quelli attuali del giorno in corso si consiglia
            di inserire dal giorno precedente al giorno successivo alla data di interesse. (Funziona uguale alla reportistica)
          </p>
        </div>
      </Card>

      {/* FILTRI */}
      <Card className="mb-4 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-1 text-sm">
            Data Inizio:
            <Input value={dataInizio} onChange={(e) => setDataInizio(e.target.value)} />
          </label>
          <label className="grid gap-1 text-sm">
            Data Fine:
            <Input value={dataFine} onChange={(e) => setDataFine(e.target.value)} />
          </label>
          <label className="grid gap-1 text-sm">
            Categorie:
            <Input placeholder="Cerca categorie…" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={caricaInterventi}>
            <Search className="h-4 w-4" /> Carica Interventi su Mappa
          </Button>
          <Button
            className="bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            onClick={resetFiltri}
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </Card>

      {/* INFO */}
      <Card className="mb-4 p-4">
        <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <p className="text-sm">Trovati 0 interventi nel periodo selezionato. 0 visualizzati sulla mappa.</p>
        </div>
      </Card>

      {/* MAPPA */}
      <Card className="mb-4 p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <MapPin className="h-4 w-4" /> Mappa Interventi
        </h3>
        <MapView />
      </Card>

      {/* STATISTICHE */}
      <Card className="p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <BarChart3 className="h-4 w-4" /> Statistiche Interventi
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left dark:bg-slate-800">
                <th className="px-3 py-2">
                  <div className="flex items-center gap-1"><Tag className="h-4 w-4" /> Categoria</div>
                </th>
                <th className="px-3 py-2">
                  <div className="flex items-center gap-1"><Hash className="h-4 w-4" /> Numero Interventi</div>
                </th>
                <th className="px-3 py-2">
                  <div className="flex items-center gap-1"><Shield className="h-4 w-4" /> Comando</div>
                </th>
                <th className="px-3 py-2">
                  <div className="flex items-center gap-1"><Hash className="h-4 w-4" /> Numero Interventi</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}
