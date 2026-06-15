import InputGlass from "@/components/InputGlass";


export default function SearchContainer({ searchTerm, handleSearch }: { searchTerm: string, handleSearch: (searchTerm: string) => void }) {
    return (
        <div className=" flex items-center justify-center w-full  mx-5 my-5">
            <InputGlass
            className="bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] md:w-[500px] ms:w-[200px]
            "
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)
                }
            />
        </div>
    )
}


