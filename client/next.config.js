const withSass = require("@zeit/next-sass");

module.exports = {
  ...withSass(),
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET
  }
};
