const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

console.log("CLIENT_URL =", process.env.CLIENT_URL);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());

app.use(
    session({
        secret: "googlelogin",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());

app.use(passport.session());

require("./passport/passport");

app.use("/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});