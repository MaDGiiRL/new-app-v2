import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pagine pubbliche
import PublicHome from "./pages/PublicHome";
import AccessPortal from "./pages/AccessPortal";
import Cartografie from "./pages/Cartografie";
import PercezioneSismica from "./pages/PercezioneSismica";
import SectionPage from "./pages/SectionPage";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import NewUser from "./pages/NewUser";

// Segnalazioni
import SegnalazioniLayout from "./components/segnalazioni/SegnalazioniLayout";
import routesSegn from "./components/segnalazioni/routesConfig";

// Attivazioni 2.0
import AttivazioniLayout from "./components/attivazioni/AttivazioniLayout";
import routesAtt from "./components/attivazioni/routesConfig";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Pubbliche */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/accesso" element={<AccessPortal />} />
        <Route path="/cartografie" element={<Cartografie />} />
        <Route path="/percezione-sismica" element={<PercezioneSismica />} />
        <Route path="/password-smarrita" element={<ForgotPassword />} />
        <Route path="/nuovo-utente" element={<NewUser />} />

        {/* Area autenticata */}
        <Route element={<ProtectedRoute />}>
          {/* Alias specifici PRIMA di /app/:slug */}
          <Route
            path="/app/attivazioni-20"
            element={<Navigate to="/attivazioni/associazione-eventi" replace />}
          />
          <Route
            path="/app/segnalazioni"
            element={<Navigate to="/segnalazioni" replace />}
          />
          {/* (opzionale) altri alias utili */}
          <Route
            path="/app/eventi-in-atto"
            element={<Navigate to="/attivazioni/eventi-in-atto" replace />}
          />
          <Route
            path="/app/percezione-sismica"
            element={<Navigate to="/percezione-sismica" replace />}
          />

          {/* Generiche */}
          <Route path="/app" element={<Navigate to="/accesso" replace />} />
          <Route path="/app/:slug" element={<SectionPage />} />

          {/* Attivazioni 2.0 */}
          <Route path="/attivazioni" element={<AttivazioniLayout />}>
            {routesAtt.map(({ path, element: El }) => (
              <Route key={path} path={path} element={<El />} />
            ))}
            {/* Index su associazione-eventi per aprire direttamente la tua pagina */}
            <Route index element={<Navigate to="associazione-eventi" replace />} />
          </Route>

          {/* Segnalazioni */}
          <Route path="/segnalazioni" element={<SegnalazioniLayout />}>
            {routesSegn.map(({ path, element: El }) => (
              <Route key={path} path={path} element={<El />} />
            ))}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
