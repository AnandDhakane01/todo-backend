const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.signUp = async (req, res) => {
    const saltRounds = 10;
    const { userName, email, password } = req.body;

    try {
        // check if user already exists with the same email
        const alreadyExists = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { userName: userName }],
            },
        });
        if (alreadyExists) {
            res.status(401).send("Email or username already exists");
        } else {
            // hash the password
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            // create new user
            const newUser = await new User({
                userName: userName,
                email: email.toLowerCase(),
                password: hash,
            });

            // save user
            const savedUser = await newUser.save();

            res.status(201).json({
                message: "User created successfully",
                savedUser,
            });
        }
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
};

exports.logIn = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        // find user by userName
        const user = await User.findOne({
            where: { userName: userName },
        });

        if (user === null) {
            res.status(400).send("Invalid Credentials");
        } else {
            if (await bcrypt.compare(password, user.password)) {
                // create a jwt token
                const accessToken = jwt.sign(
                    user.dataValues,
                    process.env.SECRET
                );

                // set cookie
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                });

                res.status(200).json({
                    message: "loggedIn",
                    accessToken: accessToken,
                    user,
                });
            } else {
                res.status(400).send("Invalid Credentials!");
            }
        }
    } catch (err) {
        res.status(500).json({ message: "something went wrong!", err });
    }
};

exports.logOut = (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).send("Logged Out");
    } catch (err) {
        return res.status(500).json({ message: "could not logout", err });
    }
};

