const schema = {
  id: "/UpvoteSchema",
  type: "object",
  properties: {
    userId: {
      type: "string",
      required: true
    },
    upvoteLocation: {
      type: "string",
      required: true
    }
  }
};

module.exports = {
  upvoteSchema: schema
};
