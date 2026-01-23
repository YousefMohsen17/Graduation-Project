import { getSubjects, getSubject, checkAuth, logout } from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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