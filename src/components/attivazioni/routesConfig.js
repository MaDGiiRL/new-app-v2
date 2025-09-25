import {
  Activity,
  ClipboardList,
  Link2,
  SquarePlus,
  Clock,
  Hammer,
  CheckSquare,
  Stamp,
  CheckCircle2,
  Users,
  Search,
  BookUser,
  Wrench,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

import {
  EventiInAtto,
  GestioneEventi,
  StatoProposte,
  AttivazioniPage,
  WIP,
} from "../../pages/attivazioni";


const routes = [
  // Eventi
  { label: "Eventi in atto", path: "eventi-in-atto", element: EventiInAtto, icon: Activity, category: "Eventi" },
  { label: "Gestione Eventi", path: "gestione-eventi", element: GestioneEventi, icon: ClipboardList, category: "Eventi" },

  // ⬅️ QUI: usa AttivazioniPage (non WIP)
  { label: "Associazione eventi", path: "associazione-eventi", element: AttivazioniPage, icon: Link2, category: "Eventi" },

  // Gestione
  { label: "Stato proposte", path: "stato-proposte", element: StatoProposte, icon: ClipboardList, category: "Gestione" },
  { label: "Nuova Proposta", path: "nuova-proposta", element: WIP, icon: SquarePlus, category: "Gestione" },
  { label: "Proposte in attesa", path: "proposte-in-attesa", element: WIP, icon: Clock, category: "Gestione" },
  { label: "Proposte in lavorazione", path: "proposte-in-lavorazione", element: WIP, icon: Hammer, category: "Gestione" },
  { label: "Attivazioni da ratificare", path: "attivazioni-da-ratificare", element: WIP, icon: CheckSquare, category: "Gestione" },
  { label: "Proposte stampate", path: "proposte-stampate", element: WIP, icon: Stamp, category: "Gestione" },
  { label: "Protocolla Attivazioni", path: "protocolla-attivazioni", element: WIP, icon: CheckCircle2, category: "Gestione" },
  { label: "Attivazioni attive", path: "attivazioni-attive", element: WIP, icon: Activity, category: "Gestione" },

  // Ricerca
  { label: "Ricerca Organizzazione", path: "ricerca-organizzazione", element: WIP, icon: Users, category: "Ricerca" },
  { label: "Ricerca Attivazioni", path: "ricerca-attivazioni", element: WIP, icon: Search, category: "Ricerca" },
  { label: "Ricerca Recapiti", path: "ricerca-recapiti", element: WIP, icon: BookUser, category: "Ricerca" },

  // Amministrazione
  { label: "Utility", path: "utility", element: WIP, icon: Wrench, category: "Amministrazione" },
  { label: "Utenti abilitati", path: "utenti-abilitati", element: WIP, icon: ShieldCheck, category: "Amministrazione" },
  { label: "Cambio Attivazione Squadre", path: "cambio-attivazione-squadre", element: WIP, icon: RefreshCcw, category: "Amministrazione" },
];

export default routes;
