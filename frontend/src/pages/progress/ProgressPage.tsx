import { useStudentStats } from "@/lib/queries";

import StatsGrid from "./components/StatsGrid";
import ActivityChart from "./components/ActivityChart";
import Acheivements from "./components/Achievements";
import CourseProgress from "./components/CourseProgress";
export default function ProgressPage() {
  const { isLoading } = useStudentStats();

  if (isLoading) {
    return <div className="p-10 text-center">Loading stats...</div>;
  }

  return (
    <div className="container mx-auto pb-10">
      <h2 className="mb-8">Your Progress</h2>

      {/* Stats Grid */}
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Weekly Activity Chart */}
        <ActivityChart />

        {/* Recent Achievements / Goals */}
        <Acheivements />
      </div>

      {/* Course Progress List */}
      <CourseProgress />
    </div>
  );
}
