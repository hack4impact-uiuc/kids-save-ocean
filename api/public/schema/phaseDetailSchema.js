const stakeholdersSchema = {
  id: "/StakeholdersSchema",
  type: "object",
  properties: {
    stakeholders: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true
          },
          description: {
            type: "string",
            required: true
          }
        }
      }
    }
  }
};

const challengesSchema = {
  id: "/ChallengesSchema",
  type: "object",
  properties: {
    stakeholders: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true
          },
          description: {
            type: "string",
            required: true
          }
        }
      }
    }
  }
};

const insightsSchema = {
  id: "/InsightsSchema",
  type: "object",
  properties: {
    stakeholders: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true
          },
          description: {
            type: "string",
            required: true
          }
        }
      }
    }
  }
};

module.exports = {
  stakeholdersSchema: stakeholdersSchema,
  challengesSchema: challengesSchema,
  insightsSchema: insightsSchema,
};