const schema = {
  id: "/UpvoteSchema",
  type: "object",
  properties: {
    upvoteLocation: {
      type: "string",
      required: true
    }
  }
};

module.exports = {
  upvoteSchema: schema
};
