import * as projectSchema from "./projectSchema";

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
    admin: {
      type: "boolean",
      required: true
    },
    anon: {
      type: "boolean",
      required: false
    },
    projects: {
      type: "array",
      required: false,
      items: {
        type: "object",
        properties: { $ref: projectSchema.id }
      }
    }
  }
};

module.exports = {
  userSchema: schema
};
