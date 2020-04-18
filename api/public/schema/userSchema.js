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
    country: {
      type: "string",
      required: true
    },
    birthday: {
      type: "string",
      required: true
    },
    anon: {
      type: "boolean",
      required: true
    },
    projectIds: {
      type: "array",
      items: {
        type: "string"
      }
    },
    commentIds: {
      type: "array",
      items: {
        type: "string"
      },
      required: true
    },
    followingProjects: {
      type: "array",
      items: {
        type: "string"
      },
      required: true
    },
    followingUsers: {
      type: "array",
      items: {
        type: "string"
      },
      required: true
    },
    followers: {
      type: "array",
      items: {
        type: "string"
      },
      required: true
    }
  }
};

module.exports = {
  userSchema: schema
};
