// FullBleed.jsx
export default function FullBleed({ children }) {
    return (
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
            {children}
        </div>
    );
}
