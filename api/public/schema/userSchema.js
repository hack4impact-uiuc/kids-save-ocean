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
      enum: ["student", "teacher", "stakeholder"]
    },
    admin: {
      type: "boolean",
      default: false
    },
    anon: {
      type: "boolean",
      default: false
    },
    projectIds: {
      type: "array",
      default: [],
      items: {
        type: "string"
      }
    },
    comments: {
      type: "array",
      default: [],
      items: {
        type: "string"
      }
    }
  }
};

module.exports = {
  userSchema: schema
};
