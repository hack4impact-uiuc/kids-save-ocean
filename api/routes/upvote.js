const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const UpvoteSchema = require("../public/schema/upvoteSchema.js").upvoteSchema;

router.post("/", validate({ body: UpvoteSchema }), async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const users = await collection.find({});
  res.status(SUCCESS).send({
    code: SUCCESS,
    success: true,
    message: "Users retrieved successfully.",
    data: users
  });
});

module.exports = router;
