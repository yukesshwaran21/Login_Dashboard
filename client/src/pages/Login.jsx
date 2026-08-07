import { Navigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.jpg";

function Login(){

    if(localStorage.getItem("token")){
        return <Navigate to="/dashboard" replace />;
    }

    const handleLogin=()=>{

        window.location.href =`${import.meta.env.VITE_API_URL}/auth/google`;

    };

    return(

        <div className="login-container">

            <div className="login-card">

                <img
                    src={logo}
                    alt="Logo"
                    className="login-logo"
                />

                <h2 className="login-title">
                    😊 𝙇𝙚𝙩'𝙨 𝙜𝙚𝙩 𝙎𝙩𝙖𝙧𝙩𝙚𝙙
                </h2>

                <p className="login-text">
                    Sign in securely using your Google Account
                </p>

                <button
                    className="google-btn"
                    onClick={handleLogin}
                >
                    Continue with Google
                </button>

            </div>

        </div>

    );

}

export default Login;