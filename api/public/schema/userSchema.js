const schema = {
  id: "/TemplateSchema",
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
    createdProjects: {
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
    },
    lastCheckedNotifs: {
      type: "date",
      required: true
    }
  }
};

module.exports = {
  userSchema: schema
};
