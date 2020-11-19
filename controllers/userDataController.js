const userDb = require("../models/User");
const chalk = require("chalk");
module.exports.createUser = (req, res, next) => {
  // IF PHONE NUMBER IS NOT PRESENT SET AS FALSE
  if (req.body.phoneNumber === undefined) {
    console.log("Phone number not found");
    req.body.phoneNumber = false;
  }

  console.log(req.body);

  const { fullName, email, phoneNumber,salesforceUser } = req.body;
  console.log(chalk.yellow("Creating a user... "));
  userDb
    .createUser(
      req.user.uid,
      fullName,
      email,
      phoneNumber,
      salesforceUser
    )
    .then(() => {
      console.log(chalk.green("User created"));
      res.json({
          statusCode:200,
          payload:{
              msg:"User Created!"
          }
      })
    })
    .catch((e) => {
      console.log(
        chalk.red("AN ERROR OCCURED userDataController.js/createUser")
      );
      console.log(e);
      res.status(500).send({
        statusCode: 500,
        data: {
          msg: e.message,
        },
      });
    });
};
