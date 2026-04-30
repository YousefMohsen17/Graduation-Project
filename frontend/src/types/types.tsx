export interface SignupFormData {
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  academicYear: number;
  universityId: number;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export interface PostData {
  content: string;
  user: string;
  image?: File | null;
}
export interface Post {
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  content: string;
  image?: string;
  likes: Array<{
    user: string;
    _id: string;
  }>;
  comments: Array<{
    user: {
      _id: string;
      name: string;
    };
    _id: string;
    text: string;
    content: string;
    name?: string;
    avatar?: string;
  }>;
  createdAt: string;
  __v: number;
}

export interface PostResponse {
  success: boolean;
  count: number;
  data: Array<Post>;
}
export interface Subject {
  _id: string;
  name: string;
  code: string;
  description: string;
  department: string;
  year: string;
  driveLink: string;
  instructor: string;
  createdAt: string;
  __v: number;
}

export interface SubjectsResponse {
  success: boolean;
  count: number;
  data: Subject[];
}
export interface StudyStats {
  streak: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalHours: number;
  weeklyActivity: {
    day: string;
    hours: number;
  }[];
  coursesProgress: coursesProgress[];
}
export interface coursesProgress {
  id: string;
  name: string;
  progress: number;
  lastAccessed: string;
  code: string;
  completed: boolean;
}
