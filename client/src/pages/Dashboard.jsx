import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [user, setUser] = useState(null);

    useEffect(() => {

        if (!token) return;

        api.get("/auth/user", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        })
        .then(res => {

            setUser(res.data);

        })
        .catch(err => {

            console.log(err);

        });

    }, [token]);

    if (!user) {

        return <h2>Loading...</h2>;

    }

    return (

        <div style={styles.container}>

            <h1>Dashboard</h1>

            <img
                src={user.picture}
                alt="profile"
                style={styles.image}
            />

            <h2>{user.name}</h2>

            <p>{user.email}</p>

        </div>

    );

}

const styles = {

    container: {

        textAlign: "center",
        marginTop: "60px"

    },

    image: {

        width: "150px",
        borderRadius: "50%"

    }

};

export default Dashboard;