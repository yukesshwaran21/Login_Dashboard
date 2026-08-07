import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const urlToken = searchParams.get("token");

    const token = urlToken || localStorage.getItem("token");

    const [user, setUser] = useState(null);

    const styles = {

        container: {
            textAlign: "center",
            marginTop: "50px"
        },

        image: {
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover"
        },

        avatar: {
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#4285F4",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "60px",
            fontWeight: "bold",
            margin: "0 auto"
        },

        button: {
            marginTop: "25px",
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer"
        }

    };

    const [imageError, setImageError] = useState(false);

    useEffect(() => {

        if (urlToken) {

            localStorage.setItem("token", urlToken);

            navigate("/dashboard", { replace: true });

            return;
        }

        if (!token) {

            navigate("/");

            return;
        }

        api.get("/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/");
            });

    }, [urlToken, token, navigate]);

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/", { replace: true });

    };

    if (!user) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="dashboard">

            {/* Navbar */}

            <nav className="navbar">

                <h2 className="dashboard-title">
                    Dashboard
                </h2>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </nav>

            {/* Profile Section */}

            <div className="dashboard-body">

                <div className="card">

                    {
                        user.picture && !imageError ?

                            <img
                                src={user.picture}
                                className="profile"
                                alt="Profile"
                                onError={() => setImageError(true)}
                            />

                            :

                            <div className="avatar">
                                {(user.name || user.email)
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                    }

                    <div className="details">

    <div className="name">
        {user.name}
    </div>

    <hr className="divider" />

    <div className="info">

        <p>
            <strong>Email : </strong>
            {user.email}
        </p>

    </div>

</div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;