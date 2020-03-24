const withSass = require("@zeit/next-sass");

module.exports = {
  ...withSass(),
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
};
