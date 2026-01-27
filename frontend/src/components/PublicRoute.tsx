import { Navigate, Outlet } from "react-router";
import { useAuth } from "../lib/queries";
import LoadingPage from "./LoadingPage";

const PublicRoute = () => {
    const { data: user, isLoading, isFetching } = useAuth();

    if (isLoading || (isFetching && !user)) {
        return <LoadingPage />;
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
