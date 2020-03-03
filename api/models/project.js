const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  SDG: { type: SDGenum, required: true },
  stage: { type: [Stage], required: false }
});

const Stage = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  stakeholders: { type: [String], required: false },
  challenges: { type: [String], required: false },
  insights: { type: [String], required: false }
});

const SDGenum = {
  1: "NO POVERTY",
  2: "HUNGER",
  3: "GOOD HEALTH AND WELL-BEING",
  4: "QUALITY EDUCATION",
  5: "GENDER EQUALITY",
  6: "CLEAN WATER AND SANITATION",
  7: "AFFORDABLE AND CLEAN CLEAN ENERGY",
  8: "DECENT WORK AND ECONOMIC GROWTH",
  9: "INDUSTRY, INNOVATION, AND INFRASTRUCTURE",
  10: "REDUCED INEQUALITIES",
  11: "SUSTAINABLE CITIES AND COMMUNITIES",
  12: "RESPONSIBLE CONSUMPTION AND PRODUCTION",
  13: "CLIMATE ACTION",
  14: "LIFE BELOW WATER",
  15: "LIFE ON LAND",
  16: "PEACE, JUSTICE, AND STRONG INSTITUTIONS",
  17: "PARTNERSHIPS FOR THE GOALS"
};
