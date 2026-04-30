import { useStudyTimer } from "@/hooks/useStudyTimer";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/lib/api";

export default function StudyTimerProvider() {
  const { data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
  });

  useStudyTimer(!!user);

  return null; // renders nothing
}
