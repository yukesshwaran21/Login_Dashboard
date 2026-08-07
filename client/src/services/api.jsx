import axios from "axios";

const api = axios.create({

    baseURL: "https://google-login-dashboard-api.onrender.com"

});

export default api;