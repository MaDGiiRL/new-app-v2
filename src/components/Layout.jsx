import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col">
            {/* Navbar */}
            <Header />

            {/* Contenuto */}
            <main className="flex-1 flex items-center justify-center px-4 min-h-screen">
                <div className="w-full max-w-7xl">{children}</div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Bottone scroll-to-top */}
            <ScrollToTopButton />
        </div>
    );
}
