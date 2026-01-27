import { useState } from "react";
import { useNavigate } from "react-router";
import { useSubjects } from "../../lib/queries";
import { SkeletonCard } from "@/components/Skeleton";
import WelcomeMessage from "./components/WelcomeMessage";
import FilterContainer from "./components/FilterContainer";
import type { Subject } from "@/types/types";
import SearchContainer from "./components/SearchContainer";
import CourseBox from "./components/CourseBox";


export default function CoursesPage() {
    const navigate = useNavigate();
    const { data, isLoading } = useSubjects();
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSubjects = data?.data?.filter((subject: Subject) => {
        const matchesLevel = selectedLevel === "All" || subject.year === selectedLevel;
        const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesLevel && matchesSearch;
    });

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };
    return (
        <div>
            <WelcomeMessage />
            <div className="container mx-auto px-4">
                <SearchContainer searchTerm={searchTerm} handleSearch={handleSearch} />
                <FilterContainer selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[18px] gap-y-[53px] ">
                    {filteredSubjects?.map((subject: Subject) => (
                        <CourseBox key={subject._id} subject={subject} navigate={navigate} />
                    ))}
                    {isLoading && (
                        <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}

                        </>
                    )}
                </div>
                {(!filteredSubjects || filteredSubjects.length === 0) && !isLoading && (
                    <div className="text-center text-slate-500 text-lg mt-10">
                        No subjects found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}