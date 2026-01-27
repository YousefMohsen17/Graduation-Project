import GlassButton from "@/components/GlassButton";

export default function FilterContainer({ selectedLevel, setSelectedLevel }: { selectedLevel: string, setSelectedLevel: (level: string) => void }) {
    const levels = ["All", "Level 0", "Level 100", "Level 200", "Level 300", "Level 400"];



    return (
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
                                ? "bg-blue-600! text-blue-600! border-blue-500 shadow-md!"
                                : ""
                            }
                                 `}
                    >
                        {level}
                    </GlassButton>
                ))}
            </div>
        </div>
    )
}