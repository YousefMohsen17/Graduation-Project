export interface StudyStats {
    streak: number;
    coursesEnrolled: number;
    coursesCompleted: number;
    totalHours: number;
    weeklyActivity: {
        day: string;
        hours: number;
    }[];
    coursesProgress: {
        id: string;
        name: string;
        progress: number;
        lastAccessed: string;
    }[];
}
