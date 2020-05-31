const schema = {
  id: "/UpdateSchema",
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["stage", "profile", "project"],
      required: true
    },
    username: {
      type: "string",
      required: true
    },
    projectId: {
      type: "string",
      required: false
    },
    description: {
      type: "string",
      required: true
    },
    subDescription: {
      type: "string",
      required: false
    },
    date: {
      type: "integer",
      required: true
    }
  }
};

module.exports = {
  updateSchema: schema
};
