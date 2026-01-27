import { Navigate, Outlet } from "react-router";
import { useAuth } from "../lib/queries";
import LoadingPage from "./LoadingPage";

const ProtectedRoute = () => {
    const { data: user, isLoading, isFetching } = useAuth();

    if (isLoading || (isFetching && !user)) {
        return <LoadingPage />;
    }

    if (user) {
        return <Outlet />;
    }

    return <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
