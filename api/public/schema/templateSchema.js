const schema = {
  id: "/TemplateSchema",
  type: "object",
  properties: {
    name: {
      type: "string",
      required: false
    },
    phases: {
      type: "array",
      items: {
        type: "string",
        enum: ["Implementation", "Ideation", "Inspiration"]
      },
      required: false
    },
    creatorID: {
      type: "string",
      required: false
    },
    draft: {
      type: "string",
      required: true
    }
  }
};
module.exports = {
  templateSchema: schema
};
