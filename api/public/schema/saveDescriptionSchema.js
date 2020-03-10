const schema = {
  id: "/ModelSchema",
  type: "object",
  properties: {
    id: {
      type: "string",
      required: true
    },
    phaseName: {
      type: "string",
      required: true,
      enum: ["inspiration", "ideation", "implementation"]
    },
    stageName: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    }
  }
};

module.exports = {
  saveDescriptionSchema: schema
};