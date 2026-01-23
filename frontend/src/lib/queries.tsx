import { getSubjects, getSubject, checkAuth, logout } from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
    })
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["auth"], null);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}