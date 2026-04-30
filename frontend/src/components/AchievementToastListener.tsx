import { useStudentStats } from "@/lib/queries";
import type { coursesProgress } from "@/types/types";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function AchievementToastListener() {
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

  const prevStatusRef = useRef({
    isEarlyBird: false,
    isLearningStarter: false,
    isWarrior: false,
  });

  useEffect(() => {
    const previous = prevStatusRef.current;

    if (!previous.isEarlyBird && isEarlyBird) {
      toast.success('Achievement unlocked: "Early Bird"');
    }

    if (!previous.isLearningStarter && isLearningStarter) {
      toast.success('Achievement unlocked: "Learning Starter"');
    }

    if (!previous.isWarrior && isWarrior) {
      toast.success('Achievement unlocked: "Warrior"');
    }

    prevStatusRef.current = {
      isEarlyBird,
      isLearningStarter,
      isWarrior,
    };
  }, [isEarlyBird, isLearningStarter, isWarrior]);

  return null;
}
