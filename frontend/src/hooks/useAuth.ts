import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../lib/api";

export const useAuth = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: checkAuth,
        retry: false,
    });
};
