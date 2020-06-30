async function getUsername(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc.username;
}

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

async function getUserId(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc._id;
}

module.exports = {
  getUsername,
  getFollowingProjects,
  getCreatedProjects,
  getUserId,
};
