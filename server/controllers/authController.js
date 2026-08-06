const User = require("../models/User");

const getUser = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getUser
};