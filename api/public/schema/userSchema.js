const schema = {
  id: "/UserSchema",
  type: "object",
  properties: {
    email: {
      type: "string",
      required: true
    },
    username: {
      type: "string",
      required: true
    },
    password: {
      type: "string",
      required: true
    },
    country: {
      type: "string",
      required: true
    },
    birthday: {
      type: "string",
      required: true
    },
    role: {
      type: "string",
      enum: ["student", "teacher", "stakeholder", "admin"],
      required: true
    },
    anon: {
      type: "boolean"
    },
    createdProjects: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};

module.exports = {
  userSchema: schema
};
