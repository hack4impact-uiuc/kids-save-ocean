async function getUsername(db, userEmail) {
  const collection = db.get("users");
  const doc = await collection.findOne({ email: userEmail });
  return doc.username;
};


module.exports = {
  getUsername,
}