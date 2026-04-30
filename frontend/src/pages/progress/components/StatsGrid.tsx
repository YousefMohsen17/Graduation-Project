import { useStudentStats } from "@/lib/queries";
import { BookOpen, Clock, Flame, Trophy } from "lucide-react";

export default function StatsGrid() {
  const { data: stats } = useStudentStats();

  const { streak, coursesEnrolled, coursesCompleted, totalHours } =
    stats?.data || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
        <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
          <Flame size={32} />
        </div>
        <h3 className="text-3xl font-bold">{streak || 0} Days</h3>
        <p className="opacity-60 text-sm">Study Streak</p>
      </div>

      <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
        <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
          <BookOpen size={32} />
        </div>
        <h3 className="text-3xl font-bold">{coursesEnrolled || 0}</h3>
        <p className="opacity-60 text-sm">Courses Enrolled</p>
      </div>

      <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
        <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
          <Trophy size={32} />
        </div>
        <h3 className="text-3xl font-bold">{coursesCompleted || 0}</h3>
        <p className="opacity-60 text-sm">Courses Completed</p>
      </div>

      <div className="bg-[#EAEDFA] border border-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-2">
        <div className="bg-[#D6DAF5] p-3 rounded-2xl text-[#2839A4]">
          <Clock size={32} />
        </div>
        <h3 className="text-3xl font-bold">{totalHours || 0}h</h3>
        <p className="opacity-60 text-sm">Total Study Time</p>
      </div>
    </div>
  );
}
