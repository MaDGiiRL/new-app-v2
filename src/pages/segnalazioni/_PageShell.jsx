export default function PageShell({ title, description, children }) {
    return (
        <div className="p-6">
            <header className="mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                {description && <p className="text-sm opacity-75 mt-1">{description}</p>}
            </header>
            <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-4">
                {children}
            </div>
        </div>
    );
}
