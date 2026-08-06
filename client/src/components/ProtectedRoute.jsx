import { Navigate, useSearchParams } from "react-router-dom";

function ProtectedRoute({ children }) {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;