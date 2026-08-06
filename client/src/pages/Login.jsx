function Login() {

    const handleLogin = () => {

        window.location.href = "http://localhost:5000/auth/google";

    };

    return (
        <div style={styles.container}>

            <h1>Google Login Dashboard</h1>

            <button
                onClick={handleLogin}
                style={styles.button}
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    button: {
        padding: "12px 24px",
        fontSize: "18px",
        cursor: "pointer"
    }

};

export default Login;