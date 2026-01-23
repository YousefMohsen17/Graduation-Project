import { getSubjects, getSubject, checkAuth } from "./api";
import { useQuery } from "@tanstack/react-query";

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