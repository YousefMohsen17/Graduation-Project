import { Navigate, Outlet } from "react-router";
import { useAuth } from "../lib/queries";

const ProtectedRoute = () => {
    const { data: user, isLoading } = useAuth();

    if (isLoading) {
        // You can replace this with a proper loading spinner component
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (user) {
        return <Outlet />;
    }

    return <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
