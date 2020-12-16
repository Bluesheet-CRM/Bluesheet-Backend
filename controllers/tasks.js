const admin = require("../utils/base");
const db = admin.firestore();
const userDb = require("../models/User");
const chalk = require("chalk");

module.exports.getTasks = (req, res, next) => {
	console.log(chalk.yellow("Fetching tasks..."));
	userDb
		.getTasks(req.user.uid)
		.then(tasks => {
			if(tasks.length === 0){
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "No data found!",
					},
				});
			}
			else{
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "Successfully fetched tasks",
						tasks:tasks
					},
				});
			}
			
		})
		.catch(e => {
			console.log(chalk.red(e));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message || e,
				},
			});
		});
};

module.exports.addTasks = (req, res, next) => {
    console.log(chalk.yellow("adding tasks..."));
    console.log(req.body);
	userDb
		.addTasks(req.user.uid,req.body)
		.then(tasks => {
			console.log(chalk.green("saved tasks!"));
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "successfull",
						tasks:tasks,
					},
				});
		})
		.catch(e => {
			console.log(chalk.red(e));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message || e,
				},
			});
		});
};

module.exports.deleteTasks = (req, res, next) => {
	console.log(chalk.yellow("deleting tasks..."));
	userDb
		.deleteTasks(req.user.uid, req.body)
		.then(tasks => {
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "Successfully deleted tasks",
						tasks: tasks,
					},
				});
		})
		.catch(e => {
			console.log(chalk.red(e));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message || e,
				},
			});
		});
};
