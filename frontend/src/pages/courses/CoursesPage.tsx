import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSubjects } from "../../lib/queries";
import GlassButton from "../../components/GlassButton";
import { SkeletonCard } from "@/components/Skeleton";

const levels = ["All", "Level 0", "Level 100", "Level 200", "Level 300", "Level 400"];

export default function CoursesPage() {
    const navigate = useNavigate();
    const { data, isLoading } = useSubjects();
    const [selectedLevel, setSelectedLevel] = useState("All");

    const filteredSubjects = data?.data?.filter((subject: any) =>
        selectedLevel === "All" || subject.year === selectedLevel
    );

    return (
        <div className="min-h-screen">
            <div className="mb-[60px] text-center">
                <h2>Explore Your Courses</h2>
                <h4>Browse and find courses by level , professor , or subject</h4>
            </div>
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto mb-[60px]">
                    <button className="
                        w-full h-[54px] 
                        flex items-center justify-between gap-[8px]
                        px-[24px] rounded-[16px]
                        bg-gradient-to-b from-[#d0d5f3] to-[#ced2f2]
                        backdrop-blur-2xl
                        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                        text-slate-800 font-medium transition-all active:scale-95
                        border border-white/50
                    ">
                        <span>Search</span>
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter Buttons Container */}
                <div className="flex justify-center mb-[80px]">
                    <div className="
                        p-3 rounded-[24px]
                        bg-white/30 backdrop-blur-md border border-white/60 shadow-xl
                        flex gap-3 flex-wrap justify-center
                    ">
                        {levels.map((level) => (
                            <GlassButton key={level} onClick={() => setSelectedLevel(level)}
                                className={`

                                     ${selectedLevel === level
                                        ? "!bg-blue-600 !text-blue-600 border-blue-500 !shadow-md"
                                        : ""
                                    }
                                 `}
                            >
                                {level}
                            </GlassButton>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[18px] gap-y-[53px] ">
                    {filteredSubjects?.map((subject: any) => (
                        <div key={subject._id} className="flex flex-col pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-[#CCD1F3] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white justify-between">
                            <div>
                                <h3 className="font-bold text-lg mb-1">{subject.name}</h3>
                                <p className="text-slate-600 text-sm mb-1">{subject.instructor}</p>
                                <p className="text-slate-500 text-xs mb-4">{subject.year}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/courses/${subject._id}`)}
                                className="
                                    w-full mt-2 h-[44px] 
                                    flex items-center justify-center
                                    rounded-[16px]
                                    bg-gradient-to-b from-[#d0d5f3] to-[#ced2f2]
                                    backdrop-blur-2xl
                                    shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                                    text-slate-800 font-medium transition-all active:scale-95
                                    border border-white hover:brightness-105
                                "
                            >
                                CONTINUE
                            </button>
                        </div>
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
                    <div className="text-center text-slate-500 text-lg">
                        No subjects found for this level.
                    </div>
                )}
            </div>
        </div>
    )
}