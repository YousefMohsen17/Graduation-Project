import { useEffect } from "react";
import { logStudyTime } from "@/lib/api";

export const useStudyTimer = (isLoggedIn: boolean) => {
  useEffect(() => {
    if (!isLoggedIn) return;

    const startTime = Date.now();

    const handleLog = () => {
      const minutesSpent = Math.round((Date.now() - startTime) / 60000);
      if (minutesSpent > 0) {
        logStudyTime(minutesSpent);
      }
    };

    window.addEventListener("beforeunload", handleLog);

    return () => {
      handleLog();
      window.removeEventListener("beforeunload", handleLog);
    };
  }, [isLoggedIn]);
};
