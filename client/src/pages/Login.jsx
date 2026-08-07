import { Navigate } from "react-router-dom";

function Login() {

    if (localStorage.getItem("token")) {

        return <Navigate to="/dashboard" replace />;

    }

    const handleLogin = () => {

        window.location.href = "http://localhost:5000/auth/google";

    };

    return (

        <div style={styles.container}>

            <h1>Google Login Dashboard</h1>

            <button
                style={styles.button}
                onClick={handleLogin}
            >
                Sign in with Google
            </button>

        </div>

    );

}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },

    button: {
        padding: "12px 25px",
        fontSize: "18px",
        cursor: "pointer"
    }

};

export default Login;