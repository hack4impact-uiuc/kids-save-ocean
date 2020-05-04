const schema = {
  id: "/ModelSchema",
  type: "object",
  properties: {
    name: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: false
    },
    country: {
      type: "string",
      required: true
    },
    groupSize: {
      type: "string",
      required: true
    },
    difficulty: {
      type: "string",
      required: false
    },
    sdg: {
      type: "array",
      items: {
        type: "integer",
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
      },
      required: true
    },
    phone: {
      type: "string",
      required: false
    },
    email: {
      type: "string",
      required: false
    },
    followers: {
      type: "array",
      items: {
        type: "string"
      },
      required: false
    },
    phases: {
      type: "object",
      required: false,
      properties: {
        inspiration: {
          type: "object",
          required: true,
          properties: {
            stakeholders: {
              type: "array",
              required: false,
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
            },
            challenges: {
              type: "array",
              required: false,
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
            },
            insights: {
              type: "array",
              required: false,
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
            },
            stages: {
              type: "array",
              required: false,
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
                  },
                  startdate: {
                    type: "string",
                    required: true
                  },
                  enddate: {
                    type: "string",
                    required: true
                  }
                }
              }
            }
          }
        },
        ideation: {
          type: "object",
          required: true,
          properties: {
            stakeholders: {
              type: "array",
              required: false,
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
            },
            challenges: {
              type: "array",
              required: false,
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
            },
            insights: {
              type: "array",
              required: false,
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
            },
            stages: {
              type: "array",
              required: false,
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
                  },
                  startdate: {
                    type: "string",
                    required: true
                  },
                  enddate: {
                    type: "string",
                    required: true
                  }
                }
              }
            }
          }
        },
        implementation: {
          type: "object",
          required: true,
          properties: {
            stakeholders: {
              type: "array",
              required: false,
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
            },
            challenges: {
              type: "array",
              required: false,
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
            },
            insights: {
              type: "array",
              required: false,
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
            },
            stages: {
              type: "array",
              required: false,
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
                  },
                  startdate: {
                    type: "string",
                    required: true
                  },
                  enddate: {
                    type: "string",
                    required: true
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = {
  projectSchema: schema
};
