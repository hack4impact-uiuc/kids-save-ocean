const schema = {
    id: "/UpdateSchema",
    type: "object",
    properties: {
      updateType: {
        type: "string",
        enum: ["project", "profile"],
        required: true
      },
      email: {
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