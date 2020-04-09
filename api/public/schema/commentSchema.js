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

const threadSchema = {
  id: "/ThreadSchema",
  type: "object",
  properties: {
    commentLocation: {
      type: "string",
      required: true
    },
    commentIndex: {
      type: "number",
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
  commentSchema: schema,
  threadSchema: threadSchema
};
