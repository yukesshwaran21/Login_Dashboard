const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/"
    }),
    (req, res) => {

        const token = jwt.sign(
            {
                id: req.user._id,
                email: req.user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.redirect(
            `http://localhost:5173/dashboard?token=${token}`
        );

    }
);

module.exports = router;