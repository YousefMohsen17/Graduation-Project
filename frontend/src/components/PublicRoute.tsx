import { Navigate, Outlet } from "react-router";
import { useAuth } from "../lib/queries";
import { Loader } from "lucide-react";

const PublicRoute = () => {
    const { data: user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader /></div>;
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
