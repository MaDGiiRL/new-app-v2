import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container max-w-4xl py-16 text-center">
            <h1 className="text-3xl font-bold mb-2">Pagina non trovata</h1>
            <p className="opacity-70 mb-6">La risorsa che cerchi non esiste.</p>
            <Link to="/" className="text-sky-600 hover:underline">Torna alla Home</Link>
        </div>
    );
}
