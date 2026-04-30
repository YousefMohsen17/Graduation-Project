import type { LoginFormData, SignupFormData } from "../types/types";
import axiosInstance from "./axios.tsx";

export async function createAccount(data: SignupFormData) {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
export async function login(data: LoginFormData) {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
export async function getSubjects() {
  try {
    const response = await axiosInstance.get("/subjects");
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getSubject(id: string) {
  try {
    const response = await axiosInstance.get(`/subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function checkAuth() {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function logout() {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function createPost(formData: FormData) {
  try {
    await axiosInstance.post("/community", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
}
export async function getPosts() {
  try {
    const response = await axiosInstance.get("/community");
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function likePost(id: string) {
  try {
    const response = await axiosInstance.put(`/community/like/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function commentOnPost({
  id,
  commentContent,
}: {
  id: string;
  commentContent: { text: string; name: string; user: string; content: string };
}) {
  try {
    const response = await axiosInstance.post(
      `/community/comment/${id}`,
      commentContent,
    );
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function deletePost(id: string) {
  try {
    const response = await axiosInstance.delete(`/community/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getUserPosts(id: string) {
  try {
    const response = await axiosInstance.get(`/community/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
export async function getEnrolledCourses() {
  try {
    const response = await axiosInstance.get(`/subjects/enrolled`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function enrollCourse(id: string) {
  try {
    const response = await axiosInstance.post(`/subjects/${id}/enroll`);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getStudentStats() {
  try {
    const response = await axiosInstance.get(`/student/stats`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const socialLogin = async (firebaseToken: string) => {
  const res = await axiosInstance.post("/auth/social", {
    token: firebaseToken,
  });
  return res.data;
};
export async function logStudyTime(minutes: number) {
  try {
    const response = await axiosInstance.post("/student/log-time", { minutes });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updateCourseProgress({
  courseId,
  progress,
}: {
  courseId: string;
  progress: number;
}) {
  const res = await axiosInstance.put(`/student/course/${courseId}/progress`, {
    progress,
  });
  return res.data;
}
