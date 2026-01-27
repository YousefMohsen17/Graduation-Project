import InputGlass from "@/components/InputGlass";

export default function SearchContainer({ searchTerm, handleSearch }: { searchTerm: string, handleSearch: (searchTerm: string) => void }) {
    return (
        <div className="max-w-xl mx-auto mb-[60px]">
            <InputGlass
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}