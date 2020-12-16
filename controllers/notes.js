const admin = require("../utils/base");
const db = admin.firestore();
const userDb = require("../models/User");
const chalk = require("chalk");

module.exports.getNotes = (req, res, next) => {
	console.log(chalk.yellow("Fetching notes..."));
	userDb
		.getNotes(req.user.uid)
		.then(notes => {
			if(notes.length === 0){
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
						msg: "Successfully fetched notes",
						notes:notes
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

module.exports.addNotes = (req, res, next) => {
    console.log(chalk.yellow("adding notes..."));
    console.log(req.body);
	userDb
		.addNotes(req.user.uid,req.body)
		.then(notes => {
			console.log(chalk.green("saved notes!"));
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "successfull",
						data:notes,
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

module.exports.deleteNotes = (req, res, next) => {
	console.log(chalk.yellow("deleting notes..."));
	userDb
		.deleteNotes(req.user.uid, req.body)
		.then(notes => {
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "Successfully deleted Notes",
						data: notes,
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
