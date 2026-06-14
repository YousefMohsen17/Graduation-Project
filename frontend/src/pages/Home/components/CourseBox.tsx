import subjectImage from "../../../assets/subject-image.jpg";
import { SkeletonCard } from "../../../components/Skeleton";
import { useSubjects } from "../../../lib/queries";
import type { Subject } from "@/types/types";
import { User } from "lucide-react";

export default function CourseBox() {
  const { data, isLoading, error } = useSubjects();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
      {data?.data?.map((subject: Subject) => (
        <>
          {subject && !isLoading && !error && (
            <div className="group flex flex-col justify-between pt-[12px] pb-[12px] px-[16px] rounded-[24px] overflow-hidden bg-linear-to-t from-[#D6DAF5] to-[#FFFFFF] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white hover:from-[#8490E1] hover:to-[#FDFDFD]">
              {/* Course Image */}
              <div className="overflow-hidden rounded-xl mb-3 h-1/2">
                <img
                  src={subjectImage}
                  alt="Computer Architecture"
                  className=" w-full object-cover"
                />
              </div>
              {/* Course Title */}
              <h3 className="text-sm font-semibold text-gray-900">
                {subject.name}
              </h3>

              {/* Course Description */}
              <p className="mt-1 text-base text-[#0A0E29] leading-relaxed">
                {subject.description}
              </p>

              {/* Instructor */}
              <div className=" flex items-center gap-2 h-[40px]">
                <span className="text-xs font-medium  flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="text-gray-500 w-6 h-6" />
                  </div>

                  <span className="font-bold text-lg">
                    {subject.instructor}
                  </span>
                </span>
              </div>
            </div>
          )}
        </>
      ))}
      {isLoading && (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </>
      )}
    </div>
  );
}
