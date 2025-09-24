import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SessionContext from "../context/SessionContext";

export default function ProtectedRoute() {
  const { session, loading } = useContext(SessionContext);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[50vh]">
        <div className="animate-pulse text-sm opacity-70">Caricamento…</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
