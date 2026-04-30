import GlassButton from "@/components/GlassButton";
import { useStudentStats } from "@/lib/queries";
import type { coursesProgress } from "@/types/types";
import { useNavigate } from "react-router";
export default function CourseProgress() {
  const navigate = useNavigate();
  const { data: stats } = useStudentStats();
  const { coursesProgress } = stats?.data || {};

  return (
    <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-8">
      <h3 className="text-xl font-bold mb-6">Course Progress</h3>
      <div className="space-y-6">
        {coursesProgress?.map((course: coursesProgress) => {
          return (
            <div
              key={course.id}
              className="bg-white/40 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4"
            >
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {course.code?.substring(0, 3) || "SUB"}
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">{course.name}</h4>
                  <span className="text-sm font-medium">
                    {course.progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2839A4] rounded-full transition-all duration-1000"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <GlassButton onClick={() => navigate(`/courses/${course.id}`)}>
                Continue
              </GlassButton>
            </div>
          );
        })}
        {(!coursesProgress || coursesProgress.length === 0) && (
          <p className="text-center opacity-60 py-8">
            No courses enrolled yet.
          </p>
        )}
      </div>
    </div>
  );
}
