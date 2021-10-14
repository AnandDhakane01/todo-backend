const jwt = require("jsonwebtoken");

// checks if the user is logged in
const loginRequired = async (req, res, next) => {
    // accessing the jwt token from cookies
    const cookies = req.cookies;

    // accessing the jwt token from the headers
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];

    const token = cookies.accessToken;

    if (token == null) {
        res.status(401).send("Hey user, you need to be logged in first!");
    } else {
        jwt.verify(token, process.env.SECRET, (err, value) => {
            if (err) {
                return res.status(401).send("Access denied. Invalid token.");
            }
            req.user = value;
            next();
        });
    }
};

module.exports = loginRequired;
