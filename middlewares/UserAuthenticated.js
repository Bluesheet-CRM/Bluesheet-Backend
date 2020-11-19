
const admin = require("../utils/base.js");
const chalk = require("chalk");
module.exports = (req, res, next) => {
    console.log(chalk.yellow("Checking if user is authenticated..."));
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        let idToken = req.headers.authorization.split("Bearer ")[1];
        admin
            .auth()
            .verifyIdToken(idToken)
            .then(decodedToken => {
                console.log(chalk.green("User is authenticated!"));
                req.user = decodedToken;
                next();
            })
            .catch(e => {
                console.log(chalk.red(e.message));
                res.status(401).json({
                    statusCode: 401,
                    data: {
                        msg: e.message,
                    },
                });
            });
    } else {
        console.log(chalk.red("Token not present"));
        res.status(401).json({
            statusCode: 401,
            data: {
                msg: "Unauthorized",
            },
        });
    }
};
