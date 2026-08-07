import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

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

        <div style={styles.container}>

            <h1>Dashboard</h1>

            {
                user.picture && !imageError ? (
                    <img
                        src={user.picture}
                        alt="Profile"
                        style={styles.image}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div style={styles.avatar}>
                        {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                )
            }

            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <button
                style={styles.button}
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>

    );

}

const styles = {

    container: {
        textAlign: "center",
        marginTop: "50px"
    },

    image: {
        width: "150px",
        borderRadius: "50%"
    },

    button: {
        marginTop: "25px",
        padding: "12px 25px",
        fontSize: "16px",
        cursor: "pointer"
    }

};

export default Dashboard;