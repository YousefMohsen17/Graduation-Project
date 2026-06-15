// import { Clock3 } from "lucide-react";
import subjectImage from "../../../assets/subject-image.jpg";
import type { Subject } from "@/types/types";

export default function ContinueLearningCard({
  navigate,
  course,
}: {
  navigate: (path: string) => void;
  course?: Subject;
}) {
  const handleContinue = () => {
    if (course?._id) {
      navigate(`/courses/${course._id}`);
    }
  };
  return (
    <div className="relative overflow-hidden rounded-3xl h-[320px] w-full">
      <img
        src={subjectImage}
        alt={course?.name || "Course"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#141C52]/90 via-[#141C52]/60 to-[#141C52]/30" />

      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          {course?.name || "Continue Learning"}
        </h2>

        <p className="max-w-md text-white/90 leading-relaxed mb-8">
          {course?.description ||
            "Learn something new and expand your knowledge."}
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 bg-linear-to-t from-[#D6DAF5] to-[#fafafa] text-[#0A0E29] hover:from-[#ADB5EB] hover:to-[#D6DAF5] px-6 py-3 rounded-xl font-medium shadow-lg transition-all active:scale-95"
          >
            Continue Learning ▷
          </button>

          {/* <div className="flex items-center gap-2 text-sm">
            <Clock3 size={16} />
            <span>12h 45m left</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
