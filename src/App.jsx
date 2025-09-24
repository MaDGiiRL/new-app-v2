import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pagine
import PublicHome from "./pages/PublicHome";           // /
import AccessPortal from "./pages/AccessPortal";       // /accesso (ex Home con login + sezioni)
import Cartografie from "./pages/Cartografie";         // /cartografie
import PercezioneSismica from "./pages/PercezioneSismica"; // /percezione-sismica
import SectionPage from "./pages/SectionPage";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import NewUser from "./pages/NewUser";

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
          <Route path="/app" element={<Navigate to="/accesso" replace />} />
          <Route path="/app/:slug" element={<SectionPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
