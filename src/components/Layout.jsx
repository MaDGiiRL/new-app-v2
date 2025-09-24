import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-dvh">
            {/* Navbar */}
            <Header />

            {/* Contenuto */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-5xl">{children}</div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
