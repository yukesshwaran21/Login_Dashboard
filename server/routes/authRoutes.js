const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware");
const { getUser } = require("../controllers/authController");

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"
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

router.get(
    "/user",
    auth,
    getUser
);

router.get("/logout", (req, res) => {

    req.logout(function (err) {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        req.session.destroy(() => {

            res.redirect("http://localhost:5173");

        });

    });

});

module.exports = router;