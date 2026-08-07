import { Navigate, useSearchParams } from "react-router-dom";

function ProtectedRoute({ children }) {

    const [searchParams] = useSearchParams();

    const urlToken = searchParams.get("token");
    const localToken = localStorage.getItem("token");

    if (!urlToken && !localToken) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;