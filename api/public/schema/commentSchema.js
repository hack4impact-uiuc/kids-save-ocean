const schema = {
  id: "/CommentSchema",
  type: "object",
  properties: {
    commentLocation: {
      type: "string",
      required: true
    },
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
