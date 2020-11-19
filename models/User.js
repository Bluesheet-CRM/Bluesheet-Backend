const admin = require("../utils/base");
const db = admin.firestore();
const userDb = db.collection("/users");
const Pipelines = db.collection("/pipelines");
const {v4: uuid} = require("uuid");

module.exports.createUser = (uid, fullName, email,phoneNumber,salesforceUser) => {
	return new Promise((resolve, reject) => {
		const dateNow = Date.now();
		const userDetails = {
					uid: uid,
					email,
					dateCreated: new Date(),
                    fullName: fullName,
					phoneNumber,
					salesforceUser,
					current_period_start: dateNow,
			  };
		userDb
			.doc(uid)
			.create(userDetails)
			.then((data) => {
                console.log(data);
                resolve({
                    statusCode:200,
                    data:data
                })

			})
			.catch(e => reject(e.message));
	});
};

module.exports.getOpportunities = uid => {
	return new Promise((resolve, reject) => {
		Pipelines
			.doc(uid)
			.collection("/opportunities")
			.get()
			.then(snapshot => {
				const opportunities = [];
				snapshot.forEach(doc => {
					if (!doc.data().isDeleted) opportunities.push({...doc.data(), opportunitiesId: doc.id});
				});
				resolve(opportunities);
			})
			.catch(e => reject(e.message));
	});
};