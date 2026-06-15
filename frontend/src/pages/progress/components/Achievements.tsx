import { useStudentStats } from "@/lib/queries";
import { CheckCircle, Flame, Trophy } from "lucide-react";
import type { coursesProgress } from "@/types/types";
export default function Acheivements() {
  const { data: stats } = useStudentStats();
  const {
    coursesProgress,
    totalHours,
  }: { coursesProgress: coursesProgress[]; totalHours?: number } =
    stats?.data || { coursesProgress: [], totalHours: 0 };
  const isEarlyBird =
    coursesProgress.filter((course) => course.completed).length >= 5;
  const isLearningStarter = coursesProgress.length >= 5;
  const isWarrior = (totalHours ?? 0) >= 50;

  return (
    <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-8">
      <h3 className="text-xl font-bold mb-6">Achievements</h3>
      <div className="space-y-4">
        {/* First Achievement */}
        <div
          className={`flex items-center gap-4 ${isEarlyBird ? "bg-white/50" : "bg-gray-100"} p-4 rounded-xl`}
        >
          <div
            className={`${isEarlyBird ? "bg-yellow-100 text-yellow-600" : "bg-gray-200 text-gray-400"} p-2 rounded-lg`}
          >
            <Trophy size={20} />
          </div>
          <div>
            <h4
              className={`font-semibold text-sm ${isEarlyBird ? "" : "text-gray-500"}`}
            >
              Early Bird
            </h4>
            <p
              className={` text-xs ${isEarlyBird ? "opacity-60" : "text-gray-400"}`}
            >
              Complete 5 Courses
            </p>
          </div>
        </div>
        {/* Second Acheivement */}
        <div
          className={`flex items-center gap-4 ${isLearningStarter ? "bg-white/50" : "bg-gray-100"} p-4 rounded-xl`}
        >
          <div
            className={`${isLearningStarter ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"} p-2 rounded-lg`}
          >
            <CheckCircle size={20} />
          </div>
          <div>
            <h4
              className={`font-semibold text-sm ${isLearningStarter ? "" : "text-gray-500"}`}
            >
              Learning Starter
            </h4>
            <p
              className={` text-xs ${isLearningStarter ? "opacity-60" : "text-gray-400"}`}
            >
              Enroll 5 Courses
            </p>
          </div>
        </div>
        {/* Third Acheivement */}
        <div
          className={`flex items-center gap-4 ${isWarrior ? "bg-white/50" : "bg-gray-100"} p-4 rounded-xl`}
        >
          <div
            className={`${isWarrior ? "bg-purple-100 text-purple-600" : "bg-gray-200 text-gray-400"} p-2 rounded-lg`}
          >
            <Flame size={20} />
          </div>
          <div>
            <h4 className={`font-semibold text-sm ${isWarrior ? "" : "text-gray-500"}`}>
              Warrior
            </h4>
            <p className={` text-xs ${isWarrior ? "opacity-60" : "text-gray-400"}`}>
              Study More Than 50 Hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
