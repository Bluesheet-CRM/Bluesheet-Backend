const admin = require("../utils/base");
const db = admin.firestore();
const userDb = require("../models/User");
const opportunitiesSkeleton = require("../data/opportunities"); 
const chalk = require("chalk");
module.exports.getOpportunities = (req, res, next) => {
	console.log(chalk.yellow("Fetching opportunities..."));
	userDb
		.getOpportunities(req.user.uid)
		.then(opportunities => {
			console.log(chalk.green("Fetched opportunities!"));
			if(opportunities.length === 0){
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "No data found!",
						opportunitiesSkeleton,
					},
				});
			}
			else{
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: "Successfully fetched meetings",
						opportunities: opportunities,
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