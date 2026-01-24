import type { PostData } from "@/types/types";
import { getSubjects, getSubject, checkAuth, logout, createPost, getPosts, likePost, commentOnPost, deletePost, getUserPosts, getEnrolledCourses, enrollCourse, getStudentStats } from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
export function useSubjects() {
    return useQuery({ queryKey: ["subjects"], queryFn: getSubjects })
}

export function useSubject(id: string) {
    return useQuery({
        queryKey: ["subjects", id],
        queryFn: () => getSubject(id),
        enabled: !!id
    })
}

export function useAuth() {
    return useQuery({
        queryKey: ["auth"],
        queryFn: checkAuth,
        retry: false,
        staleTime: 0,
    })
}

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["auth"], null);

            queryClient.invalidateQueries({ queryKey: ["auth"] });
            navigate("/sign-in", { replace: true });
        },
    });
}
export function usePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            toast.success("Post created successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data.error || "Something went wrong");
        },
    })
}
export function usePosts() {
    return useQuery({ queryKey: ["posts"], queryFn: getPosts })
}


export function useUserPosts(userId: string) {
    return useQuery({
        queryKey: ["posts", userId],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId
    })
}

export function useEnrolledCourses() {
    return useQuery({ queryKey: ["enrolledCourses"], queryFn: getEnrolledCourses })
}
export function useEnrollCourse() {
    return useMutation({ mutationFn: enrollCourse })
}

export function useStudentStats() {
    return useQuery({ queryKey: ["studentStats"], queryFn: getStudentStats })
}

export function useLikePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            toast.success("You Liked A Post");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data.error || "Something went wrong");
        },
    });
}

export function useCommentPost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: commentOnPost,
        onSuccess: () => {
            toast.success("Comment added successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data.error || "Something went wrong");
        },
    });
}

export function useDeletePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data.error || "Something went wrong");
        },
    });
}