const schema = {
  id: "/CommentSchema",
  type: "object",
  properties: {
    userId: {
      type: "string",
      required: true
    },
    comment: {
      type: "string",
      required: true
    }
  }
};

module.exports = {
  commentSchema: schema
};
