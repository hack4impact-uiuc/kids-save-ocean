async function getUsername(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc.username;
}

<<<<<<< HEAD
=======
async function getFollowingProjects(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc.followingProjects;
}

async function getCreatedProjects(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc.createdProjects;
}

>>>>>>> 71c8454cc473052c12f3e00eb173ea00410e3733
async function getUserId(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc._id;
}

module.exports = {
  getUsername,
<<<<<<< HEAD
=======
  getFollowingProjects,
  getCreatedProjects,
>>>>>>> 71c8454cc473052c12f3e00eb173ea00410e3733
  getUserId
};
