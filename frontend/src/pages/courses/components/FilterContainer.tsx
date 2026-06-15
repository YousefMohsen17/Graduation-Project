import GlassButton from "@/components/GlassButton";

export default function FilterContainer({
  selectedLevel,
  setSelectedLevel,
}: {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}) {
  const levels = [
    "All",
    "Level 0",
    "Level 100",
    "Level 200",
    "Level 300",
    "Level 400",
  ];

  return (
    <div className="flex justify-center ">
      <div className=" flex gap-3 flex-wrap justify-center">
        {levels.map((level) => (
          <GlassButton
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`w-[120px] h-[40px] text-sm

                                     ${
                                       selectedLevel === level
                                         ? "bg-blue-600! text-white-600! border-[fafafa] shadow-md!"
                                         : ""
                                     }
                                 `}
          >
            {level}
          </GlassButton>
        ))}
      </div>
    </div>
  );
}
