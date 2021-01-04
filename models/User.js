const admin = require("../utils/base");
const db = admin.firestore();
const userDb = db.collection("/users");
const Pipelines = db.collection("/pipelines");
const { v4: uuid } = require("uuid");

module.exports.createUser = (
  uid,
  fullName,
  email,
  phoneNumber,
  salesforceUser
) => {
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
          statusCode: 200,
          data: data,
        });
      })
      .catch((e) => reject(e.message));
  });
};

module.exports.getOpportunities = (uid) => {
  return new Promise((resolve, reject) => {
    userDb
      .doc(uid)
      .collection("/opportunites")
      .get()
      .then((snapshot) => {
        const opportunities = [];
        snapshot.forEach((doc) => {
          if (!doc.data().isDeleted)
            opportunities.push({ ...doc.data(), Id: doc.id });
        });
        resolve(opportunities);
      })
      .catch((e) => reject(e.message));
  });
};

module.exports.addOpportunities = async(uid, data) => {
  if (data.length === 1) {
    console.log(data[0].Id);
    if (data[0].Id !== null && data[0].Id !== undefined) {
      return new Promise((resolve, reject) => {
        userDb
          .doc(uid)
          .collection("opportunites")
          .doc(data[0].Id)
          .update(data[0])
          .then((res) => {
            resolve(res);
          })
          .catch((e) => reject(e.message));
      });
    } else {
      return new Promise((resolve, reject) => {
        
        userDb
          .doc(uid)
          .collection("opportunites")
          .add(data[0])
          .then((docRef) => resolve(docRef.id))
          .catch((e) => reject(e.message));
      });
    }
  } else {
    let resultArray = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].Id !== null) {
        let dataTemp = data[i];
        
        try{
          const result = await  userDb
          .doc(uid)
          .collection("opportunites")
          .doc(dataTemp.Id)
          .update(dataTemp);

          if(result){
            resultArray.push(`${dataTemp.Id} process is sucessfull`)
          }
        }
        catch(err){
          resultArray.push(`${dataTemp.Id} process is failed with ${err.message}`)
        }
      } else {
        try{
          const result = await userDb
          .doc(uid)
          .collection("opportunites")
          .add(data[i]);
          if(result){
            resultArray.push(`${data[i].Id} process is sucessfull`)
          }
        }
        catch(err){
          resultArray.push(`${data[i].Id} process is failed with ${err.message}`)
        }
      }
  }
  return resultArray;
  }
};

module.exports.deleteOpportunities = async (uid, body) => {
  await userDb.doc(uid).collection("opportunites").doc(body.delId).delete();
};

module.exports.getNotes = (uid) => {
  return new Promise((resolve, reject) => {
    userDb
      .doc(uid)
      .collection("/notes")
      .get()
      .then((snapshot) => {
        const notes = [];
        snapshot.forEach((doc) => {
          console.log(doc);
          if (!doc.data().isDeleted) notes.push({ ...doc.data(), Id: doc.id });
        });
        resolve(notes);
      })
      .catch((e) => reject(e.message));
  });
};

module.exports.addNotes = (uid, notes) => {
  return new Promise((resolve, reject) => {
    userDb
      .doc(uid)
      .collection("/notes")
      .add(notes)
      .then((docRef) => resolve(docRef.id))
      .catch((e) => reject(e.message));
  });
};

module.exports.deleteNotes = async (uid, body) => {
  await userDb.doc(uid).collection("opportunites").doc(body.id).delete();
};

module.exports.getTasks = (uid) => {
  console.log(uid);
  return new Promise((resolve, reject) => {
    userDb
      .doc(uid)
      .collection("/tasks")
      .get()
      .then((snapshot) => {
        const tasks = [];
        snapshot.forEach((doc) => {
          console.log(doc);
          if (!doc.data().isDeleted) tasks.push({ ...doc.data(), Id: doc.id });
        });
        console.log(tasks);
        resolve(tasks);
      })
      .catch((e) => reject(e.message));
  });
};

module.exports.addTasks = (uid, tasks) => {
  return new Promise((resolve, reject) => {
    userDb
      .doc(uid)
      .collection("/tasks")
      .add(tasks)
      .then((docRef) => resolve(docRef.id))
      .catch((e) => reject(e.message));
  });
};

module.exports.deleteTasks = async (uid, body) => {
  await userDb.doc(uid).collection("tasks").doc(body.id).delete();
};
