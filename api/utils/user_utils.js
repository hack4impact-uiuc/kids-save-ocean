async function getUsername(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc.username;
};

async function getUserId(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc._id;
}


module.exports = {
  getUsername,
  getUserId
}
