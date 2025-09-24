import SectionCard from "./SectionCard";

export default function SectionGrid({ sections }) {

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                {sections.map((item) => (
                    <SectionCard key={item.slug} item={item} />
                ))}
            </div>
        </div>
    );
}
